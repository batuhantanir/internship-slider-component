import React, { useState, useEffect } from 'react';
import SliderCard from './sliderCard';
import Link from 'next/link';

const Slider = ({ localData, settings, dataName, cardStyleMainText, cardStyleSubText, cardStyleGrid, swiperStyle, swiperContainerStyle, cardStyleButton }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const { customSliderSettings, autoplaySettings } = settings;

  // Bir sonraki slayta geçme fonksiyonu
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % localData.length);
  };

  // Bir önceki slayta geçme fonksiyonu
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + localData.length) % localData.length);
  };

  // Belirli bir slayta gitme fonksiyonu
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Fare üzerine gelindiğinde otomatik oynatmayı durdurma
  const handleMouseEnter = () => {
    autoplaySettings?.pauseOnMouseEnter && setIsMouseOver(true);
  };

  // Fare üzerinden çıkıldığında otomatik oynatmayı başlatma
  const handleMouseLeave = () => {
    autoplaySettings?.pauseOnMouseEnter && setIsMouseOver(false);
  };

  {/* mouse ile yapılacak sürüklemeler için tanımlamalar */ }
  // drag tıklamanın başlangıcı
  const handleStart = (e) => {
    setStartX((e.type == "touchstart" ? e.touches[0].pageX : e.pageX));
    setIsDragging(true);
  };

  // drag işlemi
  const handleMove = (e) => {
    if (!isDragging) return;

    const deltaX = startX - (e.type == "touchmove" ? e.touches[0].pageX : e.pageX);

    if (deltaX > 50 && (customSliderSettings.loop ? true : currentIndex !== localData.length - 1)) {
      setIsDragging(false);
      nextSlide();
    } else if (deltaX < -50 && (customSliderSettings.loop ? true : currentIndex !== 0)) {
      setIsDragging(false);
      prevSlide();
    }
  };

  // dragın sonlanması
  const handleEnd = () => {
    setIsDragging(false);
  };

  // autoplay true olduğunda ve üzerine mouse gelmediğinde bir interval tanımlama ve silme
  useEffect(() => {
    let interval;

    if (autoplaySettings?.autoPlay && !isMouseOver) {
      interval = setInterval(() => {
        if (customSliderSettings.loop || currentIndex < localData.length - 1) {
          nextSlide();
        } else {
          clearInterval(interval); // Döngü yapılmıyorsa ve sona ulaşıldıysa durma aralığı
        }
      }, autoplaySettings.delay);
    }

    return () => clearInterval(interval);
  }, [currentIndex, customSliderSettings?.loop, localData.length, autoplaySettings?.delay, isMouseOver]);

  return (
    <div className={`relative overflow-hidden w-full ${swiperContainerStyle} `}>
      {/* Slayt içeriği */}
      <div
        className={`flex h-full ${swiperStyle} transition-transform duration-500 ease-linear`}
        style={{ transform: `translateX(-${currentIndex * 100}%)`, cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {localData.map((item, index) => (
          <div key={index} className={`flex-1 min-w-full`}>
            {/* Veri adı "editData" ise düzenleme bağlantısı ekleme */}
            {dataName === "editData" && (
              <Link
                href={`/admin/edit-form/${item.id}`}
                style={{ background: item.bgColor ? item.bgColor : '#000', textShadow: '0px 0px 4px #000' }}
                className='inline-block w-full text-center text-white shadow-black'
              >
                Düzenle {index + 1}
              </Link>
            )}
            {/* Card bileşeni */}
            <SliderCard data={item} cardStyleMainText={cardStyleMainText} cardStyleSubText={cardStyleSubText} cardStyleGrid={cardStyleGrid} cardStyleButton={cardStyleButton} />
          </div>
        ))}
      </div>
      {/* Önceki ve sonraki düğmeler */}
      {customSliderSettings?.navigation && (
        <>
          <button
            onClick={prevSlide}
            className={`absolute top-1/2 left-3 cursor-pointer transform -translate-y-1/2 transition-colors ease-in-out
            md:scale-110 lg:scale-125 xl:scale-150 bg-white/50 rounded-full w-8 h-8 disabled:cursor-not-allowed 
            disabled:opacity-20`}
            style={{ transitionDelay: `${customSliderSettings.speed}ms` }}
            disabled={!customSliderSettings.loop && currentIndex === 0}
          >
            {'<'}
          </button>
          <button
            onClick={nextSlide}
            className={`absolute top-1/2 right-3 z-10 cursor-pointer transform -translate-y-1/2 transition-colors delay-300 ease-in-out
            md:scale-110 lg:scale-125 xl:scale-150 bg-white/50 rounded-full w-8 h-8 disabled:cursor-not-allowed 
            disabled:opacity-20`}
            disabled={!customSliderSettings.loop && currentIndex === localData.length - 1}
          >
            {'>'}
          </button>
        </>
      )}
      {/* Sayfalama düğmeleri */}
      {customSliderSettings?.pagination && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {localData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full focus:outline-none ${autoplaySettings} ${index === currentIndex ? 'bg-white' : 'bg-gray-500'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
