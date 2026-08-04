import { db } from "@/lib/db";

export async function getGameTags() {
  return db.gameTag.findMany({
    include: { game: true, tag: true },
  });
}

export async function getGameTagsByGame(gameId: string) {
  return db.gameTag.findMany({
    where: { game_id: gameId },
    include: { tag: true },
  });
}

export async function createGameTag(gameId: string, tagId: number) {
  return db.gameTag.create({ data: { game_id: gameId, tag_id: tagId } });
}

export async function deleteGameTag(gameId: string, tagId: number) {
  return db.gameTag.delete({ where: { game_id_tag_id: { game_id: gameId, tag_id: tagId } } });
}
