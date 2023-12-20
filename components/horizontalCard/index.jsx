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
    background: bgImageOpen ? `url(${mainImage})` : bgColor,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <>
      {!backgroundBlur ?
       <div style={cardStyle} className={`w-full h-full absolute ${costumeStyle} filter blur-sm`}></div>
       :
        <div style={cardStyle} className={`w-full h-full absolute ${costumeStyle} `}></div>}
      {
        bgDarkness && <div className={`w-full h-full absolute ${costumeStyle} bg-black `} style={{opacity: (bgDarknessValue)}}></div>
      }
      <div
        className={`flex w-full h-full items-center justify-center  bg-no-repeat relative ${costumeStyle}`}
      >
        <div className='grid md:grid-cols-2 items-center justify-center px-10 py-6 gap-8  text-center z-10'>
          {mainImageOpen && (
            <img
              src={mainImage}
              alt="Main"
              className={`${changePosition && "order-2"} rounded-[40px] h-full max-w-full max-h-[380px] md:p-6 transition-all duration-500 ease-in-out hover:scale-105`}
            />
          )}
          <div className={` ${changePosition && "order-1"}`}>
            {MainTextOpen && (
              <h1 className={`text-4xl font-bold ${mainText ? 'block' : 'hidden'}`} style={{ color: mainTextColour ? mainTextColour : "black" }} >
                {mainText}
              </h1>
            )}
            {subTextOpen && (
              <p className={`text-2xl my-3 ${subText ? 'block' : 'hidden'}`} style={{ color: subTextColour ? subTextColour : "black" }}>
                {subText}
              </p>
            )}
            {buttonOpen && (
              <Link
                href={buttonLink}
                className={` py-2 px-4 rounded-full mt-2 inline-block font-semibold text-sm transition-all duration-500 ease-in-out origin-center hover:rotate-6`}
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
