import { Db, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const DB_NAME = 'ortvest';

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = new MongoClient(uri).connect();
  }
}

export async function getDb(): Promise<Db> {
  if (!uri || !clientPromise) throw new Error('MONGODB_URI is not set');
  const client = await clientPromise;
  return client.db(DB_NAME);
}

export async function getCollection(name: string) {
  const db = await getDb();
  return db.collection(name);
}
