import { db } from "@/lib/db";

export async function getGames() {
  return db.game.findMany({
    include: { tags: { include: { tag: true } } },
  });
}

export async function getApprovedGames() {
  return db.game.findMany({
    where: { approved: true },
    include: { tags: { include: { tag: true } } },
  });
}

export async function getGameById(id: number) {
  return db.game.findUnique({
    where: { id },
    include: { tags: { include: { tag: true } } },
  });
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