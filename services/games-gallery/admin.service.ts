import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/games-gallery/auth.service";

export async function isAdmin(userId: string) {
  const admin = await db.admin.findFirst({ where: { user_id: userId } });

  return admin !== null;
}

// Returns the logged-in Supabase user if they are an admin, otherwise null
export async function getCurrentAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (await isAdmin(user.id)) ? user : null;
}

// Grants admin access to an existing Supabase user (e.g. an existing creator)
export async function createAdmin(userId: string, username: string) {
  if (await isAdmin(userId)) {
    return;
  }

  await db.admin.create({ data: { user_id: userId, username } });
}
