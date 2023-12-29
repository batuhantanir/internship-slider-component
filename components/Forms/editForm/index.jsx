"use client"
import React, { useState } from 'react'

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Color from '../FormsElement/Color';
import CheckBox from '../FormsElement/CheckBox';
import SubmitButton from '../FormsElement/SubmitButton';
import File from '../FormsElement/File';
import Input from '../FormsElement/Input';

function deleteAndInsert(localData, values, userId, newOrderBy) {
    // Veriyi sileceğimiz index'i buluyoruz
    const deleteIndex = localData.findIndex((element) => element.id === userId);

    // Eğer veri bulunamazsa veya silinecek bir veri yoksa işlem yapmıyoruz
    if (deleteIndex === -1) {
        console.error("Veri bulunamadı veya silinecek bir veri yok");
        return;
    }

    // Veriyi siliyoruz
    localData.splice(deleteIndex, 1);

    // Yeni veriyi oluşturuyoruz
    const newObject = { orderBy: newOrderBy, ...values };

    // Yeni veriyi doğru index'e ekliyoruz
    localData.splice(newOrderBy - 1, 0, newObject);

    // Verileri localStorage'e kaydediyoruz
    localStorage.setItem("localData", JSON.stringify(localData));
}

const validationSchema = Yup.object({
    orderBy: Yup.number().min(1).max(100),
    mainText: Yup.string(),
    subText: Yup.string(),
    buttonLink: Yup.string(),
    buttonText: Yup.string(),
    mainImage: Yup.mixed(),
    subTextColour: Yup.string(),
    mainTextColour: Yup.string(),
    buttonColour: Yup.string(),
    buttonTextColour: Yup.string(),
    bgColor: Yup.string(),
    bgImage: Yup.mixed(),
    mainImageOpen: Yup.boolean(),
    MainTextOpen: Yup.boolean(),
    buttonOpen: Yup.boolean(),
    subTextOpen: Yup.boolean(),
    changePosition: Yup.boolean(),
    backgroundBlur: Yup.boolean(),
    bgImageOpen: Yup.boolean(),
    bgDarkness: Yup.boolean(),
    bgDarknessValue: Yup.number(),
});

function EditForm({ localData, id, adminSettings, setOpenPage }) {
    const editData = localData.find((element) => element.id == id);
    const editDataIndex = localData.indexOf(editData);
    const [openColorPicker, setOpenColorPicker] = useState('');
    const [bgDarknessVisible, setBgDarknessVisible] = useState(editData.bgDarkness);

    return (
        <Formik initialValues={{
            id: editData?.id,
            orderBy: editDataIndex + 1,
            mainText: editData.mainText,
            subText: editData.subText,
            buttonLink: editData.buttonLink,
            buttonText: editData.buttonText,
            mainImage: editData.mainImage,
            subTextColour: editData.subTextColour,
            mainTextColour: editData.mainTextColour,
            buttonColour: editData.buttonColour,
            buttonTextColour: editData.buttonTextColour,
            bgColor: editData.bgColor,
            bgImage: editData.bgImage,
            mainImageOpen: editData.mainImageOpen,
            MainTextOpen: editData.MainTextOpen,
            buttonOpen: editData.buttonOpen,
            subTextOpen: editData.subTextOpen,
            changePosition: editData.changePosition,
            backgroundBlur: editData.backgroundBlur,
            bgImageOpen: editData.bgImageOpen,
            bgDarkness: editData.bgDarkness,
            bgDarknessValue: editData.bgDarknessValue,
        }}
            validationSchema={validationSchema}
            onSubmit={values => {
                deleteAndInsert(localData, values, id, values.orderBy);
                setOpenPage(true);
                setTimeout(() => {
                    window.location.href = "/admin";
                }, 1500);
            }}>
            <Form className='grid border grid-cols-1 md:grid-cols-2 p-5 rounded bg-white gap-y-5 min-h-full shadow-custome mx-5 ' style={{ backgroundColor: adminSettings.adminPageCardColor ? adminSettings.adminPageCardColor : '#fff' }}>
                <div className='flex justify-between col-span-2'>
                    <div className='font-semibold text-xl'>Edit Object Form</div>
                    <div className='font-semibold text-base cursor-pointer hover:scale-105 active:scale-95' onClick={() => window.location.href = '/admin'}>X</div>
                </div>
                <Input type="number" label="OrderBy" name="orderBy" pattern="[0-9]*" min="0" max={localData.length + 1} required />
                <Input type="text" label="Main text" name="mainText" placeholder="" />
                <Input type="text" label="Sub text" name="subText" />
                <Input type="text" label="Button link" name="buttonLink" />
                <Input type="text" label="Button text" name="buttonText" />
                <div className='flex flex-col col-span-2'>
                    <div className='flex justify-center sm:justify-between flex-wrap  gap-5'>
                        <div className='flex flex-col justify-evenly  gap-2'>
                            <File label="Main image" name="mainImage" />
                            <File label="Background image" name="bgImage" />
                        </div>
                        <div className='flex flex-col gap-3 '>
                            <Color label="Sub text color" name="subTextColour" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} hideColorTypeBtns={true} />
                            <Color label="Main text color" name="mainTextColour" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} hideColorTypeBtns={true} />
                            <Color label="Button color" name="buttonColour" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} />
                            <Color label="Button text color" name="buttonTextColour" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} hideColorTypeBtns={true} />
                            <Color label="Background color" name="bgColor" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} />
                        </div>
                        <div className='grid gap-2'>
                            <CheckBox label="Main image open" name="mainImageOpen" />
                            <CheckBox label="Main text open" name="MainTextOpen" />
                            <CheckBox label="Button open" name="buttonOpen" />
                            <CheckBox label="Sub text open" name="subTextOpen" />
                            <CheckBox label="Change position" name="changePosition" />
                            <CheckBox label="Background blur" name="backgroundBlur" />
                            <CheckBox label="Background image open" name="bgImageOpen" />
                            <CheckBox label="Background Darkness open" name="bgDarkness" onClick={() => setBgDarknessVisible(!bgDarknessVisible)} />
                        </div>
                    </div>
                    {bgDarknessVisible && <Input type="range" label="Darkness (0.0-1.0)" max={1} min={0} size={1} step={0.1} maxLength={1} pattern="^0(\.[1-9])?$|^1$" name="bgDarknessValue" />}
                    <SubmitButton title="Save Object" adminSettings={adminSettings} />
                </div>
            </Form>
        </Formik>
    )
}

export default EditForm;