import { useField } from 'formik'
import React from 'react'

function Input({ label, ...props }) {

    const [field, meta, helpers] = useField(props)

    return (
        <label className='flex flex-col col-span-6 sm:col-span-3'>
            <span className='text-sm font-medium mb-2'>{label}</span>
            <input {...field} {...props} className='border-b-[1.5px] p-2 w-full outline-none rounded-lg  placeholder:text-sm focus:border-black' />
            {props.type === "range" && <div className='flex justify-between'>
                <span>0</span>
                <span>0.5</span>
                <span>1</span>
            </div>}
        </label>
    )
}

export default Input