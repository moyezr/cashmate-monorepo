import AddMoneyCard from "../../../components/add-money-card";
import BalanceCard from "@repo/ui/balance-card";
import OnRampTransaction from "@repo/ui/onramp-transaction";
import { getBalance } from "../../../lib/actions/getBalance";
import { getOnRampTransaction } from "../../../lib/actions/getOnrampTransactions";

export default async function TransferPage() {
  const balance = await getBalance();
  const transactions = await getOnRampTransaction();
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoneyCard />
        </div>

        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransaction transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
