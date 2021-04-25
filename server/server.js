const express = require('express')
const colors = require('colors')
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv')
const cors = require('cors')

const schema = require('./schema/schema')
const connectDB = require('./config/db')

const app = express()

dotenv.config()
connectDB()
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

const PORT = process.env.PORT || 50000

app.listen(PORT, console.info(`Server runing on port ${PORT}`.yellow.bold))