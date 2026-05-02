import { db } from "@/lib/db";

export async function getTags() {
  return db.tag.findMany();
}

export async function getTagById(id: number) {
  return db.tag.findUnique({ where: { id } });
}

export async function createTag(data: { name: string; description: string }) {
  return db.tag.create({ data });
}

export async function updateTag(
  id: number,
  data: Partial<{ name: string; description: string }>
) {
  return db.tag.update({ where: { id }, data });
}

export async function deleteTag(id: number) {
  return db.tag.delete({ where: { id } });
}