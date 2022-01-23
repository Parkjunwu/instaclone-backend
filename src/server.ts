require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import client from "./client";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./user/user.utils";
import * as express from "express";
import * as logger from "morgan";
import * as http from "http"

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  /////////여기 밑에 두개 지워라/////
  // playground:true,
  // introspection:true,
  ////////여기 위에 두개 지워라///////
  context: async (context) => {
    if(context.req){
      return {
        loggedInUser: await getUser(context.req.headers.token),
        client,
      };
    } else {
      const {connection:{context:{loggedInUser}}} = context
      return {loggedInUser}
    }
  },
  subscriptions:{
    onConnect: async({token}:{token:String}) => {
      if(!token) {
        throw new Error("You can't listen.")
      }
      return {
        loggedInUser: await getUser(token),
        // client,
      };
    }
    // onConnect: async({token}:{token?:String}) => {
    //   console.log(token);
    //   if(!token) {
    //     throw new Error("You can't listen.")
    //   }
    //   return {
    //     loggedInUser: await getUser(token),
    //     // client,
    //   };
    // }
  }
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });
const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
});
