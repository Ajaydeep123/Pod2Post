import { NextRequest, NextResponse } from "next/server";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { loadSummarizationChain } from "langchain/chains";
import { TokenTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { PromptTemplate } from "@langchain/core/prompts";
import { summaryTemplate } from "@/lib/prompts";
// import { gptModal } from "@/lib/langchain";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../auth/[...nextauth]/options";
import { getUserCoins } from "@/actions/fetchActions";
import { coinsSpend, minusCoins, updateSummary } from "@/actions/commonActions";
import prisma from "@/lib/db.config";
import { groqModal } from "@/lib/langchain";
interface SummarizePayload {
  url: string;
  id: string;
}

export async function POST(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body: SummarizePayload = await req.json();

    // Check if user has sufficient coins
    const userCoins = await getUserCoins(session.user.id);
    if (userCoins === null || (userCoins.coins && userCoins.coins < 10)) {
      return NextResponse.json(
        { message: "Insufficient coins for summary. Please add coins." },
        { status: 400 }
      );
    }

    // Check for existing summary
    const oldSummary = await prisma.summary.findFirst({
      select: { response: true },
      where: { url: body.url },
    });

    if (oldSummary?.response) {
      await minusCoins(session.user.id);
      await coinsSpend(session.user.id, body.id);
      return NextResponse.json({
        message: "Podcast video Summary",
        data: oldSummary.response,
      });
    }

    // Extract video transcript
    let text: Document<Record<string, unknown>>[];
    try {
      const loader = YoutubeLoader.createFromUrl(body.url, {
        language: "en",
        addVideoInfo: true,
      });
      text = await loader.load();
    } catch (error) {
      return NextResponse.json(
        { message: "No transcript available. Please try another video." },
        { status: 404 }
      );
    }

    const splitter = new TokenTextSplitter({
      chunkSize: 8000,
      chunkOverlap: 250,
    });
    const docsSummary = await splitter.splitDocuments(text);
    const summaryPrompt = PromptTemplate.fromTemplate(summaryTemplate);
    const summaryChain = loadSummarizationChain(groqModal, {
      type: "map_reduce",
      verbose: true,
      combinePrompt: summaryPrompt,
    });
    const res = await summaryChain.invoke({ input_documents: docsSummary });

    // Update user coins and save summary
    await minusCoins(session.user.id);
    await coinsSpend(session.user.id, body.id);
    await updateSummary(body.id, res?.text ?? '');

    return NextResponse.json({
      message: "Podcast video Summary",
      data: res?.text,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again!" },
      { status: 500 }
    );
  }
}