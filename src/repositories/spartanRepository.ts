import BaseRepository from "./base/BaseRepository";
import Spartan from "../entities/spartan";

class SpartanRepository extends BaseRepository<Spartan>{
  countOfSpartans(): Promise<number> {
    return this._collection.count({});
  }
}

export default SpartanRepository;