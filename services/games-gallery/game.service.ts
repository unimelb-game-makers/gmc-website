import { db } from "@/lib/db";
import { Prisma } from "@/app/generated/prisma";

const gameTagsInclude = { tags: { include: { tag: true } } } satisfies Prisma.GameInclude;

type GameWithTags = Prisma.GameGetPayload<{ include: typeof gameTagsInclude }>;

function flattenTags(game: GameWithTags) {
  return { ...game, tags: game.tags.map(({ tag }) => tag) };
}

export async function getGames() {
  const games = await db.game.findMany({ include: gameTagsInclude });
  return games.map(flattenTags);
}

export async function getApprovedGames() {
  const games = await db.game.findMany({
    where: { approved: true },
    include: gameTagsInclude,
  });
  return games.map(flattenTags);
}

export async function getGameById(id: number) {
  const game = await db.game.findUnique({
    where: { id },
    include: gameTagsInclude,
  });
  return game ? flattenTags(game) : null;
}

export async function createGame(data: {
  name: string;
  thumbnail: string;
  link: string;
  description: string;
  approved: boolean;
}) {
  return db.game.create({ data });
}

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

export async function deleteGame(id: number) {
  return db.game.delete({ where: { id } });
}