import BalanceCard from "@repo/ui/balance-card";
import { SendCard } from "../../../components/send-card";
import { getBalance } from "../../../lib/actions/getBalance";
import P2PTransactions from "@repo/ui/p2pTransactions";
import { getP2PTransactions } from "../../../lib/actions/getP2PTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export default async function P2PPage() {
  const balance = await getBalance();
  const transactions = await getP2PTransactions();
  const session = await getServerSession(authOptions);
0
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 ">
        <div>
          <SendCard />
        </div>

        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4 w-full">
            <P2PTransactions
              transactions={transactions}
              // @ts-ignore
              userId={session?.user?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
