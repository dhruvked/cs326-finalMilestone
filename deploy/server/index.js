import { database } from './database.js';
// TODO #1: Import Morgan and Express

import express from 'express';
import logger from 'morgan';

// TODO #2: Create an Express app.
const app = express();
const port = process.env.PORT || 3000;


//connect to database
database.connect()
// TODO #3: Add middleware to the Express app.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));
// TODO #4: Implement the /wordScore endpoint
app.post('/saveLine',async(req,res)=>{
  try{
    await database.saveLine(req.body['userID'],req.body['slope'],req.body['intercept'])
    res.statusCode=200;
    res.ok=true;
    res.send({status:'success'})
    res.end();
  }
  catch(err){
    console.log(err)
  }
})

// TODO #5: Implement the /highestWordScores endpoint
app.get('/topLines',async(req,res)=>{
  try{
    res.json(await database.top10lines());
    res.statusCode=200;
    res.ok=true;
    res.end();
  }
  catch(err){
    console.log(err);
  }
})

// EVERYTHING BELOW THIS WILL WORK AFTER YOU IMPLEMENT THE ABOVE

// This matches all routes that are not defined.
app.all('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

// Start the server.
app.listen(port, () => {
  // This is totally just for fun!
  const msg = ` Server started on http://localhost:${port}`;
  console.log(msg)
});
