import { ECollections } from "@/constants/enums";
import { mongoClient } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!mongoClient)
      throw new Error("Error while connecting to mongodb client");

    if (req.method === "POST") {
      const db = mongoClient.db("mydatabase");

      const newData = {
        name: req.body.name,
        teamIdentifier: null,
      };
      const result = await db.collection(ECollections.Users).insertOne(newData);
      return res
        .status(201)
        .json({ message: "Data saved successfully", data: result });
    }

    if (req.method === "GET") {
      const db = mongoClient.db("mydatabase");
      const result = await db.collection(ECollections.Users).find({}).toArray();
      console.log(result);
      return res
        .status(201)
        .json({ message: "Data returned successfully", data: result });
    }
    if (req.method === "PUT") {
      const { name, teamIdentifier } = req.body;

      const db = mongoClient.db("mydatabase");
      const result = await db
        .collection(ECollections.Users)
        .updateOne(
          { name: { $eq: name } },
          { $set: { teamIdentifier: teamIdentifier } }
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
