import { getGameTagsByTag } from "@/services/games-gallery/game-tag.service";
import { getGames } from "@/services/games-gallery/game.service";
import { getTags } from "@/services/games-gallery/tag.service";

const Page = async () => {
  const tags = await getTags();
  const games = await getGames();

//   console.log(games)

  const puzzleTag = tags.find((tag) => tag.name === "Puzzle");
  if (puzzleTag) {
    const puzzleGameTags = await getGameTagsByTag(puzzleTag.id);
    console.log(puzzleGameTags);
  }

  return (
    <div className="pt-35">
      <h1>Tags</h1>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>

      <h1>Games</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.name} ({game.tags.map((tag) => tag.name).join(", ")})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
