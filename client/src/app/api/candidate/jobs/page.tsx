'use client'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  GET_ALL_AVAILABLE_JOBS,
  GET_APPLICATIONS_BY_CANDIDATE_ID,
} from '@/app/graphql/queries'
import { Create_Appliction } from '@/app/graphql/mutation'
import Loading from '../../form/loadingSpinner'
function JobPosted() {
  const candidateData = JSON.parse(localStorage.getItem('data') as string)
  const [applicationId, setApplicationId] = useState<String>('')
  let appliedJobs: String[] = []
  const { loading, error, data } = useQuery(GET_ALL_AVAILABLE_JOBS, {
    variables: { candidateId: candidateData.loginCandidate.id },
  })
  const {
    loading: getApplicationLoading,
    error: getApplicationError,
    data: getApplicationData,
    refetch,
  } = useQuery(GET_APPLICATIONS_BY_CANDIDATE_ID, {
    variables: { Id: candidateData.loginCandidate.id },
  })
  if (getApplicationData) {
    refetch({ Id: candidateData.loginCandidate.id })
    appliedJobs = getApplicationData.getApplicationsByCandidateId.map(
      (application: any) => {
        return application.jobId
      },
    )
  }
  const [
    createApplication,
    {
      data: applicationData,
      loading: loadingApplications,
      error: applicationsErrors,
    },
  ] = useMutation(Create_Appliction)

  const applyForJobs = (jobId: string, companyId: string) => {
    createApplication({
      variables: {
        candidateId: candidateData.loginCandidate.id,
        jobId,
        companyId,
      },
    })
  }
  return (
    <div className="job-container w-full p-4 mt-2  md:mt-10">
      <div className="grid  grid-cols-1 gap-4 md:grid-cols-3 mt-10">
        {data ? (
          data.getAllAvailableJobs.map((job: any) => {
            return (
              <div key={job.id}>
                <a className="block max-w-sm p-6  border border-gray-200 bg-zinc-800 rounded-lg shadow">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {job.title}
                  </h5>
                  <hr></hr>
                  <p className="font-normal text-gray-700 my-1 dark:text-gray-400">
                    Company:{job.company.companyName}
                  </p>
                  <p className="font-normal text-gray-700 my-1 dark:text-gray-400">
                    {job.company.companyEmail}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {job.description}
                  </p>
                  <div className="flex w-full justify-between mt-1">
                    <p>Salary &#8377; {job.salary}</p>
                    <p>Location {job.location}</p>
                  </div>
                  {appliedJobs.includes(job.id) ? (
                    <p className="mt-2 text-[#01967b] ">Status:Applied</p>
                  ) : (
                    <button
                      className={`
                      bg-[#01967b] mt-2 px-3 py-1 hover:text-slate-900 cursor-pointer ${
                        loadingApplications
                          ? 'cursor-not-allowed'
                          : 'bg-[#01967b]'
                      }`}
                      disabled={loadingApplications ? true : false}
                      onClick={() => {
                        setApplicationId(job.id)
                        applyForJobs(job.id, job.companyId)
                      }}
                    >
                      Apply
                    </button>
                  )}
                  <p className="text-red-700 text-center">
                    {job.id === applicationId && applicationsErrors
                      ? applicationsErrors.message
                      : ''}
                  </p>

                  <p className="text-center">
                    {job.id === applicationId && loadingApplications && (
                      <Loading></Loading>
                    )}
                  </p>
                </a>
              </div>
            )
          })
        ) : (
          <p className="text-center">
            {loading ? <Loading></Loading> : 'No Items to Show'}
          </p>
        )}
      </div>
    </div>
  )
}

export default JobPosted
