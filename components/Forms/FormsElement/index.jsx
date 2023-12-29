import React, { useCallback, useState } from 'react'
import { useField } from 'formik';
import ColorPicker from 'react-best-gradient-color-picker'

export function CheckBox({ label, ...props }) {

    const [field] = useField(props);

    return (
        <label className='flex items-center gap-2'>
            <input type='checkbox' {...field} {...props} checked={field.value} />
            <span className=''>{label}</span>
        </label>
    )
}

export function Color({ label, ...props }) {

    const [field, helpers] = useField(props)

    const closeColorPicker = (e) => {
        if (e.target.id != label) {
            props.setOpenColorPicker("")
        }
    }

    return (
        <div className='relative'>
            <span onClick={() => props.setOpenColorPicker(props.openColorPicker != label ? label : "")} className='flex gap-2 items-center cursor-pointer whitespace-nowrap'>
                <div className='w-5 h-5 rounded-full border' style={{ background: `${field?.value != "" ? field?.value : '#000'}` }}></div>
                <span title={label}>{label.slice(0, 14)}{label.length > 14 && '...'}</span>
            </span>
            <div className={`${props.openColorPicker == label ? "opacity-100" : "opacity-0"} absolute z-10  transition-all delay-200 ease-in-out border rounded mt-2`}>
                <div className={`${props.openColorPicker == label ? "block" : "hidden"} bg-white p-2 text-center rounded transition-all delay-500 ease-in-out`}>
                    <div><span className='font-semibold'>{label}</span> <span onClick={closeColorPicker} className='cursor-pointer right-2 absolute top-0 text-xl font-semibold'>x</span></div>
                    <ColorPicker value={field.value} onChange={helpers.setValue} hideColorTypeBtns={props.hideColorTypeBtns} />
                </div>
            </div>
        </div>
    )
}

export function File({ label, ...props }) {
    const [field, helpers] = useField(props);

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

    // Formik formundaki alanın değerini temizle
    const handleDelete = () => {
        helpers.setValue('');
    };

    const fileName = field.value?.name?.slice(0, 15) || "Please Add";

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={field?.name} className='font-semibold'>{label}</label>
            <input type="file" id={field?.name} className="hidden" onChange={handleFileSelect} {...props} />
            <label htmlFor={field?.name} className="inline-block border bg-blue-50 text-blue-500 px-4 py-2 w-fit cursor-pointer active:scale-95 hover:bg-blue-500 hover:text-blue-50">Choose File</label>
            <span className="text-center" >{fileName}{field.value?.name?.length > 15 && <span>...</span>}</span>
            {<button className="disabled:cursor-not-allowed text-red-500 disabled:opacity-0 hover:text-red-600" onClick={handleDelete} disabled={!field?.value} >Delete image</button>}
        </div>
    );
}


export function SubmitButton({ title, adminSettings }) {
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