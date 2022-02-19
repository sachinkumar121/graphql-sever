import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt
} from 'graphql';
import fetch from "node-fetch";

const BASE_URL = 'http://localhost:4000';

function fetchResponseByURL(relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function fetchLoads() {
  return fetchResponseByURL('/loads').then(json => json.loads);
}

function fetchLoadByURL(relativeURL) {
  return fetchResponseByURL(relativeURL).then(json => json.load);
}

const LoadType = new GraphQLObjectType({
  name: 'Load',
  description: 'It includes the information about load.',
  fields: () => ({
    id: {type: GraphQLInt},
    label: {type: GraphQLString},
    source: {type: GraphQLString},
    destination: {type: GraphQLString},
    miles: {type: GraphQLFloat}
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    allLoads: {
      type: new GraphQLList(LoadType),
      resolve: fetchLoads,
    },
    load: {
      type: LoadType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (root, args) => fetchLoadByURL(`/loads/${args.id}/`),
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});