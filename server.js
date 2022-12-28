import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import Schema from "./schema.js"; 
import { loads, users, posts} from "./mock-data.js"; 
process.setMaxListeners(0);

var app = express();

// enable cors for react native.
var corsOptions = {
  origin: 'http://localhost:19006',
  credentials: true // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));

app.get('/loads', (req, res) => {
  res.json({loads});
});

app.get('/loads/:id', (req, res) => {
  let load = loads.find(l => l.id == req.params.id);
  res.json({load});
});

app.get('/users', (req, res) => {
  res.json({users});
});

app.get('/users/:id', (req, res) => {
  let user = users.find(l => l.id == req.params.id);
  res.json({user});
});

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));