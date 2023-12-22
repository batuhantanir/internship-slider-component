"use client"
import React, { useState } from 'react'

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Color from '../Form/Color';
import CheckBox from '../Form/CheckBox';
import SubmitButton from '../Form/SubmitButton';
import File from '../Form/File';
import Input from '../Form/Input';

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
    const newObject = {
        id: values.id,
        orderBy: newOrderBy,
        mainText: values.mainText,
        subText: values.subText,
        buttonLink: values.buttonLink,
        buttonText: values.buttonText,
        mainImage: values.mainImage,
        subTextColour: values.subTextColour,
        mainTextColour: values.mainTextColour,
        buttonColour: values.buttonColour,
        buttonTextColour: values.buttonTextColour,
        bgColor: values.bgColor,
        bgImage: values.bgImage,
        mainImageOpen: values.mainImageOpen,
        MainTextOpen: values.MainTextOpen,
        buttonOpen: values.buttonOpen,
        subTextOpen: values.subTextOpen,
        changePosition: values.changePosition,
        backgrounBlur: values.backgrounBlur,
        bgImageOpen: values.bgImageOpen,
        bgDarkness: values.bgDarkness,
        bgDarknessValue: values.bgDarknessValue,
    };

    // Yeni veriyi doğru index'e ekliyoruz
    localData.splice(newOrderBy - 1, 0, newObject);

    // Yeniden sıralama işlemi yapabilirsiniz
    // localData.sort((a, b) => a.orderBy - b.orderBy);

    // Verileri localStorage'e kaydediyoruz
    localStorage.setItem("localData", JSON.stringify(localData));
}

const validationSchema = Yup.object({
    orderBy: Yup.number().min(1).max(100) ,
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
    backgrounBlur: Yup.boolean(),
    bgImageOpen: Yup.boolean(),
    bgDarkness: Yup.boolean(),
    bgDarknessValue: Yup.number(),
});

function EditForm({ localData, id }) {
    const editData = localData.find((element) => element.id == id);
    const editDataIndex = localData.indexOf(editData);
    const [openColorPicker, setOpenColorPicker] = useState('');
    console.log(editDataIndex);
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
            backgrounBlur: editData.backgrounBlur,
            bgImageOpen: editData.bgImageOpen,
            bgDarkness: editData.bgDarkness,
            bgDarknessValue: editData.bgDarknessValue,
        }}
            validationSchema={validationSchema}
            onSubmit={values => {
                deleteAndInsert(localData, values, id, values.orderBy);
                window.location.href = "/admin";
            }}>
            <Form className='grid border grid-cols-1 md:grid-cols-2 p-5 rounded bg-white gap-y-5 min-h-full shadow-custome'>
                <div className='font-semibold text-xl'>Edit Object Form</div>
                <Input type="number" label="OrderBy" name="orderBy" pattern="[0-9]*" min="0" max={localData.length + 1}  required/>
                <Input type="text" label="Main text" name="mainText"  />
                <Input type="text" label="Sub text" name="subText" />
                <Input type="text" label="Button link" name="buttonLink" />
                <Input type="text" label="Button text" name="buttonText" />
                <div className='flex justify-between col-span-2 gap-5'>
                    <div className='flex flex-col justify-evenly  gap-2'>
                        <File label="Main image" name="mainImage" />
                        <File label="Background image" name="bgImage" />
                    </div>
                    <div className='grid xl:grid-cols-2 '>
                        <Color label="Sub text color" name="subTextColour" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} hideColorTypeBtns={true}  />
                        <Color label="Main text color" name="mainTextColour" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} />
                        <Color label="Button color" name="buttonColour" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} />
                        <Color label="Button text color" name="buttonTextColour" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} />
                        <Color label="Background color" name="bgColor" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} />
                    </div>
                    <div className='grid gap-2'>
                        <CheckBox label="Main image open" name="mainImageOpen" />
                        <CheckBox label="Main text open" name="MainTextOpen" />
                        <CheckBox label="Button open" name="buttonOpen" />
                        <CheckBox label="Sub text open" name="subTextOpen" />
                        <CheckBox label="Change position" name="changePosition" />
                        <CheckBox label="Background blur" name="backgrounBlur" />
                        <CheckBox label="Background image open" name="bgImageOpen" />
                        <CheckBox label="Background Darkness open" name="bgDarkness" />
                    </div>
                </div>
                <Input type="range" label="Darkness (0.0-1.0)" max={1} min={0} size={1} step={0.1} maxLength={1} pattern="^0(\.[1-9])?$|^1$" name="bgDarknessValue" />
                <SubmitButton title="Add Object" />
            </Form>
        </Formik>
    )
}

export default EditForm;
