import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function getP2PTransactions() {
  const session = await getServerSession(authOptions);

  // @ts-ignore
  if (!session?.user?.id) {
    return [];
  }
  const txns = await prisma.p2PTransfer.findMany({
    where: {
      OR: [
        // @ts-ignore
        { fromUserId: Number(session?.user?.id) },
        // @ts-ignore
        { toUserId: Number(session?.user?.id) },
      ],
    },
  });

  return txns;
}
