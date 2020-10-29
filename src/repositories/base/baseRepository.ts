// import all interfaces
import IWrite from '../interfaces/IWrite';
import IRead from '../interfaces/IRead';

import { MongoClient, Db, Collection, InsertOneWriteOpResult } from 'mongodb';

// that class only can be extended
abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {

  public readonly _collection: Collection;

  constructor(db: Db, collectionName: string) {
    this._collection = db.collection(collectionName);
  }

  async create(item: T): Promise<boolean> {
    const result: any = await this._collection.insert(item);
    return !!result.result.ok; // return true/false
  }

  update(id: string, item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: T): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
}

export default BaseRepository;