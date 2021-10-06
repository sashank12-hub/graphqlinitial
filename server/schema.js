/*


{
  books{
    name,
    authorId,
    genere,author{
      name,age
    }
  }
}*/
const graphql = require("graphql");
const _ = require("lodash");
const { resolve } = require("path");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;
const bookmodel = require("./mongomodels/booksmodel");
const authormodel = require("./mongomodels/authormodel");
// const books=[{
//     id:'1',
//     name:'sashank',
//     genere:'thrillerrrrr',
//     authorId:'1'
// },
// {
//     id:'2',
//     name:'sashank',
//     genere:'thriller',
//     authorId:'2'
// }]

// const authors = [{
//     id:'1',
//     name:"sashank",
//     age:1
// },{
//     id:'2',
//     name:"sashank",
//     age:2
// },
// {
//     id:'3',
//     name:"sashank",
//     age:3
// },
// ]
const BookType = new GraphQLObjectType({
  name: "BOOK",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    genere: {
      type: GraphQLString,
    },
    authorId: {
      type: GraphQLString,
    },
    author: {
      type: authorsType,
      resolve(parent, args) {
        //     console.log(parent)
        //     console.log( _.find(authors,{id:parent.authorId}));
        //    return  _.find(authors,{id:parent.authorId})
        return authormodel.findById(parent.authorId)
    },
    },
  }),
});

const authorsType = new GraphQLObjectType({
  name: "AUTHOR",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    age: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {

        return bookmodel.find({authorId:parent.id})
        // return _.filter(books,{name:parent.name})
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "ROOT",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
          return bookmodel.findById(args.id);
        // return _.find(books,{id:args.id})
      },
    },
    author: {
      type: authorsType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
          return authormodel.findById(args.id);
        //  return _.find(authors,{id:args.id})
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
          return bookmodel.find()
        // return books
      },
    },
    authors: {
      type: new GraphQLList(authorsType),
      resolve() {
          return authormodel.find()
        // return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addAuthor: {
      type: authorsType,
      args: {
        name: {
          type: GraphQLString,
        }, 
        age: {
          type: GraphQLInt,
        },
      },
      resolve(parent, args) {
        let author = new authormodel({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: GraphQLString,
        },
        genere: { type: GraphQLString },
        authorId: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        let book = new bookmodel({
          name: args.name,
          genere: args.genere,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
    delete:{
        type:BookType,
    args:{
        name:{
            type:GraphQLString
        }

    },
    resolve(parent, args) {
      
        return  bookmodel.deleteOne({name:args.name})
      },
}
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});












