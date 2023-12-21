"use client"
import React, { useState } from 'react'

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { uuid } from 'uuidv4'
import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';
import File from '../Form/File';
import Color from '../Form/Color';
import CheckBox from '../Form/CheckBox';

const setSubmitData = (submitData, localData, setLocalData) => {
  if (Object.keys(submitData).length > 0) {
    setLocalData((prevData) => [...prevData, submitData]);
    localStorage.setItem('localData', JSON.stringify([...localData, submitData]));
  }
}

const validationSchema = Yup.object({
  mainText: Yup.string(),
  subText: Yup.string(),
  buttonLink: Yup.string(),
  buttonText: Yup.string(),
  mainImage: Yup.string(),
  subTextColour: Yup.string(),
  mainTextColour: Yup.string(),
  buttonColour: Yup.string(),
  buttonTextColour: Yup.string(),
  bgColor: Yup.string(),
  bgColor: Yup.string(),
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

function AdminForm({ localData, setLocalData }) {
  const [openColorPicker, setOpenColorPicker] = useState('');
  return (
    <Formik initialValues={{
      id: uuid(),
      mainText: "",
      subText: "",
      buttonLink: "",
      buttonText: "",
      mainImage: "",
      subTextColour: "",
      mainTextColour: "",
      buttonColour: "",
      buttonTextColour: "",
      bgColor: "",
      bgImage: "",
      mainImageOpen: true,
      MainTextOpen: true,
      buttonOpen: true,
      subTextOpen: true,
      changePosition: true,
      backgrounBlur: true,
      bgImageOpen: true,
      bgDarkness: true,
      bgDarknessValue: "",
    }}
      validationSchema={validationSchema}
      onSubmit={values => {
        setSubmitData(values, localData, setLocalData)
        window.location.reload();
      }}>
      <Form className='grid border grid-cols-1 md:grid-cols-2 p-5 rounded bg-white gap-y-5 min-h-full'>
        <div className='font-semibold text-xl'>Add Object Form</div>
        <Input type="text" label="Main text" name="mainText" placeholder="" />
        <Input type="text" label="Sub text" name="subText" />
        <Input type="text" label="Button link" name="buttonLink" />
        <Input type="text" label="Button text" name="buttonText" />
        <div className='flex justify-between col-span-2 gap-5'>
          <div className='flex flex-col justify-evenly  gap-2'>
            <File label="Main image" name="mainImage" />
            <File label="Background image" name="bgImage" />
          </div>
          <div className='grid xl:grid-cols-2 '>
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

export default AdminForm;