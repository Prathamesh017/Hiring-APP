'use client'
import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_APPLICATIONS_BY_COMPANY_ID } from '@/app/graphql/queries'
import Loading from '../../form/loadingSpinner'
function JobPosted() {
  let companyData
  if (typeof window !== 'undefined') {
    companyData = JSON.parse(localStorage.getItem('data') as string)
  }

  const { loading, error, data } = useQuery(GET_APPLICATIONS_BY_COMPANY_ID, {
    variables: { companyId: companyData?.loginCompany?.id },
  })
  const redirectToGmail = (email: string) => {
    const encodedEmail = encodeURIComponent(email)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}`
    window.open(gmailUrl, '_blank')
  }

  return (
    <div className="job-container w-full p-4 mt-2  md:mt-10">
      <div className="grid  grid-cols-1 gap-4 md:grid-cols-3 mt-10">
        {data && data.getApplicationsByCompanyId.length > 0 ? (
          data.getApplicationsByCompanyId.map((application: any) => {
            return (
              <div
                key={application.id}
                className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div
                  className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
                  id="defaultTab"
                  data-tabs-toggle="#defaultTabContent"
                  role="tablist"
                >
                  <h1 className="text-2xl p-4">Candidate Profile</h1>
                </div>

                <div id="defaultTabContent">
                  <div className="bg-white rounded-lg p-4 dark:bg-gray-800 space-y-4">
                    <h1 className="text-xl  text-[#01967b]  capitalize">
                      Name: {application.candidate.name}
                    </h1>
                    <h2>Position: {application.job.title}</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Description: {application.candidate.description}
                    </p>
                    <a
                      href={application.candidate.link}
                      target="_blank"
                      className="text-blue-400 hover:cursor-pointer"
                    >
                      {application.candidate.link}{' '}
                    </a>
                    <div className="w-full flex justify-between">
                      <p>Expected Salary :{application.candidate.salary}</p>
                      <p>Current Location :{application.candidate.location}</p>
                    </div>
                    <button
                      className="p-2 bg-sky-700 rounded text-center"
                      onClick={() => {
                        redirectToGmail(application.candidate.email)
                      }}
                    >
                      Contact Now
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <p>{loading ? <Loading></Loading> : 'No Responses Yet'}</p>
        )}
      </div>
    </div>
  )
}

export default JobPosted
