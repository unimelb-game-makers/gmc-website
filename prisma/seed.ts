// Seeds the local database with the placeholder games shown in
// app/gallery/page.tsx (galleryGames), so getGames()/getGameById() have
// real rows to read during local development.
//
// Run via `npx prisma db seed` (also runs automatically after
// `prisma migrate reset`), configured through prisma.config.ts.

import { db } from "@/lib/db";

const TAGS = [
  "Puzzle", "Casual", "Fantasy", "Arcade", "Speed", "Sci-Fi",
  "Strategy", "Card", "Action", "Boss Rush", "Dungeon", "Pixel",
  "Platformer", "Winter", "Cozy", "Adventure", "Narrative", "Mystery",
  "Precision", "Jam", "Racing", "Multiplayer", "Co-op", "Horror",
  "Experimental", "Art", "Comedy", "Exploration", "Shooter", "Color",
];

const CREATORS = [
  { name: "GMC Artist", picture: "/images/gmc_site_avatar.png", about: "A featured student from Game Maker's Club." },
  { name: "GMC Programmer", picture: "/images/gmc-cat.png", about: "A featured student from Game Maker's Club." },
  { name: "GMC Designer", picture: "/images/gmc-cat-whiteboard.png", about: "A featured student from Game Maker's Club." },
  { name: "GMC Developer", picture: "/images/gmc-cat-mail.png", about: "A featured student from Game Maker's Club." },
  { name: "GMC Illustrator", picture: "/images/committee.png", about: "A featured student from Game Maker's Club." },
];

const GAMES = [
  { name: "Anatis", thumbnail: "/images/games_examples/game27.png", description: "2025 Mid Sem Winner", tags: ["Puzzle", "Casual", "Fantasy"], creators: ["GMC Artist", "GMC Programmer"] },
  { name: "Neon Relay", thumbnail: "/images/games_examples/game2.png", description: "2025 Mid Sem Winner", tags: ["Arcade", "Speed", "Sci-Fi"], creators: ["GMC Designer"] },
  { name: "Petal Shift", thumbnail: "/images/games_examples/game3.png", description: "2025 Mid Sem Winner", tags: ["Strategy", "Fantasy", "Card"], creators: ["GMC Illustrator"] },
  { name: "Velvet Zero", thumbnail: "/images/games_examples/game4.png", description: "2025 Mid Sem Winner", tags: ["Action", "Sci-Fi", "Boss Rush"], creators: ["GMC Developer"] },
  { name: "Cassidy Dungeon", thumbnail: "/images/games_examples/game1.png", description: "Winter Jam 2026", tags: ["Dungeon", "Pixel", "Action"], creators: ["GMC Designer"] },
  { name: "Frostbyte Sprint", thumbnail: "/images/games_examples/game5.png", description: "Winter Jam 2026", tags: ["Platformer", "Winter", "Arcade"], creators: ["GMC Artist"] },
  { name: "Lantern Loop", thumbnail: "/images/games_examples/game6.png", description: "Winter Jam 2026", tags: ["Puzzle", "Cozy", "Adventure"], creators: ["GMC Programmer"] },
  { name: "Snowglobe Signal", thumbnail: "/images/games_examples/game7.png", description: "Winter Jam 2026", tags: ["Narrative", "Winter", "Mystery"], creators: ["GMC Developer"] },
  { name: "Clockwork Orbit", thumbnail: "/images/games_examples/game25.png", description: "GMC x CISSA 2026", tags: ["Arcade", "Precision", "Jam"], creators: ["GMC Developer"] },
  { name: "Wireframe Run", thumbnail: "/images/games_examples/game16.png", description: "GMC x CISSA 2026", tags: ["Racing", "Sci-Fi", "Multiplayer"], creators: ["GMC Programmer"] },
  { name: "Switchblade Garden", thumbnail: "/images/games_examples/game18.png", description: "GMC x CISSA 2026", tags: ["Action", "Fantasy", "Co-op"], creators: ["GMC Illustrator"] },
  { name: "Echo Cabinet", thumbnail: "/images/games_examples/game19.png", description: "GMC x CISSA 2026", tags: ["Horror", "Mystery", "Puzzle"], creators: ["GMC Artist"] },
  { name: "Eye Bloom", thumbnail: "/images/games_examples/game20.png", description: "2025 Showcase", tags: ["Experimental", "Art", "Casual"], creators: ["GMC Illustrator"] },
  { name: "Cardboard Crown", thumbnail: "/images/games_examples/game21.png", description: "2025 Showcase", tags: ["Adventure", "Comedy", "Card"], creators: ["GMC Designer"] },
  { name: "Moon Static", thumbnail: "/images/games_examples/game23.png", description: "2025 Showcase", tags: ["Sci-Fi", "Narrative", "Exploration"], creators: ["GMC Programmer"] },
  { name: "Prism Patrol", thumbnail: "/images/games_examples/game24.png", description: "2025 Showcase", tags: ["Shooter", "Arcade", "Color"], creators: ["GMC Artist"] },
];

async function main() {
  // children first to satisfy foreign keys
  await db.gameTag.deleteMany();
  await db.creatorGame.deleteMany();
  await db.game.deleteMany();
  await db.tag.deleteMany();
  await db.creator.deleteMany();

  await db.tag.createMany({ data: TAGS.map((name) => ({ name })) });
  const tags = await db.tag.findMany();
  const tagIdByName = new Map(tags.map((t) => [t.name, t.id]));

  await db.creator.createMany({ data: CREATORS });
  const creators = await db.creator.findMany();
  const creatorIdByName = new Map(creators.map((c) => [c.name, c.id]));

  for (const game of GAMES) {
    await db.game.create({
      data: {
        name: game.name,
        thumbnail: game.thumbnail,
        description: game.description,
        approved: true,
        tags: {
          create: game.tags.map((name) => ({
            tag: { connect: { id: tagIdByName.get(name)! } },
          })),
        },
        creators: {
          create: game.creators.map((name) => ({
            role: "Contributor",
            creator: { connect: { id: creatorIdByName.get(name)! } },
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
