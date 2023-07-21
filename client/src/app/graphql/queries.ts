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
export const Get_Candidate_Data = gql`
query GetCandidateData($id: String!) {
  getCandidateData(id: $id) {
    email,
    qualification,
    salary,
    link,
    description,
    location
  }
}`
export const GET_ALL_AVAILABLE_JOBS = gql`
query GetAllAvailableJobs {
  getAllAvailableJobs {
    id,
  title,
  description,
  category,
  salary,
  companyId
  location,
  company {
     companyName 
     companyEmail 
    }
  
  }
}`

export const GET_APPLICATIONS_BY_CANDIDATE_ID = gql`
query GetApplicationsByCandidateId($Id: String!) {
  getApplicationsByCandidateId(candidateId: $Id) {
     id,
   jobId,
   candidateId,   
  }
}`
export const GET_APPLICATIONS_BY_COMPANY_ID = gql`
query GetApplicationsByCompanyId($companyId: String!) {
  getApplicationsByCompanyId(companyId: $companyId) {
    id,
    candidateId
    candidate {
      name,
      qualification
      email,
      location,
      link,
      salary,
      description,
    }
    jobId,
    job{
      title,
    }
  }
}`