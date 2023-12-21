import { useField } from 'formik';
import React, { useCallback } from 'react';

function File({ label, ...props }) {
  const [field, meta, helpers] = useField(props);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];

    // Dosya bilgilerini ve içeriğini birleştirmek
    const fileData = {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      content: null,  // Dosya içeriği için yer tutucu
    };

    // Dosya içeriğini okuma işlemi
    const reader = new FileReader();
    reader.onload = (e) => {
      fileData.content = e.target.result;

      // Formik formundaki alanın değerini güncelle
      helpers.setValue(fileData);
    };

    reader.readAsDataURL(file);
  }, [helpers]);

  const handleDelete = () => {
    // Formik formundaki alanın değerini temizle
    helpers.setValue(null);
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={field?.name} className='font-semibold'>{label}</label>
      <input type="file" id={field?.name} className="hidden" onChange={handleFileSelect} {...props} />
      <label htmlFor={field?.name} className="inline-block border bg-blue-50 text-blue-500 px-4 py-2 w-fit cursor-pointer active:scale-95 hover:bg-blue-500 hover:text-blue-50">Choose File</label>
      <span className="text-center" >{field.value?.name != undefined ? field?.value?.name?.slice(0, 15) : "Please Add"}{field.value?.name?.length > 15 && <span>...</span>}</span>
      {<button className="disabled:cursor-not-allowed text-red-500 disabled:opacity-0 hover:text-red-600" onClick={handleDelete} disabled={!field?.value} >Delete image</button>}
    </div>
  );
}

export default File;
