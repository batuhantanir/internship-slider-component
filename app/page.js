"use client"
import React, { useEffect, useState } from "react";

import Slider from "@/components/Slider";

export default function Home() {
  const [data, setData] = useState([]);

  const [arrowStyles, setArrowStyles] = useState({
    background: 'blue',
    color: 'white',
    padding: '8px',
    margin: '4px',
    cursor: 'pointer',
  });
  const [autoplaySettings, setAutoplaySettings] = useState({
    delay: 2000,
    disableOnInteraction: false,
    waitForTransition: true,
    pauseOnMouseEnter: true,
  });
  const [customSliderSettings, setCustomSliderSettings] = useState({
    loop: true,
    navigation: true,
    effect: 'fade',
    speed: 1000,
  });

  // Diğer ayarları güncelleme fonksiyonları buraya eklenir

  const settings = {
    arrowStyles,
    autoplaySettings,
    customSliderSettings,
  };

  useEffect(() => {
    localStorage.getItem("localData") && setData(JSON.parse(localStorage.getItem("localData")));
  },[])

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Slider data={data} settings={settings} />
    </div>
  );
}
