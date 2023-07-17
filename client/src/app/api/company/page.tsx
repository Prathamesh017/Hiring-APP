'use client'
import React, { useRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import Form from './form'
import SideBar from './sidebar'
import { useRouter } from 'next/navigation'

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
      <div className="company-header  grid  grid-flow-col items-center grid-cols-2 md:grid-cols-3 p-2 ">
        <div className="flex flex-row space-x-2 items-center">
          <button
            className="visible md:invisible mt-1"
            onClick={() => {
              setShowSidebar(!showSideBar)
            }}
          >
            <AiOutlineMenu></AiOutlineMenu>
          </button>
          {!showSideBar && (
            <h1 className="text-sm md:text-xl">
              <p>
                Welcome
                <span className="text-[#01967b]">
                  {data ? data.loginCompany.companyName : ''}
                </span>
              </p>
            </h1>
          )}
        </div>
        <div className="headers hidden  md:flex text-sm md:text-base flex flex-row space-x-6 items-center">
          <div>
            <button className="hover:text-slate-700">Jobs Posted</button>
          </div>
          <div>
            <button className="hover:text-slate-700">Job Responses</button>
          </div>
        </div>
        <div className="logout-button  justify-self-end">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 
           "
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="grid grid-rows-1 md:grid-cols-2 p-4 mt-10 ">
        <div className=" description-box p-4 space-y-4">
          <h1 className="text-[#01967b] text-xl">Company Description</h1>
          <p>{data ? data.loginCompany.companyDescription : ''}</p>
        </div>
        <Form></Form>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {showSideBar && (
          <SideBar props={{ setShowSidebar: setShowSidebar }}></SideBar>
        )}
      </div>
    </div>
  )
}

export default Page
