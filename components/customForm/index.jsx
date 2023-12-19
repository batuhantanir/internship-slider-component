import React from 'react'


import FormInput from './formInput';


function CostumeForm({ headerName, formData, handleSubmit, btnName }) {
    return (
        <div className=" bg-white  w-full max-w-2xl px-4 h-fit rounded-lg border mx-auto">
            <div className="flex justify-between border-b px-3 py-4">
                <h2 className="font-semibold text-xl">{headerName}</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-6  gap-5 px-3 py-4">
                    {formData.map((data, idx) => (
                        data != null && <FormInput key={idx} data={data} />
                    ))}
                </div>
                <div className="border-t w-full p-5">
                    <button className="bg-black text-white text-sm w-fit text-center gap-2 font-medium px-5 py-3 rounded-lg whitespace-nowrap "  type="submit">{btnName}</button>
                </div>
            </form>
        </div>
    )
}

export default CostumeForm