import React from "react";
import Card from "./card";

type Transcation = {
  time: Date;
  amount: number;
  // TODO: Can the type of `status` be more specific
  status: string;
  provider: string;
};

type OnRampTransactionProps = {
  transactions: Transcation[];
};

const OnRampTransaction = ({ transactions }: OnRampTransactionProps) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transaction">
        <div className="text-center py-8">No Recent Transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((transactions) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {transactions.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {transactions.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OnRampTransaction;
