import React from 'react'
import Link from 'next/link'
function Header() {
  return (
    <div className="header-component flex flex w-full justify-between p-3">
      <div className="header-heading text-xl md:text-2xl">
        <h1 className="text-[#01967b]">Tech Geeks</h1>
      </div>
      <div className="header-buttons flex space-x-4 ">
        <div>
          <button className="p-1 md:p-2 hover:text-[#01967b]">
            <Link href={'/api/form/candidate'}>Sign In</Link>
          </button>
        </div>
        <div>
          <button className="bg-[#01967b] p-1 md:p-2 rounded hover:text-black">
            <Link href={'/api/form/company'}>Recruiter Login</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
