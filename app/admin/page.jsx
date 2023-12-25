"use client"
import React, { useEffect, useState } from 'react'

import AdminForm from '@/components/adminForm'
import EditSlider from '@/components/editSlider'
import AutoPlaySettings from '@/components/autoPlaySettings'
import CustomSliderSettings from '@/components/costumSliderSettings'
import ToInform from '@/components/toInform'
import AdminPageSettings from '@/components/adminPageSettings'

function Admin() {
  const [loading, setLoading] = useState(true);
  const [localData, setLocalData] = useState([])
  const [storedAutoPlaySettings, setStoredAutoPlaySettings] = useState({})
  const [storedCustomSliderSettings, setStoredCustomSliderSettings] = useState({})
  const [adminSettings, setAdminSettings] = useState({})
  const [openPage, setOpenPage] = useState(false)
  const [whichPage, setWhichPage] = useState('');


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
    // localStorage'den adminSettings'i al ve set et
    const adminSettings = localStorage.getItem('adminSettings');
    adminSettings && setAdminSettings(JSON.parse(adminSettings));
    // Sayfa yüklendiğinde loading'i false yap
    setLoading(false);
  }, []);

  if (loading) return <div className='min-h-screen flex justify-center items-center'>Loading...</div>

  const { adminPageBgColor, adminPageTextColor } = adminSettings;

  return (
    <div style={{ backgroundColor: adminPageBgColor ? adminPageBgColor : '#fff', color: adminPageTextColor ? adminPageTextColor : '#000' }} className='min-h-full w-full'>
      <div className={`flex flex-wrap gap-8 justify-center  w-full  py-5 container mx-auto`} >
        <div className='flex gap-8 w-full flex-wrap justify-center'>
          <div className='w-11/12 lg:w-[55%] ' >
            <AdminForm localData={localData} setLocalData={setLocalData} setOpenPage={setOpenPage} adminSettings={adminSettings} />
          </div>
          <div className='flex flex-col justify- w-11/12 lg:w-[40%] gap-8 col-span-1 order-2  min-h-fit max-h-full'>
            <AdminPageSettings adminSettings={adminSettings} setWhichPage={setWhichPage} setOpenPage={setOpenPage} />
            <AutoPlaySettings storedSettings={storedAutoPlaySettings} adminSettings={adminSettings} setWhichPage={setWhichPage} setOpenPage={setOpenPage} />
            <CustomSliderSettings storedSettings={storedCustomSliderSettings} adminSettings={adminSettings} setWhichPage={setWhichPage} setOpenPage={setOpenPage} />
          </div>
        </div>
        <div className='flex w-full gap-8 flex-col lg:flex-row md:flex-nowrap justify-center px-[4%] sm:px-7 lg:px-6'>
          {localData?.length > 0 ? <EditSlider localData={localData} swiperStyle={"h-[200px] sm:h-[350px] lg:h-full"} cardStyle={"cardStyle"} cardStyleGrid={"grid-cols-2"} cardStyleMainText={"text-[12px] md:text-4xl xl:text-5xl"} cardStyleSubText={"text-[10px] sm:text-lg md:text-2xl xl:text-3xl"} cardStyleButton={"text-[7px] px-1 py-1 sm:py-2 sm:px-4 "} /> : <div className='flex justify-center items-center w-full h-full bg-white'>No Slider data please add data</div>}
          {localData?.length > 0 ? <EditSlider localData={localData} cardStyle={"cardStyle"} swiperStyle={"w-full sm:w-[380px] h-[520px]"} cardStyleGrid={"grid-cols-1"} cardStyleMainText={"text-2xl"} cardStyleSubText={"text-lg"} cardStyleButton={"text-sm"} /> : <div className='flex justify-center items-center w-full h-full bg-white'>No Slider data please add data</div>}
        </div>
      </div>
      {openPage && <ToInform title={"Slider item'i başarı ile eklendi"} />}
      {openPage && whichPage && <ToInform title={`"${whichPage} başarılı bir şekilde kaydedildi."`} /> }
    </div>
  )
}

export default Admin