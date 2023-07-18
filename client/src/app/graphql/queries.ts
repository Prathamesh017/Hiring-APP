import { gql } from '@apollo/client'
export const Get_Candidates = gql`
  query getCandidate {
  getAllCandidates {
    __typename
    name,
    email,
  }
  }
`
export const Get_Jobs = gql`
query GetAllJobs($companyId:String!){
  getAllJobs(companyId:$companyId){
  id,
  title,
  description,
  category,
  salary,
  location,
}
}
`
