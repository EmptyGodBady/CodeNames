import { MongoClient } from "mongodb";

const mongoUri = "mongodb+srv://virtusprodam12:xfzo4qIpnlv1mpZk@cluster0.8gwxcxu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

 class MongoSingleton {
    private static mongoClient: MongoClient;

  static isInitialized(): boolean {
    return this.mongoClient !== undefined;
  }

  static getClient(): MongoClient {
    if (this.isInitialized()) return this.mongoClient;

    // Initialize the connection.
    this.mongoClient = new MongoClient(mongoUri);
    return this.mongoClient;
}}

export const mongoClient = MongoSingleton.getClient();