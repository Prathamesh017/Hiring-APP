'use client'
import React from 'react'
import Form from './form'
import { Get_Candidate_Data } from '@/app/graphql/queries'
import { useQuery } from '@apollo/client'
import Loading from '../form/loadingSpinner'
function Page() {
  let data = JSON.parse(localStorage.getItem('data') as string)
  const { loading, error, data: candidateData } = useQuery(Get_Candidate_Data, {
    variables: { id: data.loginCandidate.id },
  })

  return (
    <div>
      <div className="grid grid-rows-1 md:grid-cols-2  mt-10 ">
        <div className=" description-box p-4 space-y-8 text-sm md:text-base">
          <h1 className="text-[#01967b] text-lg md:text-xl ">
            Candidate Profile
          </h1>
          {candidateData && candidateData.getCandidateData.description ? (
            <>
              <p>
                Qualification: {candidateData.getCandidateData.qualification}
              </p>
              <p>Description : {candidateData.getCandidateData.description}</p>
              <p>
                Github :
                <span className="text-sky-700">
                  {candidateData.getCandidateData.link}
                </span>
              </p>
              <div className="flex w-full justify-between">
                <p>
                  Expected Salary: &#8377;
                  <span className="text-[#01967b]">
                    {candidateData.getCandidateData.salary}
                  </span>
                </p>
                <p>
                  Location :
                  <span className="text-[#01967b]">
                    {candidateData.getCandidateData.location}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <p className="text-center">
              {loading ? (
                <Loading></Loading>
              ) : (
                <span className="text-[#01967b]">
                  No Profile Please Update Profile
                </span>
              )}
            </p>
          )}
        </div>
        <Form></Form>
      </div>
    </div>
  )
}

export default Page
