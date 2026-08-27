/*
  Warnings:

  - The primary key for the `CreatorGame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CreatorGame` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Creator` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CreatorGame" DROP CONSTRAINT "CreatorGame_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CreatorGame_pkey" PRIMARY KEY ("creator_id", "game_id");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_user_id_key" ON "Creator"("user_id");
