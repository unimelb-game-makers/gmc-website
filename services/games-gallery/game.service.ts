import { db } from "@/lib/db";

interface creator {
    creator_id: string,
    role: string,
}

// Create Game
export async function createGame(data: {
  name: string;
  thumbnail: string;
  link: string;
  description: string;
  tagIds: number[];
  creators: creator[];
}) {
  return db.game.create({ data: {
      name: data.name,
      thumbnail: data.thumbnail,
      link: data.link,
      description: data.description,
      approved: false,
      tags: {
          create: data.tagIds.map((id) => ({
              tag: {
                  connect: { id }
              }
          }))
      },
      creators: {
          create: data.creators.map((creator_info) => ({
              role: creator_info.role,
              creator: {
                  connect: { id: creator_info.creator_id }
              }
          }))
      }
 }});
}

// Read Games
export async function getGames() {
  const games = await db.game.findMany({
      where: { approved: true },
      include: {
          tags: {
              include: {
                  tag: {
                      select: {
                          id: true,
                          name: true,
                          description: true,
                      }
                  }
              }
          }
      }
  });
  return games;
} 

// Read specific game data
export async function getGameById(id: string) {
const game = await db.game.findUnique({
    where: { id },
    include: {
          tags: {
              include: {
                  tag: {
                      select: {
                          id: true,
                          name: true,
                          description: true,
                      }
                  }
              }
          }
      }
    });
    return game;
}

// Update Game Info
export async function updateGame(
  id: string,
  data: Partial<{
    name: string;
    thumbnail: string;
    link: string;
    description: string;
    approved: boolean;
  }>
) {
  return db.game.update({ where: { id }, data });
}

// Delete Game
export async function deleteGame(id: string) {
  return db.game.delete({ where: { id } });
}
