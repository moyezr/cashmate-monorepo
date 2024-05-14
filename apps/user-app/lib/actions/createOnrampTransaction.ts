"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"

export async function createOnRampTransaction(provider: string, amount: number) {
    // Ideally the token should come from the banking server
    const session = await getServerSession(authOptions)



    // @ts-ignore
    if(!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }

    const token = (Math.random() * 1000).toString();

    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            // @ts-ignore
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    });

    return {
        message: "Done"
    }
}