import 'dotenv/config';
import pg from 'pg';


const { Pool } = pg;
/** A class representing a database to store scores */
class Database {
  constructor(path) {
    this.path = path;
  }

  async connect(){
    this.pool = new Pool({
      connectionString: this.path,
      ssl: { rejectUnauthorized: false }, // Required for Heroku connections
    });
    // Create the pool.
    this.client = await this.pool.connect();

    // Init the database.
    await this.init();
  }

  async init() {
    const queryText = `
      create table if not exists points(
        slope float,
        intercept float
      );
    `;
    const res = await this.client.query(queryText);
  }

  // Close the pool.
  async close() {
    this.client.release();
    await this.pool.end();
  }
  /**
   * Saves a word score to the database.
   *
   * This method reads the database file as an object, adds the new score to the
   * data, and then writes the data back to the database file.
   *
   * @param {string} name the name of the player
   * @param {string} word the word played
   * @param {number} score the score of the word
   */
  async saveLine(slope, intercept) {
    const queryText =
      'INSERT INTO points (slope, intercept) VALUES ($1, $2) RETURNING *';
    const res = await this.client.query(queryText, [slope, intercept]);
    return res.rows;
  }

  /**
   * Returns the top 10 word scores.
   *
   * This method reads the database file as an object, sorts the word scores by
   * word score, and returns the top 10.
   *
   * @returns [{name: string, word: string, score: number}] returns the top 10
   * scores
   */
  async last10Lines() {
    const queryText = 'select * from points order by slope limit 10';
    const res = await this.client.query(queryText);
    return res.rows;
  }
}

const database = new Database(process.env.DATABASE_URL);

export { database };
