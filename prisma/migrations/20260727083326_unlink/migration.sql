-- AlterTable
ALTER TABLE "Creator" ADD COLUMN     "user_id" UUID;

-- CreateTable
CREATE TABLE "Admin" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
