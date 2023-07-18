'use client'
import React from 'react'
import { useState } from 'react'
import Form from './form'
import { useRouter } from 'next/navigation'
import JobPosted from './post/page'

function Page() {
  const [showSideBar, setShowSidebar] = useState(false)

  const data = JSON.parse(localStorage.getItem('data') as string)

  const router = useRouter()
  const logout = () => {
    localStorage.removeItem('data')
    router.push('/')
  }

  return (
    <div className="w-full  company-container p-2">
      <div className="grid grid-rows-1 md:grid-cols-2  mt-10 ">
        <div className=" description-box p-4 space-y-4">
          <h1 className="text-[#01967b] text-xl ">Company Description</h1>
          <p>{data ? data.loginCompany.companyDescription : ''}</p>
        </div>
        <Form></Form>
        <div className="md:hidden">
          <h1 className="text-xl p-2 text-center mt-2 ">Job Posted</h1>
          <JobPosted></JobPosted>
        </div>
      </div>
    </div>
  )
}

export default Page
