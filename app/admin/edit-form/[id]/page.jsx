"use client"
import React from 'react'
import EditForm from '@/components/editForm';

function EditFormId({ params }) {

  // localData'yı localStorage'den al
  const storedData = localStorage.getItem('localData');
  const localData = storedData ? JSON.parse(storedData) : [];
  return (
    <div className='flex justify-center items-center min-h-screen w-screen bg-primary'>
      <EditForm localData={localData}  id={params.id} />
    </div>
  )
}

export default EditFormId