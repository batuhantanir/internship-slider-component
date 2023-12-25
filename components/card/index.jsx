"use client"
import Link from 'next/link';
import React from 'react';

const Card = ({ data, cardStyleMainText, cardStyleSubText, cardStyleGrid, cardStyleButton }) => {
  const {
    mainText,
    subText,
    buttonLink,
    buttonText,
    mainImage,
    subTextColour,
    mainTextColour,
    buttonColour,
    buttonTextColour,
    bgColor,
    bgImage,
    mainImageOpen,
    MainTextOpen,
    buttonOpen,
    subTextOpen,
    changePosition,
    backgroundBlur,
    bgImageOpen,
    bgDarkness,
    bgDarknessValue,
  } = data;

  const backgroundStyle = {
    background: bgImageOpen ? `url(${bgImage?.content ? bgImage?.content : bgImage})` : bgColor,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <>
      {backgroundBlur ?
        <div style={backgroundStyle} className={`w-full h-full absolute filter blur`}></div>
        :
        <div style={backgroundStyle} className={`w-full h-full absolute `}></div>}
      {
        bgDarkness && <div className={`w-full h-full absolute bg-black `} style={{ opacity: (bgDarknessValue) }}></div>
      }
      <div
        className={`flex w-full h-full items-center justify-center  bg-no-repeat relative `}
      >
        <div className={`grid  ${cardStyleGrid ? cardStyleGrid : "md:grid-cols-2"} items-center justify-center px-10 py-6 sm:gap-8   text-center z-10 mx-2`}>
          {mainImage && mainImageOpen && (
            <div className={`${changePosition && "order-2"} flex justify-center`}>
              <img
                src={mainImage?.content ? mainImage?.content : mainImage}
                alt="Main"
                className={` rounded-xl sm:rounded-[40px] w-full max-w-2xl h-full max-h-[25rem] md:p-6 transition-all duration-500 ease-in-out hover:scale-105`}
              />
            </div>
          )}
          <div className={`flex flex-col items-center sm:py-0 ${changePosition && "order-1"}`}>
            {MainTextOpen && (
              <h1 className={`${cardStyleMainText ? cardStyleMainText : "text-xl md:text-4xl xl:text-5xl"} order-1  font-bold ${mainText ? 'block' : 'hidden'}`} style={{ color: mainTextColour ? mainTextColour : "black" }} >
                {mainText}
              </h1>
            )}
            {subTextOpen && (
              <p className={`${cardStyleSubText ? cardStyleSubText : "text-medium md:text-2xl xl:text-3xl"} my-3 order-3 md:order-2 ${subText ? 'block' : 'hidden'}`} style={{ color: subTextColour ? subTextColour : "black" }}>
                {subText}
              </p>
            )}
            {buttonOpen && (
              <Link
                href={buttonLink}
                className={`${cardStyleButton ? cardStyleButton :"text-sm  xl:text-xl"} py-1 px-2 sm:py-2 sm:px-4 rounded-full order-2 md:order-3 w-fit mt-2 inline-block font-semibold  transition-all duration-500 ease-in-out origin-center hover:rotate-6`}
                style={{ background: buttonColour, color: buttonTextColour }}
              >
                {buttonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
