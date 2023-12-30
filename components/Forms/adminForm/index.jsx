"use client"
import React, { useState } from 'react'

import { Form, Formik, } from 'formik';
import * as Yup from 'yup';
import { uuid } from 'uuidv4'
import { File, Color, CheckBox, Input, SubmitButton } from '../FormsElement';

const setSubmitData = (submitData, localData, setLocalData, setOpenPage) => {
  if (Object.keys(submitData).length > 0) {
    // Sıralama güncelleme işlemi
    const updatedLocalData = [...localData];
    updatedLocalData.splice(submitData.orderBy - 1, 0, submitData);

    setOpenPage(true)
    // State ve localStorage güncellemeleri
    setLocalData(updatedLocalData);
    localStorage.setItem('localData', JSON.stringify(updatedLocalData));
  }
  setTimeout(() => window.location.reload(), 1000)
}

const validationSchema = Yup.object({
  orderBy: Yup.number().min(1),
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

function AdminForm({ localData, setLocalData, setOpenPage, adminSettings, setWhichPage }) {
  const [openColorPicker, setOpenColorPicker] = useState('');
  const [bgDarknessVisible, setBgDarknessVisible] = useState(false);

  return (
    <Formik initialValues={{
      id: uuid(),
      orderBy: localData.length + 1,
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
      backgroundBlur: true,
      bgImageOpen: true,
      bgDarkness: false,
      bgDarknessValue: 0,
    }}
      validationSchema={validationSchema}
      onSubmit={values => {
        setSubmitData(values, localData, setLocalData, setOpenPage)
        setWhichPage("addObject")
      }}>
      <Form className='grid border grid-cols-1 md:grid-cols-2 p-5 rounded gap-y-5 min-h-full shadow-custome  ' style={{ background: adminSettings.adminPageCardColor ? adminSettings?.adminPageCardColor : '#fff' }}>
        <div className='font-semibold text-xl'>Add Object Form</div>
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
          <SubmitButton title="Add Object" adminSettings={adminSettings} />
        </div>
      </Form>
    </Formik>
  )
}

export default AdminForm;