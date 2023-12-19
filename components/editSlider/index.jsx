"use client"
import React, { useState } from 'react'
import Slider from '../Slider'

function EditSlider({localData}) {
  const [customSliderSettings, setCustomSliderSettings] = useState({
    loop: true,
    navigation: true,
    effect: 'fade',
    speed: 1000,
  });

  // Diğer ayarları güncelleme fonksiyonları buraya eklenir

  const settings = {
    customSliderSettings,
  };
  return (
    <div className='overflow-x-hidden overflow-y-scroll'>
      <Slider data={localData} settings={settings} dataName={"editData"}/>
    </div>
  )
}

export default EditSlider