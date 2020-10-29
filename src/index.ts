import { MongoClient } from 'mongodb';

import SpartanRepository from './repositories/spartanRepository'
import HeroRepository from './repositories/heroRepository'
import Spartan from './entities/spartan';
import Hero from './entities/Hero';

(async () => {
  const connection = await MongoClient.connect('mongodb://localhost');
  const db = connection.db('warriors');

  const spartan = new Spartan('Leonidas', 1020);

  // initializing the repository
  const repository = new SpartanRepository(db, 'spartans');

  // call create method from generic repository
  const result = await repository.create(spartan);
  console.log(result); //  true

  // call specific method from spartan class
  const count = await repository.countOfSpartans();
  console.log(count); // 1

  const hero = new Hero('Spider Man', 200);
  const repositoryHero = new HeroRepository(db, 'heroes');
  const resultHero = await repositoryHero.create(hero);
  console.log(resultHero); // true
})();