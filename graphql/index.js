import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as dotenv from 'dotenv';
import { WordPress } from './data-sources/WordPress.js';
import { resolvers } from './resolvers.js';
import { typeDefs } from './schema.js';

dotenv.config();

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    return {
      token: req.headers.token,
      dataSources: {
        wp: new WordPress({
          'url': process.env.WORDPRESS_REST_API_URL
        })
      }
    }
  },
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);