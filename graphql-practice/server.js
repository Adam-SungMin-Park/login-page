const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const app = express();
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')

const BookType = new GraphQLObjectType({
  name:'book',
  description: "Book by the author",
  fields:()=>({
    id:{ type: GraphQLNonNull(GraphQLInt)},
    name: {type: GraphQLNonNull(GraphQLString)},
    authorId: { type: GraphQLNonNull(GraphQLInt)}
  })
})



const RootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields:()=>({
    books:{
      type: new GraphQLList(BookType),
      description:'List of books',
      resolve:()=> books
    }
  })
})
const schema = new GraphQLSchema({
  query : RootQuery
})
app.use('/graphql',graphqlHTTP({
  schema:schema,
  graphiql:true
}))


app.listen(3000, ()=>console.log('server running'));
