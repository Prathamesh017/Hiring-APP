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
   companyName,
   companyDescription

  }
}
`
export const Register_Company = gql`
 mutation registerCompany($companyName:String!,$companyEmail:String!,$companyPassword:String!,$companyDescription:String!){
 registerCompany(companyName:$companyName,companyEmail:$companyEmail,companyPassword:$companyPassword,companyDescription:$companyDescription){
   companyEmail,
   companyName,
   companyDescription
   }
}`
