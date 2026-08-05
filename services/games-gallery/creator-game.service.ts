import { db } from "@/lib/db"

export async function createCreatorGame(creatorId: string, gameId: string, role: string) {
  return db.creatorGame.create(
      {
          data: { game_id: gameId, creator_id: creatorId, role: role } 
      }
  );
}

export async function deleteCreatorGame(creatorId: string, gameId: string) {
  return db.creatorGame.delete(
      { where: { creator_id_game_id: { game_id: gameId, creator_id: creatorId } } });
}
