import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='tomorrow text-gray-600'>{text1} <span className='tomorrow  text-gray-800 font-medium'>{text2}</span></p>
      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] mt-1.5 bg-gray-700'></p>
    </div>
  )
}

export default Title
