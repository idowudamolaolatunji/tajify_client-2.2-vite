import React from 'react'

const DashCard2 = ({color1, color2}) => {
  return (
    <div className="w-full p-2 lg:w-1/3 md:w-1/2">
      <div className={`flex flex-col px-6 py-10 overflow-hidden bg-gradient-to-br from-purple-400  to-purple-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group`}>
        <div className="flex flex-row justify-between items-center">
          <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-50" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
         
        </div>
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold  mt-12 text-gray-50">42.34%</h1>
        <div className="flex flex-row justify-between group-hover:text-gray-200">
          <p className='text-white'>Bounce Rate</p>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-200" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

export default DashCard2