import { ECollections } from "@/constants/enums";
import { mongoClient } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!mongoClient)
      throw new Error("Error while connecting to mongodb client");

    // if (req.method === "POST") {
    //   const db = mongoClient.db("mydatabase");

    //   const newData = {
    //     lobbyName: "lobby",
    //     gameStatus: "preparation",
    //   };
    //   const result = await db.collection(ECollections.Lobby).insertOne(newData);
    //   return res
    //     .status(201)
    //     .json({ message: "Data saved successfully", data: result });
    // }

    if (req.method === "GET") {
      const db = mongoClient.db("mydatabase");
      const result = await db.collection(ECollections.Lobby).find({}).toArray();
      return res
        .status(201)
        .json({ message: "Data returned successfully", data: result });
    }

    if (req.method === "PUT") {
      const db = mongoClient.db("mydatabase");
      const result = await db
        .collection(ECollections.Users)
        .updateOne(
          { lobbyName: { $eq: "lobby" } },
          { $set: { gameStatus: "gameplay" } }
        );

      return res
        .status(201)
        .json({ message: "Data updated successfully", data: result });
    } else {
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed " });
  }
};

export default handler;

// if (req.method === "DELETE") {
//   const { name } = req.body;
//   const db = mongoClient.db("mydatabase");

//   const result = await db
//     .collection(ECollections.Users)
//     .deleteOne({ name: { $eq: name } });

//   if (result) {
//     return res.status(200).json({ message: "Data deleted successfully" });
//   } else {
//     return res.status(404).json({ message: "Data not found" });
//   }
// }
