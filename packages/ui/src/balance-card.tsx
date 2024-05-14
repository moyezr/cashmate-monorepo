import React from "react";
import Card from "./card";

type BalanceCardProps = {
  amount: number;
  locked: number;
};

const BalanceCard = ({ amount, locked }: BalanceCardProps) => {
  return (
    <Card title="Balance">
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Unlocked Balance</div>
        <div>{amount / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Locked Balance</div>
        <div>{locked / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Balance</div>
        <div>{(locked + amount) / 100} INR</div>
      </div>
    </Card>
  );
};

export default BalanceCard;
