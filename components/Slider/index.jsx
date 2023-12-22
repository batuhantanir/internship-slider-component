import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import HorizontalCard from '../horizontalCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, HashNavigation, Autoplay } from 'swiper/modules';
import Link from 'next/link';

const Slider = ({ data, settings, dataName }) => {
  const { autoplaySettings, customSliderSettings } = settings;
  console.log(autoplaySettings);
  return (
      <Swiper
        modules={[Pagination, Navigation, HashNavigation, Autoplay]}
        className={`shadow-custome ${dataName == "editData" && 'rounded'}}`}
        autoplay={autoplaySettings?.autoPlay ? autoplaySettings : false}
        {...customSliderSettings}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            {dataName == "editData" && <Link href={`/admin/edit-form/${item.id}`} style={{ background: item.bgColor, textShadow: '0px 0px 4px #000' }} className='inline-block w-full text-white  shadow-black'>Edit Item {index + 1}</Link>}
            <HorizontalCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
  );
};

export default Slider;
