import React from 'react'
import { Spinner } from 'flowbite-react'

const LoadingScreen = () => {
  return (
    <div>
        <main className='h-[800px] bg-black relative'>
            <p className='absolute text-white text-center top-1/3 left-[650px] text-4xl'>Đang tải.... <Spinner/></p>
        </main>
    </div>
  )
}

export default LoadingScreen