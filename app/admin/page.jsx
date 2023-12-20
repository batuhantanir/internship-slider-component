"use client"
import React, { useEffect, useState } from 'react'

import AdminForm from '@/components/adminForm'
import EditSlider from '@/components/editSlider'
import Settings from '@/components/settings'

function Admin() {
  const [localData, setLocalData] = useState([])
  const [submitData, setSubmitData] = useState({})


  // Sayfa yüklendiğinde localStorage'den verileri al
  useEffect(() => {
    const storedData = localStorage.getItem('localData');
    if (storedData) {
      setLocalData(JSON.parse(storedData));
    }
  }, []);

  // submitData değiştiğinde localData'ya ekle ve localStorage'e kaydet
  useEffect(() => {
    if (Object.keys(submitData).length > 0) {
      setLocalData((prevData) => [...prevData, submitData]);
      localStorage.setItem('localData', JSON.stringify([...localData, submitData]));
    }
  }, [submitData]);

  return (
    <div className='bg-[#f4f4f4]'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 justify-center md:min-h-screen w-full h-fit py-5 container mx-10 md:mx-auto'>
        <div className='col-span-1' >
        <AdminForm setSubmitData={setSubmitData} />
        </div>
        <div className='col-span-1 order-2 md:order-[0]'>
        <Settings />
        </div>
        <div className='col-span-2'>
          <EditSlider localData={localData} />
        </div>
      </div>
    </div>
  )
}

export default Admin