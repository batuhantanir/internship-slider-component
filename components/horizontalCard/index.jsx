"use client"
import Link from 'next/link';
import React from 'react';

const Card = ({ data, costumeStyle }) => {
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

  const cardStyle = {
    background: bgImageOpen ? `url(${bgImage?.content ? bgImage?.content : bgImage})` : bgColor,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <>
      {!backgroundBlur ?
        <div style={cardStyle} className={`w-full h-full absolute ${costumeStyle} filter blur`}></div>
        :
        <div style={cardStyle} className={`w-full h-full absolute ${costumeStyle} `}></div>}
      {
        bgDarkness && <div className={`w-full h-full absolute ${costumeStyle} bg-black `} style={{ opacity: (bgDarknessValue) }}></div>
      }
      <div
        className={`flex w-full h-full items-center justify-center  bg-no-repeat relative ${costumeStyle}`}
      >
        <div className='grid md:grid-cols-2 items-center justify-center px-10 py-6 gap-8  text-center z-10'>
          {mainImageOpen && (
            <div className='h-5/6 '>
              <img
                src={mainImage?.content ? mainImage?.content : mainImage}
                alt="Main"
                className={`${changePosition && "order-2"} rounded-xl sm:rounded-[40px] w-full h-full md:p-6 transition-all duration-500 ease-in-out hover:scale-105`}
              />
            </div>
          )}
          <div className={`flex flex-col items-center ${changePosition && "order-1"}`}>
            {MainTextOpen && (
              <h1 className={`text-2xl md:text-4xl order-1  font-bold ${mainText ? 'block' : 'hidden'}`} style={{ color: mainTextColour ? mainTextColour : "black" }} >
                {mainText}
              </h1>
            )}
            {subTextOpen && (
              <p className={`text-lg md:text-2xl my-3 order-3 md:order-2 ${subText ? 'block' : 'hidden'}`} style={{ color: subTextColour ? subTextColour : "black" }}>
                {subText}
              </p>
            )}
            {buttonOpen && (
              <Link
                href={buttonLink}
                className={` py-2 px-4 rounded-full order-2 md:order-3 w-fit mt-2 inline-block font-semibold text-sm transition-all duration-500 ease-in-out origin-center hover:rotate-6`}
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
