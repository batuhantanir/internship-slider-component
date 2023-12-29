"use client"
import React, { useEffect, useState } from "react";
import Slider from "@/components/Slider";
import Loading from "@/components/Loading";
import mockData from "@/mocks";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoplaySettings, setAutoplaySettings] = useState({});
  const [customSliderSettings, setCustomSliderSettings] = useState({});

  useEffect(() => {
    !localStorage.getItem("localData") && localStorage.setItem("localData", JSON.stringify(mockData));
    !localStorage.getItem("autoPlaySettings") && localStorage.setItem("autoPlaySettings", JSON.stringify({ "autoPlay": false, "delay": 2000, "disableOnInteraction": false, "waitForTransition": true, "pauseOnMouseEnter": true }));
    !localStorage.getItem("customSliderSettings") && localStorage.setItem("customSliderSettings", JSON.stringify({ "loop": false, "navigation": true, "effect": "fade", "speed": 1000, "pagination": true }));
    !localStorage.getItem("adminSettings") && localStorage.setItem("adminSettings", JSON.stringify({ "adminPageBgColor": "rgba(215.98499999999999, 255, 255, 1)", "adminPageTextColor": "rgba(0,0,0,1)", "adminPageCardColor": "rgba(255,255,255, 1)", "adminPageBtnColor": "rgba(0,255,255, 1)", "adminPageBtnHoverColor": "rgba(0, 255, 255, 0.57)" }));

    localStorage.getItem("localData") && setData(JSON.parse(localStorage.getItem("localData")));
    localStorage.getItem("autoPlaySettings") && setAutoplaySettings(JSON.parse(localStorage.getItem("autoPlaySettings")));
    localStorage.getItem("customSliderSettings") && setCustomSliderSettings(JSON.parse(localStorage.getItem("customSliderSettings")));

    setLoading(false);
  }, [])

  // Diğer ayarları güncelleme fonksiyonları buraya eklenir
  const settings = {
    autoplaySettings,
    customSliderSettings,
  };

  if (loading) return <Loading />;

  return (
    <Slider localData={data} settings={settings} swiperStyle={"h-[420px]"} />
  );
}
