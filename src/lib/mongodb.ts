import { MongoClient } from "mongodb";

const mongoUrl = process.env.DATABASE_URL!;

class MongoSingleton {
  private static mongoClient: MongoClient;

  static isInitialized(): boolean {
    return this.mongoClient !== undefined;
  }

  static getClient(): MongoClient {
    if (this.isInitialized()) return this.mongoClient;

    this.mongoClient = new MongoClient(mongoUrl);
    return this.mongoClient;
  }
}

export const mongoClient = MongoSingleton.getClient();
