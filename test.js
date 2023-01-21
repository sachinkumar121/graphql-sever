import express from "express";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Query {
            hello: String
            me: User
            user(id: Int!): User
            allUsers(sort: SortType = Date): [User!]!
        }
        type Mutation {
            addUser(user: UserInput): User
        }
        input UserInput {
            name: String!
            age: Int!
        }
        type User {
            id: Int
            name: String
            age: Int
        }
        enum SortType {
            Date
            Age
        }
    `),
    rootValue: {
        hello: () => 'Hello World!',
        me: () => ({'id': 121, 'name': 'Sachin Kumar', age: 23}),
        user: ({id}) => ({id, 'name': 'Search Kumar', age: 23}),
        allUsers: ({sort}) => {
            console.log(`sort by ${sort}`);
            return [{'id': 121, 'name': 'Sachin Kumar', age: 23}, {'id': 122, 'name': 'Sumit Kumar', age: 24}]
        },
        addUser: ({user}) => {
            // add user to DB and return.
            return {
                id: 342,
                ...user
            }
        }
    },
    graphiql: true,
    pretty: true
}));

app.get('/', function(req, res) {
    return res.send('working');
});

app.listen(4000, () => console.log('Graphql Server is browse to http://localhost:4000/graphql'));