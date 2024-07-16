import { mongoClient } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      if(!mongoClient) throw new Error("Error while connecting to mongodb client")
        
      const {name, teamIdentifier} = req.body;

      const db = mongoClient.db('mydatabase');
        const result = await db.collection('messages').updateOne({name:{$eq:name}},{$set:{teamIdentifier:teamIdentifier}});

      res.status(201).json({ message: 'Data updated successfully', data: result});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update data' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;