import gql from "graphql-tag";
const jobtypeDefs = gql`
  # Types Models
  
  type Jobs{
  id: String,
  companyId: String,
  title: String
  description: String
  category: String
  salary: String
  location: String
  # applieadCandidates: String[]
  }
  
  # # Types Query  - consist all get methods
  type Query{
    getAllJobs(companyId:String!):[Jobs]
   
  }
  #Type Mutation - consist of all post/put/delete methods
  type Mutation{
    createJob(companyId:String!,title:String!,description:String!,category: String,salary: String!,location: String!):Company,
    deleteJob(id:String!):Company
    # updateJob()
  }

`;


export default jobtypeDefs;