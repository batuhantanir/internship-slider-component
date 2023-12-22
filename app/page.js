"use client"
import React, { useEffect, useState } from "react";

import Slider from "@/components/Slider";
import Loading from "@/components/Loading";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [autoplaySettings, setAutoplaySettings] = useState({});
  const [customSliderSettings, setCustomSliderSettings] = useState({});
  const mockData = [
    { "id": "c643db1f-ab15-4f8f-89b7-852fdfd0443c", "mainText": "ÇALIŞKAN ARI İLE DEV KAMPANYA", "subText": "Alacağınız tüm kitaplarda Aralık ayına özel %50 indirim.", "buttonLink": "/", "buttonText": "Kampanyaya Git 1", "mainImage": "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", "subTextColour": "#ff0000", "mainTextColour": "#00ff7b", "buttonColour": "#c8ff00", "buttonTextColour": "#002aff", "bgColor": "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)", "mainImageOpen": true, "MainTextOpen": true, "buttonOpen": true, "subTextOpen": true, "changePosition": true, "backgrounBlur": true, "bgImageOpen": true, "bgDarkness": true, "bgDarknessValue": 0 },
    { "id": "b993a8e9-5338-452c-8b22-bf73179273e2", "mainText": "ÇALIŞKAN ARI İLE GARİP KAMPANYA!", "subText": "Alacağınız tüm kitaplarda Aralık ayına özel %1000 indirim.", "buttonLink": "/", "buttonText": "Kampanyaya gidemezsin", "mainImage": "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", "subTextColour": "#0011ff", "mainTextColour": "#fcff57", "buttonColour": "#ff0000", "buttonTextColour": "#00d5ff", "bgColor": "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)", "mainImageOpen": true, "MainTextOpen": true, "buttonOpen": true, "subTextOpen": true, "changePosition": true, "backgrounBlur": false, "bgImageOpen": false, "bgDarkness": true, "bgDarknessValue": 0.5 },
    { "id": "1223cefc-099f-4a99-a55b-d7d6e6ec5770", "mainText": "deneme", "subText": "deneme", "buttonLink": "/", "buttonText": "button", "mainImage": "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", "subTextColour": "#ff0000", "mainTextColour": "#ff0000", "buttonColour": "#ff0000", "buttonTextColour": "#ff0000", "bgColor": "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)", "mainImageOpen": true, "MainTextOpen": true, "buttonOpen": true, "subTextOpen": true, "changePosition": false, "backgrounBlur": false, "bgImageOpen": false, "bgDarkness": true, "bgDarknessValue": 0.8 },
    { "id": "8b4ef4e6-89fe-40f7-b788-cc43e717b0c7", "mainText": "lorem picsun", "subText": "kaliteli fotoğraflar", "buttonLink": "https://picsum.photos", "buttonText": "siteye git", "mainImage": "https://picsum.photos/id/19/1920/1080", "subTextColour": "#4dff70", "mainTextColour": "#ff2e2e", "buttonColour": "#ff9999", "buttonTextColour": "#000000", "bgColor": "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)", "mainImageOpen": true, "MainTextOpen": true, "buttonOpen": true, "subTextOpen": true, "changePosition": false, "backgrounBlur": true, "bgImageOpen": true, "bgDarkness": true, "bgDarknessValue": 0.5 },
    { "id": "df91ac3a-5897-45c3-8509-6039b6eff853", "mainText": "batuhan", "subText": "kaliteli fotoğraflar", "buttonLink": "/", "buttonText": "button", "mainImage": "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", "subTextColour": "#ff0000", "mainTextColour": "#1aa871", "buttonColour": "#270aff", "buttonTextColour": "#b2c71a", "bgColor": "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)", "mainImageOpen": true, "MainTextOpen": true, "buttonOpen": true, "subTextOpen": true, "changePosition": false, "backgrounBlur": false, "bgImageOpen": true, "bgDarkness": false, "bgDarknessValue": "" }];
    
    useEffect(() => {
      !localStorage.getItem("localData") && localStorage.setItem("localData", JSON.stringify(mockData));
      !localStorage.getItem("autoPlaySettings") && localStorage.setItem("autoPlaySettings", JSON.stringify({ "autoPlay": false, "delay": 2000, "disableOnInteraction": false, "waitForTransition": true, "pauseOnMouseEnter": true }));
      !localStorage.getItem("customSliderSettings") && localStorage.setItem("customSliderSettings", JSON.stringify({ "loop": false, "navigation": true, "effect": "fade", "speed": 1000, "pagination": true }));
      
      
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
    <div className="w-screen h-[50vh] flex justify-center">
      <Slider data={data} settings={settings} />
    </div>
  );
}
