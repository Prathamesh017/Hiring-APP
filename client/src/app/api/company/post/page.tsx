'use client'
import React from 'react'
import { useQuery } from '@apollo/client'
import { Get_Jobs } from '@/app/graphql/queries'
function JobPosted() {
  const companyData = JSON.parse(localStorage.getItem('data') as string)

  const { loading, error, data } = useQuery(Get_Jobs, {
    variables: { companyId: companyData.loginCompany.id },
    // pollInterval: 5000,
  })

  return (
    <div className="job-container w-full p-4 mt-2  md:mt-10">
      <div className="grid  grid-cols-1 gap-4 md:grid-cols-3 mt-10">
        {data ? (
          data.getAllJobs.map((job: any) => {
            return (
              <div key={job.id}>
                <a className="block max-w-sm p-6  border border-gray-200 bg-slate-900 rounded-lg shadow">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {job.title}
                  </h5>
                  <hr></hr>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {job.description}
                  </p>
                  <div className="flex w-full justify-between mt-1">
                    <p>Salary &#8377; {job.salary}</p>
                    <p>Location {job.location}</p>
                  </div>
                </a>
              </div>
            )
          })
        ) : (
          <p>{loading ? 'Loading' : 'No Items to Show'}</p>
        )}
      </div>
    </div>
  )
}

export default JobPosted
