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
