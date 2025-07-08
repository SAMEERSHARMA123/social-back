const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import DB connection, typedefs, resolvers
const DB = require('./DB/db');
const userTypeDefs = require('./UserGraphQL/typeDefs');
const userResolvers = require('./UserGraphQL/resolvers');

// Connect to MongoDB
DB();

const app = express();
app.use(cookieParser());
app.use(express.json()); // ✅ Body parser must come early

const port = process.env.PORT || 5000;

// ✅ Global CORS config
app.use(cors({
  origin: 'https://social-front-virid.vercel.app',
  credentials: true,
}));

// ✅ File upload middleware
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));

// ✅ Log /graphql request bodies
app.use('/graphql', (req, res, next) => {
  if (req.method === 'POST') {
    console.log('--- Incoming /graphql request body ---');
    console.log(JSON.stringify(req.body, null, 2));
  }
  next();
});

// ✅ Apollo Server Setup
async function startServer() {
  const server = new ApolloServer({
    typeDefs: [userTypeDefs],
    resolvers: [userResolvers],
    context: ({ req, res }) => {
      const token = req.cookies.token;
      const io = req.app.get("io");

      if (!token) return { req, res, io };

      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return { req, res, user, io };
      } catch (err) {
        return { req, res, io };
      }
    },
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: 'https://social-front-virid.vercel.app',
      credentials: true,
    },
  });

  app.get('/', (req, res) => {
    res.send('🚀 Server is running...');
  });

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();
