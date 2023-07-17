import gql from "graphql-tag";
const candidatetypeDefs = gql`
  # Types Models
  type Candidate {
    id:String,
    name: String
    email: String
    token:String
  }
  
  
  # Types Query  - consist all get methods
  type Query{
    getAllCandidates:[Candidate]
   
  }
  #Type Mutation - consist of all post/put/delete methods
  type Mutation{
    registerCandidate(name:String!,email:String!,password:String!):Candidate
    loginCandidate(email:String!,password:String!):Candidate
  
  }

`;


export default candidatetypeDefs;