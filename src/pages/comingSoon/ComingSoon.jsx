import React from 'react'
import { useNavigate } from 'react-router-dom'

const ComingSoon = () => {
    const navigate = useNavigate();
  return (
    <div class="" style={{backgroundColor: '#fff', display: "flex", justifyContent: "center", alignItems: "center", width: '100%', height: '100vh'}}>
      {/* min-h-screen bg-gray-900 flex flex-col items-center justify-center */}
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        <h1 class="text-5xl font-bold mb-8 animate-pulse" style={{color: '#008001'}}>
            Coming Soon
        </h1>
        <p class="text-grey-900 text-center text-xlg mb-8">
            We're working hard to bring you something amazing. Stay tuned!
        </p>

        <div className='flex justify-center'>
            <button className='btn-primary' style={{color: '#444'}} onClick={() => navigate(-1)}>Go back</button>
        </div>
      </span>
  </div>
  )
}

export default ComingSoon