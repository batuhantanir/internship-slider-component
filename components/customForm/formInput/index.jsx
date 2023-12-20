import React from 'react'

function FormInput({ data }) {
    //datada ki değişkenler tektek tanımlandı
    const { labelName, forHtml, typeName, name, id, placeholderName, handleChange, values, error, checked } = data;
    return (
        //verilere göre bir input yapısı oluşturuldu
        <label className={` flex flex-col col-span-6 sm:col-span-3`} htmlFor={forHtml}>
            <span className='text-sm font-medium mb-2'>{labelName} {typeName != 'checkbox' && <span className='text-red'>*</span>} </span>
            <input
                className={`bg-svgColorLight border-[1.5px] border-svgColor p-2 w-full  rounded-lg  placeholder:text-sm focus:outline-primary ${typeName != 'checkbox' && "h-10"}`}
                type={typeName}
                name={name}
                id={id}
                placeholder={placeholderName}
                onChange={handleChange}
                values={values}
                value={values}
                required={typeName == 'checkbox' || id == "bgDarknessValue" ? false : true}
                checked={checked}
                max={typeName == 'number' && id == "bgDarknessValue" ? 1 : null}
                min={typeName == 'number' && id == "bgDarknessValue" ? 0 : null}
                step={typeName == 'number' && id == "bgDarknessValue" ? 0.01 : null}
            />
            {error && <span className="flex items-center gap-2 text-red-500 text-sm mt-2 bg-red-200 border rounded px-4 py-2">{error}</span>}
        </label>
    )
}

export default FormInput;