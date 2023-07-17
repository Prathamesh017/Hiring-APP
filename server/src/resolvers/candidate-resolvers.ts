import { authHandler } from "../middleware/middleware";
import CandidateService from "../services/candidate-service";
import { GraphQLError } from 'graphql';
const candidateService = new CandidateService();
const candidateResolvers = {
  Query: {
    getAllCandidates: async (parent, args) => {
      let getAllCandidates = await candidateService.getAllCandidates();
      return getAllCandidates
    }

  },
  Mutation: {
    registerCandidate: async (parent, args) => {
      try {
        let candidate = await candidateService.registerCandidate(args.name, args.email, args.password);
        return candidate;
      } catch (error) {
        throw new GraphQLError(error.message);
      }

    },
    loginCandidate: async (parent, args, contextValue) => {
      try {
        // let auth = await authHandler(contextValue.token)

        let candidate = await candidateService.loginCandidate(args.email, args.password);

        return candidate;
      } catch (error) {
        throw new GraphQLError(error.message);
      }

    },

  }

};

export default candidateResolvers;