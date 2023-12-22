"use client"
import React, { useEffect, useState } from 'react'

import AdminForm from '@/components/adminForm'
import EditSlider from '@/components/editSlider'
import AutoPlaySettings from '@/components/autoPlaySettings'
import CustomSliderSettings from '@/components/costumSliderSettings'

function Admin() {
  const [loading, setLoading] = useState(true);
  const [localData, setLocalData] = useState([])
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

  if (loading) return <div className='min-h-screen flex justify-center items-center'>Loading...</div>

  return (
      <div className='flex flex-wrap gap-8 justify-center  w-full h-fit py-5 container mx-auto'>
        <div className='w-11/12 lg:w-[55%] ' >
          <AdminForm localData={localData} setLocalData={setLocalData} />
        </div>
        <div className='flex flex-col justify-between w-11/12 lg:w-[40%] gap-8 col-span-1 order-2 md:order-[0] min-h-fit max-h-full'>
          {localData?.length >= 0 ? <EditSlider localData={localData} /> : <div className='flex justify-center items-center w-full h-full bg-white'>No Slider data please add data</div>}
          <AutoPlaySettings storedSettings={storedAutoPlaySettings}/>
          <CustomSliderSettings storedSettings={storedCustomSliderSettings} />
        </div>
      </div>
  )
}

export default Admin