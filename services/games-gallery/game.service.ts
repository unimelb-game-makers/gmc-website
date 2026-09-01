
import { db } from "@/lib/db";
import { Prisma } from "@/prisma/generated/prisma";

const prismaGame = Prisma.validator<Prisma.GameDefaultArgs>()({
  include: {
    tags: {
      include: {
        tag: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    },
    creators: {
      include: {
        creator: {
          select: {
            name: true,
            picture: true,
            about: true,
          },
        },
      },
    },
  },
});

// Derive the type directly — no function needed
type Game = Prisma.GameGetPayload<typeof prismaGame>;

interface creator {
    creator_id: string,
    role: string,
}

function mapGame(game: Game) {
    return {
        ...game,
        thumbnail: game.thumbnail ?? "",
        description: game.description ?? "",
        tags: game.tags.map((t) => ({
            id: t.tag.id,
            name: t.tag.name,
            description: t.tag.description ?? "",
        })),
        creators: game.creators.map((c) => ({
            name: c.creator.name,
            picture: c.creator.picture ?? "",
            about: c.creator.about ?? "",
        })),
    }
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
      ...prismaGame,
  });
  return games.map((game) => mapGame(game));
} 

// Read specific game data
export async function getGameById(id: string) {
  const game = await db.game.findUnique({
      where: { id },
      ...prismaGame,
  });
  return game ? mapGame(game) : null;
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
