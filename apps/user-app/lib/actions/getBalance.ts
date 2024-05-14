import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function getBalance() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return {
      amount: 0,
      locked: 0,
    };
  }
  const balance = await prisma.balance.findFirst({
    where: {
      // @ts-ignore
      userId: Number(session?.user?.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}
