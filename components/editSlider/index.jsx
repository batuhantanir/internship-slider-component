"use client"
import React, { useState } from 'react'
import Slider from '../Slider'

function EditSlider(props) {
  const [customSliderSettings, setCustomSliderSettings] = useState({
    loop: true,
    navigation: true,
    effect: 'fade',
    speed: 1000,
  });

  const settings = {
    customSliderSettings,
  };
  return (
      <Slider settings={settings} dataName={"editData"} {...props} />
  )
}

export default EditSlider