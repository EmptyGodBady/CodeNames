import { mongoClient } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
    

        if(!mongoClient) throw new Error("Error while connecting to mongodb client")


      const db = mongoClient.db('mydatabase');

      const newData = {
        name: req.body.name,
        teamIdentifier: null,
      };

      const result = await db.collection('messages').insertOne(newData);

      res.status(201).json({ message: 'Data saved successfully', data: result});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;