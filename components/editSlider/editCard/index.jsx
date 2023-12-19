import React from 'react'
import Link from 'next/link';

function EditCard({ data }) {
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
        filter: `${backgroundBlur && "blur(5px)"}`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        filter: `${bgDarkness && `brightness(${bgDarknessValue * 3})`}`,
    };

    return (
        <div>
            <div style={cardStyle} className='w-3/4 h-3/4 absolute'></div>
            <div
                className={`flex w-64 h-64 items-center justify-center  bg-no-repeat relative`}
            >
                <div className='grid md:grid-cols-2 items-center justify-center px-10 py-6 gap-8  text-center '>
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
                                className={`text-[${buttonTextColour}] py-2 px-4 rounded-full mt-2 inline-block font-semibold text-sm transition-all duration-500 ease-in-out origin-center hover:rotate-6`}
                                style={{ background: buttonColour }}
                            >
                                {buttonText}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCard