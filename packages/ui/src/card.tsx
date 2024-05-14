import React from "react";

type CardProps = {
  title: string;
  children?: React.ReactNode;
};

const Card = ({ title, children }: CardProps): JSX.Element => {
  return (
    <div className="border p-4">
      <h2 className="text-xl border-b pb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Card;
