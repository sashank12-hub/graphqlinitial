import { gql,useQuery } from "apollo-boost";

export const getauthorsquery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

export const addBookmutation = gql`
  mutation ($name: String!, $genere: String!, $authorId: ID!) {
    addBook(name: $name, genere: $genere, authorId: $authorId) {
      name
      id
    }
  }
`;

export const getBookquery = gql`
  query Book($id: String!) {
    book(id: $id) {
      name
      genere
      authorid
      author {
        name
        age
        books {
          name
        }
      }
    }
  }
`;
