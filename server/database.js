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

  async close() {
    this.client.release();
    await this.pool.end();
  }

  async saveLine(slope, intercept) {
    const queryText =
      'INSERT INTO points (slope, intercept) VALUES ($1, $2) RETURNING *';
    const res = await this.client.query(queryText, [slope, intercept]);
    return res.rows;
  }

  async last10Lines() {
    const queryText = 'select * from points order by slope limit 10';
    const res = await this.client.query(queryText);
    return res.rows;
  }

  async updateIntercept(slope,intercept){
    const queryText =
      'Update points set intercept=$2 where slope=$1 RETURNING *';
    const res = await this.client.query(queryText, [slope, intercept]);
    return res.rows;
  }


  async updateSlope(slope,intercept){
    const queryText =
      'Update points set intercept=$1 where slope=$2 RETURNING *';
    const res = await this.client.query(queryText, [slope, intercept]);
    return res.rows;
  }


  async deleteLines(){
    const queryText = 'delete from points';
    const res = await this.client.query(queryText);
    return res.rows;
  }
}

const database = new Database(process.env.DATABASE_URL);

export { database };
