import React from 'react'
import { useField } from 'formik';

function CheckBox({ label, ...props}) {

    const [field, meta, helpers] = useField(props);

  return (
    <label className='flex items-center gap-2'>
        <input type='checkbox' {...field} {...props} checked={field.value}/>
        <span className=''>{label}</span>
    </label>
  )
}

export default CheckBox