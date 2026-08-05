import { db } from "@/lib/db";

export async function getCreators() {
    const creators = await db.creator.findMany();

    return creators;
}

export async function getCreatorById(id: string) {
    const creator = await db.creator.findUnique({
        where: { id },
    });
    return creator;
}

export async function getCreatorByUserId(id: string) {
    const creator = await db.creator.findUnique({
        where: { user_id: id },
    });
    return creator;
}

export async function updateCreator(
    id: string, 
    data: Partial<{
        name: string,
        picture: string,
        about: string,
    }>) {
        return db.creator.update({ where: { id }, data });
}
