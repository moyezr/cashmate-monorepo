import React from "react";
import Card from "./card";

type P2PTransactionType = {
  id: number;
  amount: number;
  timestamp: Date;
  fromUserId: number;
  toUserId: number;
};

type P2PTransactionsProps = {
  transactions: P2PTransactionType[];
  userId: number;
};

const P2PTransactions = ({ transactions, userId }: P2PTransactionsProps) => {
  if (!userId) {
    return (
      <Card title="User not found">
        <div className="text-center py-8">You are not authenticated</div>
      </Card>
    );
  }
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
        {transactions.map((transaction) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {transaction.timestamp.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {transaction.fromUserId == userId
                ? `- Rs ${transaction.amount / 100}`
                : `+ Rs ${transaction.amount / 100}`}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default P2PTransactions;
