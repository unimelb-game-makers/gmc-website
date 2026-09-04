'use server';

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getCurrentAdmin } from "@/services/games-gallery/admin.service";

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

// Read all tags along with their frontpage-featured state, for the admin page
export async function getTagsWithFeaturedState() {
  return db.tag.findMany({
      orderBy: [{ featured_order: "asc" }, { name: "asc" }],
      select: {
          id: true,
          name: true,
          featured: true,
          featured_order: true,
      },
  });
}

export async function getTagById(id: number) {
  return db.tag.findUnique({ where: { id } });
}

export async function createTag(data: { name: string; description: string; featured?: boolean; featured_order?: number }) {
  if (!(await getCurrentAdmin())) {
    throw new Error('Not authorized');
  }

  return db.tag.create({ data });
}

export async function updateTag(
  id: number,
  data: Partial<{ name: string; description: string; featured: boolean; featured_order: number | null }>
) {
  if (!(await getCurrentAdmin())) {
    throw new Error('Not authorized');
  }

  return db.tag.update({ where: { id }, data });
}

export async function deleteTag(id: number) {
  if (!(await getCurrentAdmin())) {
    throw new Error('Not authorized');
  }

  return db.tag.delete({ where: { id } });
}

export async function updateFeaturedTags(formData: FormData) {
  const tags = await getTagsWithFeaturedState();

  await Promise.all(
    tags.map((tag) => {
      const featured = formData.get(`featured-${tag.id}`) === 'on';
      const orderRaw = formData.get(`order-${tag.id}`);
      const featured_order = orderRaw && orderRaw.toString().length > 0 ? Number(orderRaw) : null;

      return updateTag(tag.id, { featured, featured_order });
    })
  );

  revalidatePath('/gallery');
  revalidatePath('/gallery/admin');
}

export async function addTag(formData: FormData) {
  const name = formData.get('name');

  if (typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Tag name is required');
  }

  await createTag({ name: name.trim(), description: '' });

  revalidatePath('/gallery/admin');
}

export async function removeTag(formData: FormData) {
  const tagId = formData.get('tagId');

  if (typeof tagId !== 'string') {
    throw new Error('Missing tag to remove');
  }

  await deleteTag(Number(tagId));

  revalidatePath('/gallery');
  revalidatePath('/gallery/admin');
}
