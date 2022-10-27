import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                savedBooks {
                    bookId
                    authors
                    description
                    title
                    image
                }
                bookCount
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($email: String!,$username: String!,$password: String!) {
        addUser(email: $email, username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const ADD_BOOK = gql`
    mutation saveBook(           
            $bookId: String!
            $authors: [String]!
            $description: String!
            $title: String!
            $image: String!) 
        {
        saveBook(           
            bookId: $bookId
            authors: $authors
            description: $description
            title: $title
            image: $image) {
            user {
                _id
                username
                email
                savedBooks
                bookCount
            }
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            user {
                _id
                username
                email
                savedBooks {
                    bookId
                    authors
                    description
                    title
                    image
                }
                bookCount
            }
        }
    }
`