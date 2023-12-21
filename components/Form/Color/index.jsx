"use client"
import React, { useEffect, useRef } from 'react'
import { useField } from 'formik'
import ColorPicker from 'react-best-gradient-color-picker'

function Color({ label, ...props }) {

  const [field, meta, helpers] = useField(props)

  const closeColorPicker = (e) => {
    if (e.target.id != label) {
      props.setOpenColorPicker("")
    }
  }
  
  return (
    <div  className='relative'>
      <span onClick={() => props.setOpenColorPicker(props.openColorPicker != label ? label : "")} className='cursor-pointer whitespace-nowrap'>{label} <div className='w-5 h-5 rounded-full' style={{background:`${field?.value != "" ? field?.value : '#000'}`}}></div></span>
      <div  className={`${props.openColorPicker == label ? "opacity-100" : "opacity-0"} absolute z-10  transition-all delay-200 ease-in-out border rounded mt-2`}>
        <div  className={`${props.openColorPicker == label ? "block" : "hidden"} bg-white p-2 text-center rounded transition-all delay-500 ease-in-out`}>
          <div><span className='font-semibold'>{label}</span> <span onClick={closeColorPicker} className='cursor-pointer right-2 absolute top-0 text-xl font-semibold'>x</span></div>
          <ColorPicker  value={field.value} onChange={helpers.setValue} />
        </div>
      </div>
    </div>
  )
}

export default Color