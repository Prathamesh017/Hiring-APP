export let jobs_category = [
  'Frontend Development',
  'Backend Development',
  'FullStack Development',
  'Devops Engineering',
  'Mobile Development',
  'QA Engineering',
  'Blockchain',
]
import React from 'react'

function Jobs() {
  return (
    <div className="jobs-container w-full mt-20 p-4">
      <h1 className="text-xl md:text-2xl text-[#01967b] mb-8">
        Choose From Many Categories
      </h1>
      <div className="grid  grid-cols-2 md:grid-cols-4 gap-4 p-2">
        {jobs_category.map((category, index) => {
          return (
            <>
              <a
                href="#"
                key={index}
                className="block max-w-sm  p-3 md:p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {category}
                </h5>
              </a>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Jobs
