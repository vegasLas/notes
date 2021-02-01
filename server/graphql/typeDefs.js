const { gql } = require('apollo-server')

module.exports = gql`
    type Note {
        username: String!
        id: ID!
        body: String!
        createdAt: String!
        title: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query{
        getNotes: [Note]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createNote(body: String!, title: String!): Note!
        deleteNote(noteId: ID!): String!
    }
    type Subscription {
        newNote: Note!
    }
`;