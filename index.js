import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { users, createUser, createTask, createTaskComment } from "./mock-data.js";

var schemaOld = buildSchema(`
    type Query {
        hello: String
        user(id: String): User
        filterUsers(filter: String): [User]
    }
    type Mutation {
        addUser: User
    }
    type User {
        first_name: String
        last_name: String
        email: String
        dob: String
    }
    input UserInput {
        first_name: String
        last_name: String
        email: String
        dob: String
    }
`);

/*
 * As of now, We are using the mock users from mock-data.js file
 * In the real world, we will fetch the users from the database using appropiate database driver or from a service.
*/
var schema = buildSchema(`
    type Query {
        hello: String
        admin: AdminUser
        appUsers: [AppUser],
        genericUser(id: Int): AppUser
        user(id: Int): AppUser
        filterUsersWithArgs(name: String, status: UserStatus = ACTIVE): [AppUser]
    }
    type Mutation {
        addUser(user: UserInput): AppUser
        addTask(task: TaskInput): Task
        addTaskComment(comment: CommentInput): Comment
    }

    interface User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
    }
    union UserType = AppUser | AdminUser

    enum UserStatus {
        REGISTERED
        ACTIVE
        INACTIVE
    }
    enum TaskStatus {
        OPEN
        INPROGRESS
        COMPLETED
    }

    type AppUser implements User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
      
        age: Int!
        status: UserStatus!
        tasks: [Task!]
        friends: [AppUser!]
    }
    type AdminUser implements User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
      
        is_admin: Boolean
        status: UserStatus!
    }

    type Task {
        id: ID!
        title: String!
        description: String!
        status: TaskStatus!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author_id: Int!
        author: AppUser!
    }

    input UserInput {
        first_name: String!
        last_name: String!
        email: String!
        age: Int!
    }
    input TaskInput {
        title: String!
        description: String!
        user_id: Int!
    }
    input CommentInput {
        task_id: Int!
        author_id: Int!
        text: String!
    }
`);

var root = {
    hello: () => 'Hello World!',
    admin: function(obj, args, context, info) {
        return users.find(u => u.is_admin);
    },
    appUsers: function() {
        return users.filter(u => !u.is_admin);
    },
    user: function ({id}) {
        let user = this.appUsers().find(u => u.id == id);
        return user;
    },
    genericUser: function ({id}) {
        let user = users.find(u => u.id == id);
        return user;
    },
    filterUsersWithArgs: function (filterObj) {
        return this.appUsers().filter(u => {
            return (u.first_name == filterObj.name || u.last_name == filterObj.name) && (u.status == filterObj.status);
        });
    },
    addUser: function(userPayload) {
        return createUser(userPayload.user);
    },
    addTask: function({ task }) {
        return createTask(task)
    },
    addTaskComment: function({ comment }) {
        return createTaskComment(comment)
    }
}

var app = express();

// for testing purpose.
app.get('/', (req, res) => {
    return res.send("Hello World!");
});

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    pretty: true,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(4000, () => console.log('Graphql Server is browse to http://localhost:4000/graphql'));