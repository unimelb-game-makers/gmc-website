-- CreateTable
CREATE TABLE "Creator" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "about" TEXT NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatorGame" (
    "id" UUID NOT NULL,
    "game_id" UUID NOT NULL,
    "creator_id" UUID NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "CreatorGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatorLink" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "creator_id" UUID NOT NULL,

    CONSTRAINT "CreatorLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT,
    "link" TEXT,
    "description" TEXT,
    "approved" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameTag" (
    "game_id" UUID NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "GameTag_pkey" PRIMARY KEY ("game_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "CreatorGame" ADD CONSTRAINT "CreatorGame_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatorGame" ADD CONSTRAINT "CreatorGame_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatorLink" ADD CONSTRAINT "CreatorLink_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameTag" ADD CONSTRAINT "GameTag_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameTag" ADD CONSTRAINT "GameTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
