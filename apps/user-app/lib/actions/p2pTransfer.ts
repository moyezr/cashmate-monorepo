"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const from = session?.user?.id;
    console.log("FROM USER ID", from)
    if (!from) {
      console.log("Couldn't find from user");
      throw new Error("From User id not found")
      return {
        message: "Error while sending",
      };
    }
    const toUser = await prisma.user.findFirst({
      where: {
        number: to,
      },
    });

    if (!toUser) {
      console.log("Couldn't find to user");

      return {
        message: "User not found",
      };
    }

    console.log("Starting the transaciton");
    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });
      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }
      await new Promise((r) => setTimeout(r, 4000));
      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      await tx.p2PTransfer.create({
        data: {
          amount: amount,
          timestamp: new Date(),
          fromUserId: Number(from),
          toUserId: Number(toUser.id),
        },
      });
    });

    console.log("Transaction completed");
  } catch (error) {
    console.log("Something went wrong", error);
  }
}
