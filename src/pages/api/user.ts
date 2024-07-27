import { ECollections, EUserRole } from "@/constants/enums";
import { mongoClient } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = mongoClient.db("mydatabase");

    if (!mongoClient)
      throw new Error("Error while connecting to mongodb client");

    if (req.method === "POST") {
      const newData = {
        name: req.body.name,
        teamIdentifier: null,
        userRole: EUserRole.Spectator,
      };
      const result = await db.collection(ECollections.Users).insertOne(newData);
      return res
        .status(201)
        .json({ message: "Data saved successfully", data: result });
    }

    if (req.method === "GET") {
      const result = await db.collection(ECollections.Users).find({}).toArray();

      return res
        .status(201)
        .json({ message: "Data returned successfully", data: result });
    }

    if (req.method === "DELETE") {
      const { name } = req.body;

      const result = await db
        .collection(ECollections.Users)
        .deleteOne({ name: { $eq: name } });

      if (result) {
        return res.status(200).json({ message: "Data deleted successfully" });
      } else {
        return res.status(404).json({ message: "Data not found" });
      }
    }

    if (req.method === "PUT") {
      const { name, teamIdentifier, userRole } = req.body;
      const result = await db
        .collection(ECollections.Users)
        .updateOne(
          { name: { $eq: name } },
          { $set: { teamIdentifier: teamIdentifier, userRole: userRole } }
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
