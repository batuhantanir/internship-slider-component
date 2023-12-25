import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../card';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, HashNavigation, Autoplay } from 'swiper/modules';
import Link from 'next/link';

const Slider = ({ localData, settings, dataName, cardStyleMainText, cardStyleSubText, cardStyleGrid, swiperStyle,cardStyleButton }) => {
  const { autoplaySettings, customSliderSettings } = settings;
  console.log(autoplaySettings);
  return (
      <Swiper
        modules={[Pagination, Navigation, HashNavigation, Autoplay]}
        className={`shadow-custome ${dataName == "editData" && 'rounded'}}  w-full ${swiperStyle}`}
        autoplay={autoplaySettings?.autoPlay ? autoplaySettings : false}
        {...customSliderSettings}
      >
        {localData.map((item, index) => (
          <SwiperSlide key={index}>
            {dataName == "editData" && <Link href={`/admin/edit-form/${item.id}`} style={{ background: item.bgColor ? item.bgColor : '#000', textShadow: '0px 0px 4px #000' }} className='inline-block w-full text-center text-white  shadow-black'>Edit Item {index + 1}</Link>}
            <Card data={item} cardStyleMainText={cardStyleMainText} cardStyleSubText={cardStyleSubText} cardStyleGrid={cardStyleGrid} cardStyleButton={cardStyleButton} />
          </SwiperSlide>
        ))}
      </Swiper>
  );
};

export default Slider;
