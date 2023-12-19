"use client"
import React, { useEffect, useState } from 'react'
import EditForm from '@/components/editForm'
import { useRouter } from 'next/router';

function EditFormId({ params }) {

  // localData'yı localStorage'den al
  const storedData = localStorage.getItem('localData');
  const localData = storedData ? JSON.parse(storedData) : [];
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <EditForm localData={localData} id={params.id} />
    </div>
  )
}

export default EditFormId