import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import Schema from "./schema.js"; 
process.setMaxListeners(0);

var app = express();

// enable cors for react native.
var corsOptions = {
  origin: 'http://localhost:19006',
  credentials: true // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));

const loads = [
  {
    "id": 1904,
    "label": "LOAD #1904",
    "source": "philadelphia 1",
    "destination": "chicago 1",
    "miles": "1280"
  },
  {
    "id": 1905,
    "label": "LOAD #1905",
    "source": "philadelphia 2",
    "destination": "chicago 2",
    "miles": "1080"
  },
  {
    "id": 1906,
    "label": "LOAD #1906",
    "source": "philadelphia 3",
    "destination": "chicago 3",
    "miles": "1080"
  }
];
app.get('/loads', (req, res) => {
  res.json({loads});
});

app.get('/loads/:id', (req, res) => {
  let load = loads.find(l => l.id == req.params.id);
  res.json({load});
});

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));