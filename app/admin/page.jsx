"use client"
import React, { useEffect, useState } from 'react'

import AdminForm from '@/components/adminForm'
import EditSlider from '@/components/editSlider'

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
        <div className='grid md:grid-cols-2 gap-8  bg-[#f4f4f4] min-h-screen w-full h-fit py-5 px-10'>
            <AdminForm setSubmitData={setSubmitData} />
            <EditSlider localData={localData}/>
        </div>
    )
}

export default Admin