import React, { useState, useEffect } from 'react';
import Card from '../card';
import Link from 'next/link';

// Slider bileşeni
const Slider = ({ localData, settings, dataName, cardStyleMainText, cardStyleSubText, cardStyleGrid, swiperStyle, cardStyleButton }) => {
  // State kullanımı
  const [currentIndex, setCurrentIndex] = useState(0);
  const { customSliderSettings, autoplaySettings } = settings;
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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
    autoplaySettings.pauseOnMouseEnter && setIsMouseOver(true);
  };

  // Fare üzerinden çıkıldığında otomatik oynatmayı başlatma
  const handleMouseLeave = () => {
    autoplaySettings.pauseOnMouseEnter && setIsMouseOver(false);
  };

  // Fare tıklamasının başlangıcı
  const handleMouseDown = (e) => {
    setStartX(e.pageX);
    setIsDragging(true);
  };

  // Fare sürükleme işlemi
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = startX - e.pageX;

    if (deltaX > 50 && (customSliderSettings.loop ? true : currentIndex !== localData.length - 1)) {
      setIsDragging(false);
      nextSlide();
    } else if (deltaX < -50 && (customSliderSettings.loop ? true : currentIndex !== 0)) {
      setIsDragging(false);
      prevSlide();
    }
  };

  // Fare tıklamasının sonlanması
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mouse tıklaması ve sürükleme olaylarına dinleme ekleme ve temizleme
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // autoplay true olduğunda ve üzerine mouse gelmediğinde bir interval tanımlama ve silme
  useEffect(() => {
    let interval;

    if (autoplaySettings?.autoPlay && !isMouseOver) {
      interval = setInterval(() => {
        if (customSliderSettings.loop || currentIndex < localData.length - 1) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % localData.length);
        } else {
          clearInterval(interval); // Döngü yapılmıyorsa ve sona ulaşıldıysa durma aralığı
        }
      }, autoplaySettings?.autoplayInterval || autoplaySettings.delay);
    }

    return () => clearInterval(interval);
  }, [currentIndex, customSliderSettings?.loop, localData.length, autoplaySettings?.autoplayInterval, autoplaySettings?.delay, isMouseOver]);


  // slide da current index e göre gösterilecek cardın gösterimi
  const transformValue = `translateX(-${currentIndex * 100}%)`;

  return (
    <div className='relative overflow-hidden w-full'>
      {/* Slayt içeriği */}
      <div
        className={`flex ${swiperStyle} h-fit transition-transform duration-500 ease-linear`}
        style={{ transform: transformValue }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
            <Card data={item} cardStyleMainText={cardStyleMainText} cardStyleSubText={cardStyleSubText} cardStyleGrid={cardStyleGrid} cardStyleButton={cardStyleButton} />
          </div>
        ))}
      </div>
      {/* Sürükleme alanı */}
      <div
        className='absolute top-0 left-0 w-full h-full'
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      />
      {/* Önceki ve sonraki düğmeler */}
      {customSliderSettings?.navigation && (
        <>
          <button
            onClick={prevSlide}
            className={`absolute top-1/2 left-3 z-10 cursor-pointer transform -translate-y-1/2 transition-colors ease-in-out
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
