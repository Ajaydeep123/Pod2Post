import { summarySchema } from "@/validations/summaryValidation";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/db.config";
import { Document } from "@langchain/core/documents";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { getUserCoins } from "@/actions/fetchActions";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const validator = vine.compile(summarySchema);
    const payload = await validator.validate(body);
    // * Check if user has sufficient coins or not
    const userCoins = await getUserCoins(payload.user_id);
    if (userCoins === null || (userCoins?.coins && userCoins.coins < 10)) {
      return NextResponse.json(
        {
          message:
            "You don't have sufficient coins for summary.Please add your coins.",
        },
        { status: 400 }
      );
    }

    let text: Document[];
    try {
      const loader = YoutubeLoader.createFromUrl(payload.url!, {
        language: "en",
        addVideoInfo: true,
      });
      console.log("loader", loader);
      console.log("Attempting to load video content");
      text = await loader.load();
      console.log("text", text);
      console.log("Video content loaded successfully");
    } catch (error) {
      console.log("Error loading video content:", error);
      return NextResponse.json(
        {
          message:
            "No Transcript available for this video.Plese try another video",
            error: error instanceof Error ? error.message : String(error),
        },
        { status: 404 }
      );
    }

    const summary = await prisma.summary.create({
      data: {
        ...payload,
        user_id: Number(payload.user_id),
        title: text[0].metadata?.title ?? "No Title found!",
      },
    });
    return NextResponse.json({
      message: "Url Added Successfully!",
      data: summary,
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { message: "Please check validation errors", errors: error.messages },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { message: "Something went wrong.Please try again!" },
      { status: 500 }
    );
  }
} 