import { db } from "@/lib/db";

// import { Prisma } from "@/app/generated/prisma";
// import { Game, Tag} from "@/@types/gallery-schema";

// type PrismaGame = Prisma.GameGetPayload<{
//     include: {
//         tags: {
//             include: {
//                 tag: true
//             }
//         }
//     }
// }>;
//
// type PrismaGameTag = Prisma.GameTagGetPayload<{
//     include: {
//         tag: true
//     }
// }>;
//
// // Mapping
//
// function mapGame(input: PrismaGame): Game {
//     return {
//         id: input.id,
//         name: input.name,
//         description: input.description,
//         thumbnail: input.thumbnail,
//         link: input.link,
//         approved: input.approved,
//         created_at: input.create_at,
//         updated_at: input.updated_at,
//
//         tags: input.tags.map((tag: PrismaGameTag): Tag => {
//             return tag.tag;
//         }),
//
//         creators: [],
//     }
// }

// CRUD Functions

// Create Game
export async function createGame(data: {
  name: string;
  thumbnail: string;
  link: string;
  description: string;
  tagIds: number[];
  // creators: number[];
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
export async function getGameById(id: number) {
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
  id: number,
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
export async function deleteGame(id: number) {
  return db.game.delete({ where: { id } });
}
