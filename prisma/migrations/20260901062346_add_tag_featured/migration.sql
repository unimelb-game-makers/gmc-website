-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "featured_order" INTEGER;
