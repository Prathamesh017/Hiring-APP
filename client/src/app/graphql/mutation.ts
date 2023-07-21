import { gql } from '@apollo/client'
export const Login_Candidate = gql`
mutation loginCandidate($email: String!, $password:String!){
  loginCandidate(email: $email, password: $password) {
    id,
    name,
    email,
    token
  }
}
`
export const Register_Candidate = gql`
mutation registerCandidate($name:String!,$email: String!, $password: String!){
  registerCandidate(name:$name,email: $email, password: $password){
    __typename
      name,
      email,
      token
  }
}
`

export const Login_Company = gql`
mutation loginCompany($companyEmail: String!, $companyPassword:String!){
  loginCompany(companyEmail: $companyEmail, companyPassword: $companyPassword) {
   id,
   companyName,
   companyDescription
   token,

  }
}
`
export const Register_Company = gql`
 mutation registerCompany($companyName:String!,$companyEmail:String!,$companyPassword:String!,$companyDescription:String!){
 registerCompany(companyName:$companyName,companyEmail:$companyEmail,companyPassword:$companyPassword,companyDescription:$companyDescription){
  id,
   companyEmail,
   companyName,
   token,
   companyDescription


   }
}`
export const Create_Job = gql`
mutation createJob($companyId:String!,$title:String!,$description:String!,$category: String,$salary: String!,$location:String!){
  createJob(companyId:$companyId,title:$title,description:$description,category:$category,salary: $salary,location: $location){
    id,
  }
}
`
export const Update_Job = gql`
 mutation UpdateCandidate($id: String!, $qualification: String!, $salary: String!, $link: String!, $description: String!, $location: String!) {
  updateCandidate(id: $id, qualification: $qualification, salary: $salary, link: $link, description: $description, location: $location) {
     qualification,
     salary,
     link,
     description,
     location
 }
}
 `

export const Create_Appliction = gql` 
mutation CreateApplication($companyId: String!, $jobId: String!, $candidateId: String!) {
  createApplication(companyId: $companyId, jobId: $jobId, candidateId: $candidateId) {
    id,
  }
}`