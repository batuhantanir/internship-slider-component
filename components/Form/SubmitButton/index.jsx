import React from 'react'

function SubmitButton({title}) {
  return (
    <button type='submit' className='mt-2 bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-blue-50 active:scale-95 transition-colors delay-100 ease-in-out rounded py-2 w-32 h-fit' >{title}</button>
  )
}

export default SubmitButton