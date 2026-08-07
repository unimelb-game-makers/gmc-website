import { db } from "@/lib/db";

enum Action {
    Add,
    Remove
}

interface gameTagEdit {
    tag_id: number,
    action: Action,
}

export async function editTags(gameId: string, edits: gameTagEdit[]) {
    const game_tags = await getGameTagsByGame(gameId)

    edits.forEach(edit => {
        const tag_exists = !game_tags.some(game_tag => game_tag.tag_id === edit.tag_id)
        switch (edit.action) {
            
            case Action.Add:
                if (!tag_exists) {
                    createGameTag(gameId, edit.tag_id)
                }
            case Action.Remove:
                if (tag_exists) {
                    deleteGameTag(gameId, edit.tag_id)
                }
        }

    })
}
export async function getGameTag(gameId: string, tagId: number) {
    return db.gameTag.findFirst({
        where: { game_id: gameId, tag_id: tagId }
    })
}

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
