import { gql } from '@apollo/client'
export const Login_Candidate = gql`
mutation loginCandidate($email: String!, $password:String!){
  loginCandidate(email: $email, password: $password) {
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
