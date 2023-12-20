"use client"
import React, { useEffect, useState } from "react";

import Slider from "@/components/Slider";
import Loading from "@/components/Loading";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [arrowStyles, setArrowStyles] = useState({
    //   background: 'blue',
    //   color: 'white',
    //   padding: '8px',
    //   margin: '4px',
    //   cursor: 'pointer',
    // });
    const [autoplaySettings, setAutoplaySettings] = useState({});
    const [customSliderSettings, setCustomSliderSettings] = useState({});

    useEffect(() => {
      localStorage.getItem("localData") && setData(JSON.parse(localStorage.getItem("localData")));
      localStorage.getItem("autoPlaySettings") && setAutoplaySettings(JSON.parse(localStorage.getItem("autoPlaySettings")));
      localStorage.getItem("customSliderSettings") && setCustomSliderSettings(JSON.parse(localStorage.getItem("customSliderSettings")));

      setLoading(false);
    }, [])

  // Diğer ayarları güncelleme fonksiyonları buraya eklenir

  const settings = {
    // arrowStyles,
    autoplaySettings,
    customSliderSettings,
  };


  if (loading) return <Loading />;

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Slider data={data} settings={settings} />
    </div>
  );
}
