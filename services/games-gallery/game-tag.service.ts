import { db } from "@/lib/db";

export async function getGameTags() {
  return db.gameTag.findMany({
    include: { game: true, tag: true },
  });
}

export async function getGameTagsByGame(gameId: number) {
  return db.gameTag.findMany({
    where: { gameId },
    include: { tag: true },
  });
}

export async function getGameTagsByTag(tagId: number) {
  return db.gameTag.findMany({
    where: { tagId },
    include: { game: true },
  });
}

export async function createGameTag(gameId: number, tagId: number) {
  return db.gameTag.create({ data: { gameId, tagId } });
}

export async function deleteGameTag(gameId: number, tagId: number) {
  return db.gameTag.delete({ where: { gameId_tagId: { gameId, tagId } } });
}