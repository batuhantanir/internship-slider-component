"use client"
import React, { useEffect, useState } from 'react'

import AdminForm from '@/components/adminForm'
import EditSlider from '@/components/editSlider'
import AutoPlaySettings from '@/components/autoPlaySettings'
import CustomSliderSettings from '@/components/costumSliderSettings'

function Admin() {
  const [loading, setLoading] = useState(true);
  const [localData, setLocalData] = useState([])
  const [submitData, setSubmitData] = useState({})
  const [storedAutoPlaySettings, setStoredAutoPlaySettings] = useState({})
  const [storedCustomSliderSettings, setStoredCustomSliderSettings] = useState({})

  useEffect(() => {
    // localStorage'den localData'yı al ve set et
    const storedData = localStorage.getItem('localData');
    if (storedData) {
      setLocalData(JSON.parse(storedData));
    }
    // localStorage'den autoPlaySettings'i al ve set et
    const storedAutoPlaySettings = localStorage.getItem('autoPlaySettings');
    storedAutoPlaySettings && setStoredAutoPlaySettings(JSON.parse(storedAutoPlaySettings));

    // localStorage'den customSliderSettings'i al ve set et
    const storedCustomSliderSettings = localStorage.getItem('customSliderSettings');
    storedCustomSliderSettings && setStoredCustomSliderSettings(JSON.parse(storedCustomSliderSettings));
    // Sayfa yüklendiğinde loading'i false yap
    setLoading(false);
  }, []);

  // submitData değiştiğinde localData'ya ekle ve localStorage'e kaydet
  useEffect(() => {
    if (Object.keys(submitData).length > 0) {
      setLocalData((prevData) => [...prevData, submitData]);
      localStorage.setItem('localData', JSON.stringify([...localData, submitData]));
    }
  }, [submitData]);

  if (loading) return <div className='min-h-screen flex justify-center items-center'>Loading...</div>

  return (
    <div className='bg-primary h-screen'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center md:min-h- w-full h-fit py-5 container mx-10 md:mx-auto'>
        <div className='col-span-1' >
          <AdminForm setSubmitData={setSubmitData} />
        </div>
        <div className='flex flex-col justify-between gap-8 col-span-1 order-2 md:order-[0] max-h-full'>
          <AutoPlaySettings storedAutoPlaySettings={storedAutoPlaySettings}/>
          <CustomSliderSettings storedCustomSliderSettings={storedCustomSliderSettings} />
          <EditSlider localData={localData} />
        </div>
      </div>
    </div>
  )
}

export default Admin