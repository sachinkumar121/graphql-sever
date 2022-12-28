import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const UserStatuses = Object.freeze({
    "registered": "REGISTERED",
    "active": "ACTIVE",
    "inactive": "INACTIVE"
});
const users = [
    {
        "id": 120,
        "first_name": "Admin",
        "last_name": "Kumar",
        "email": "admin@yopmail.com",
        "dob": "1980-01-01",
        "age": 42,
        "is_admin": true,
        "status": UserStatuses['active']
    },
    {
        "id": 121,
        "first_name": "Sachin",
        "last_name": "Kumar",
        "email": "sachin@yopmail.com",
        "dob": "1994-01-01",
        "age": 28,
        "status": UserStatuses['active'],
        "tasks": []
    },
    {
        "id": 122,
        "first_name": "Sumit",
        "last_name": "Kumar",
        "email": "sumit@yopmail.com",
        "dob": "1992-01-01",
        "age": 30,
        "status": UserStatuses['active'],
        "tasks": []
    },
    {
        "id": 123,
        "first_name": "Akash",
        "last_name": "Kumar",
        "email": "akash@yopmail.com",
        "dob": "1993-01-01",
        "age": 29,
        "status": UserStatuses['inactive'],
        "tasks": []
    },
    {
        "id": 124,
        "first_name": "Ravi",
        "last_name": "Kumar",
        "email": "ravi@yopmail.com",
        "dob": "1991-01-01",
        "age": 31,
        "status": UserStatuses['registered'],
        "tasks": []
    }
];

var schema = buildSchema(`
    type Query {
        user(id: Int): AppUser
    }
    interface User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
    }
    enum UserStatus {
        REGISTERED
        ACTIVE
        INACTIVE
    }

    type AppUser implements User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
    
        age: Int!
        status: UserStatus!
    }
    type AdminUser implements User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
    
        is_admin: Boolean
        status: UserStatus!
    }
`);

var root = {
    user: function ({id}) {
        let user = users.find(u => u.id == id);
        return user;
    },
}

var app = express();

// for testing purposes.
app.get('/', (req, res) => {
    return res.send("Hello World!");
});

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    pretty: true,
    graphiql: true
}))

app.listen(4000, () => console.log('Graphql Server is browse to http://localhost:4000/graphql'));