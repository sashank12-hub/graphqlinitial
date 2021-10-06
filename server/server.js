const express=require('express');
const app=express();
const {VARIABLES}=require('./variables')
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
console.log(VARIABLES);
const x=VARIABLES.MONGO_URL.replace('myFirstDatabase','graphql')
const cors=require('cors')
app.use(cors())
mongoose
  .connect(VARIABLES.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line
    console.log("Database Connection Established...!");
  })
  .catch((err) => {
    // eslint-disable-next-line
    console.log("Error: Database connection can not be established...!", err);
  });

const schema =require('./schema');

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true,
}));

app.listen(4000,()=>{
    console.log('started')
})
