import { NextApiHandler } from "next";
import getGames from "../../db/game/queries/getGames";

const games: NextApiHandler = async (req, res) => {
  const allGames = await getGames();
  res.json(allGames);
};

export default games;
