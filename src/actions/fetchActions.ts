"use server"

import prisma from "@/lib/db.config"
import { SummaryType } from "@/types"
import { unstable_cache } from "next/cache"

export const getUserCoins = unstable_cache(
    async (user_id: number | string) => {
        return prisma.user.findUnique({
            where: {
                id: Number(user_id)
            },
            select: {
                coins: true
            }
        })

    },
    ["userCoins"],
    {
        revalidate: 30 * 60, tags: ["userCoins"]
    }
)

export async function getSummary(id: string): Promise<SummaryType | null> {
    console.log(id)
    const summary = await prisma.summary.findUnique({
      where: {
        id: id,
      },
    });
    return summary;
  }

  export const getOldSummaries = unstable_cache(
    async (id: number) => {
      return await prisma.summary.findMany({
        where: {
          user_id: id,
        },
        select: {
          id: true,
          url: true,
          created_at: true,
          title: true,
          user_id:true
        },
        orderBy: {
          created_at: "desc",
        },
      });
    },
    ["oldSummaries"],
    { revalidate: 60 * 60, tags: ["oldSummaries"] }
  );
  

  export const getCoinsSpend = unstable_cache(
    async (user_id: number | string) => {
      return await prisma.coinSpend.findMany({
        where: {
          user_id: Number(user_id),
        },
        include: {
          summary: {
            select: {
              id: true,
              url: true,
              title: true,
            },
          },
        },
        orderBy: {
          id: "desc",
        },
      });
    },
    ["coinsSpend"],
    { revalidate: 60 * 60, tags: ["coinsSpend"] }
  );

  export const getTransactions = unstable_cache(
    async (user_id: number | string) => {
      return await prisma.transactions.findMany({
        where: {
          user_id: Number(user_id),
        },
        orderBy: {
          created_at: "desc",
        },
      });
    },
    ["transactions"],
    { revalidate: 60 * 60, tags: ["transactions"] }
  );