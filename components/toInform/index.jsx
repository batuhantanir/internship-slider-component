import React from "react"

function ToInform({ title }) {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='flex flex-col justify-center gap-2 items-center px-10 py-10 bg-white bg-opacity-90 rounded-lg h-[250px] w-[550px] text-center mx-5'>
                <div className="text-green-300 text-6xl font-bold">✓</div>
                <div className='text-green-300 text-2xl font-bold'>{title}</div>
            </div>
        </div>
    )
}

export default ToInform