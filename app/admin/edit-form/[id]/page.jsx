"use client"
import React, { useEffect, useState } from 'react'
import EditForm from '@/components/editForm';
import ToInform from '@/components/toInform';

function EditFormId({ params }) {
  const [adminSettings, setAdminSettings] = useState({})
  const [openPage, setOpenPage] = useState(false)

  useEffect(() => {
    // localStorage'den adminSettings'i al ve set et
    const storedAdminSettings = localStorage.getItem('adminSettings');
    storedAdminSettings && setAdminSettings(JSON.parse(storedAdminSettings));
  }, [])

  // localData'yı localStorage'den al
  const storedData = localStorage.getItem('localData');
  // Eğer localData varsa JSON.parse ile objeye çevir
  const localData = storedData ? JSON.parse(storedData) : [];

  const { adminPageBgColor, adminPageTextColor } = adminSettings;
  return (
    <div className='flex justify-center items-center min-h-screen w-screen' style={{ backgroundColor: adminPageBgColor ? adminPageBgColor : '#fff', color: adminPageTextColor ? adminPageTextColor : "#000" }}>
      <EditForm localData={localData} id={params.id} adminSettings={adminSettings} setOpenPage={setOpenPage} />
      {openPage && <ToInform title={"Slider item'i başarılı bir şekilde kaydedildi."} />}
    </div>
  )
}

export default EditFormId