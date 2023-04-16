import express from "express";
import cors from "cors";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";

const app = express();
app.use(cors());

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
            about: String
        }
        enum SortType {
            Date
            Age
        }
    `),
    rootValue: {
        hello: () => 'Hello World!',
        me: () => ({'id': 121, 'name': 'Sachin Kumar', age: 23, about: "My name is Sachin Kumar and I am a full-stack Web Application Developer and Software Developer, currently living in Ambala, Haryana(India). I have a Master of Computer Science from Kurukshetra University, and my primary focus and inspiration for my studies are Web Development. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development and strive to better myself as a developer, and the development community as a whole."}),
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