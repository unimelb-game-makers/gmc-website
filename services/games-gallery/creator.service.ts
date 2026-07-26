import { db } from "@/lib/db";

export async function getCreatorById(id: number) {
const creator = await db.creator.findUnique({
    where: { id },
    });
    return creator;
}
