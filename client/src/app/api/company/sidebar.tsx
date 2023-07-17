'use client'

function Sidebar(props: any) {
  return (
    <>
      <div className="visible md:invisible">
        <div className="top-0 left-0 w-1/3 md:w-[15vw] bg-[#2c496b9c] z-1 text-white fixed h-full ">
          <div className="mt-20 space-y-5">
            <div className="w-full flex">
              <button
                className="ml-4"
                onClick={() => {
                  props.props.setShowSidebar(false)
                }}
              >
                X
              </button>
            </div>
            <li className="list-none mt-10">
              <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ml-1 md:ml-3 text-sm md:text-xl">
                  Job Posted
                </span>
              </div>
            </li>
            <li className="list-none">
              <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ml-1 md:ml-3 text-sm md:text-xl">
                  Job Response
                </span>
              </div>
            </li>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
