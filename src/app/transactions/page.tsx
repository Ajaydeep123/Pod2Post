import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getTransactions, getUserCoins } from "@/actions/fetchActions";
import DashNav from "@/components/dashboard/DashNav";

export default async function Transactions() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const userCoins = session?.user?.id ? await getUserCoins(session.user.id) : null;
  const transactions = session?.user?.id ? await getTransactions(session.user.id) : [];

  if (!session?.user) {
    // Handle the case where the user is not authenticated
    return <div>Please log in to view your transactions.</div>;
  }

  return (
    <div className="container">
      <DashNav user={session.user} userCoins={userCoins} />
      <div className="text-center w-full">
        <h1 className="text-2xl font-bold mb-4">Transactions History</h1>

        <div className="flex justify-center items-center space-y-6 flex-col">
          {transactions &&
            transactions.length > 0 &&
            transactions.map((item, index) => (
              <div
                className="w-full text-left md:w-[500px] rounded-md p-4 border border-dashed"
                key={index}
              >
                <h1>{item.id}</h1>
                <p className="my-2">
                  Status :
                  {item.status === 1 ? (
                    <span className="bg-green-400 text-black text-sm p-1 px-2 rounded-lg">
                      Success
                    </span>
                  ) : (
                    <span className="bg-red-400 text-black text-sm p-1 px-2 rounded-lg">
                      Declined
                    </span>
                  )}
                </p>
                <p>
                  Amount :<strong>{item.amount}</strong>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}