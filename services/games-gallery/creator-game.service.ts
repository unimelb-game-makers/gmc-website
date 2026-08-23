import { db } from "@/lib/db"

enum Action {
    Add,
    Remove
}

interface creatorGameEdit {
    game_id: string,
    action: Action,
    role: string,
}

export async function editCreatorGames(creatorId: string, edits: creatorGameEdit[]) {
    const creator_games = await getCreatorGamesByCreator(creatorId)

    edits.forEach(edit => {
        const game_exists = creator_games.some(creator_game => creator_game.game_id === edit.game_id)
        switch (edit.action) {
            
            case Action.Add:
                if (!game_exists) {
                    createCreatorGame(creatorId, edit.game_id, edit.role)
                }
            case Action.Remove:
                if (game_exists) {
                    deleteCreatorGame(creatorId, edit.game_id)
                }
        }

    })
}

export async function getCreatorGamesByCreator(creatorId: string) {
    return db.creatorGame.findMany({
        where: { creator_id: creatorId }
    })
}

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
