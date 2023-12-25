import React, { useState } from 'react'

function SubmitButton({ title, adminSettings }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const containerStyle = {
    backgroundColor: isHovered ? adminSettings?.adminPageBtnHoverColor : adminSettings?.adminPageBtnColor,
    transition: 'background-color 0.3s ease',
  };
  
  return (
    <button type='submit' className='mt-2 active:scale-95 transition-colors delay-100 ease-in-out rounded py-2 w-32 h-fit'
     style={containerStyle}
     onMouseEnter={handleMouseEnter}
     onMouseLeave={handleMouseLeave} >{title}</button>
  )
}

export default SubmitButton