import { db } from "@/lib/db";

export async function getTags() {
  return db.tag.findMany({
      select: {
          id: true,
          name: true,
          description: true,
      },
  });
}

// Read tags flagged for display on the frontpage, in curated order
export async function getFeaturedTags() {
  const tags = await db.tag.findMany({
      where: { featured: true },
      orderBy: { featured_order: "asc" },
      select: {
          id: true,
          name: true,
          description: true,
      },
  });

  return tags.map((tag) => ({ ...tag, description: tag.description ?? "" }));
}

export async function getTagById(id: number) {
  return db.tag.findUnique({ where: { id } });
}

export async function createTag(data: { name: string; description: string; featured?: boolean; featured_order?: number }) {
  return db.tag.create({ data });
}

export async function updateTag(
  id: number,
  data: Partial<{ name: string; description: string; featured: boolean; featured_order: number }>
) {
  return db.tag.update({ where: { id }, data });
}

export async function deleteTag(id: number) {
  return db.tag.delete({ where: { id } });
}
