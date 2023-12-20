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

  return (
    <Swiper
      modules={[Pagination, Navigation, HashNavigation, Autoplay]}
      className="mySwiper"
      autoplay={autoplaySettings}
      {...customSliderSettings}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          {dataName == "editData" && <Link href={`/admin/edit-form/${item.id}`} style={{ background: item.bgColor, color: item.buttonTextColour }} className='inline-block w-full'>Edit Item {index + 1}</Link>}
          <HorizontalCard data={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
