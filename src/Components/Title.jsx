import React from 'react'

const Title = ({title1,title2}) => {
  return (
    <div className='w-full pt-3 sm:pt-10 pb-5'>
      <div className='flex items-center justify-center gap-1'>
        <h1 className='text-xl sm:text-3xl  font-medium text-gray-500'>{title1} <span className='text-gray-700'>{title2}</span></h1>
        <p className='w-8 sm:w-14 h-0.5 bg-gray-700'></p>
      </div>
    </div>
  )
}

export default Title
