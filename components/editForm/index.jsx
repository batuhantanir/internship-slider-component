"use client"
import React from 'react'

import CostumeForm from '../customForm'

import { useFormik } from 'formik';
import * as Yup from 'yup';

function changeUser(data, values, userId) {

    const updatedData = data.map((element) => {
      if (element.id === userId) {
        // Bulduğumuz verileri eşleştirip eğer değişmiş bir veri var ise güncelliyoruz
        return { ...element, ...values };
      }
      return element;
    });
  
    // Verileri localStorage'e kaydediyoruz
    localStorage.setItem("localData", JSON.stringify(updatedData));
}

const validationSchema = Yup.object({
    mainText: Yup.string().required('Main Text is required'),
    subText: Yup.string().required('Sub Text is required'),
    buttonLink: Yup.string().required('Button Link is required'),
    buttonText: Yup.string().required('Button Text is required'),
    mainImage: Yup.string().required('Main Image URL is required'),
    subTextColour: Yup.string(),
    mainTextColour: Yup.string(),
    buttonColour: Yup.string(),
    buttonTextColour: Yup.string(),
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

function EditForm({ localData, id }) {
    const editData = localData.find((element) => element.id == id);

    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            id: editData.id,
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
            mainImageOpen: editData.mainImageOpen,
            MainTextOpen: editData.MainTextOpen,
            buttonOpen: editData.buttonOpen,
            subTextOpen: editData.subTextOpen,
            changePosition: editData.changePosition,
            backgrounBlur: editData.backgrounBlur,
            bgImageOpen: editData.bgImageOpen,
            bgDarkness: editData.bgDarkness,
            bgDarknessValue: editData.bgDarknessValue,
        },
        validationSchema,
        onSubmit: values => {
            changeUser(localData, values, id);
            window.location.href = "/admin";
        },
    })

    const formData = [
        {
            labelName: "Main Text",
            forHtml: "mainText",
            typeName: "text",
            name: "mainText",
            id: "mainText",
            placeholderName: "Main Text",
            handleChange: handleChange,
            values: values.mainText,
        },
        {
            labelName: "Sub Text",
            forHtml: "subText",
            typeName: "text",
            name: "subText",
            id: "subText",
            placeholderName: "Sub Text",
            handleChange: handleChange,
            values: values.subText,
        },
        {
            labelName: "Button Link",
            forHtml: "buttonLink",
            typeName: "text",
            name: "buttonLink",
            id: "buttonLink",
            placeholderName: "Button Link",
            handleChange: handleChange,
            values: values.buttonLink,
        },
        {
            labelName: "Button Text",
            forHtml: "buttonText",
            typeName: "text",
            name: "buttonText",
            id: "buttonText",
            placeholderName: "Button Text",
            handleChange: handleChange,
            values: values.buttonText,
        },
        {
            labelName: "Main Image URL",
            forHtml: "mainImage",
            typeName: "text",
            name: "mainImage",
            id: "mainImage",
            placeholderName: "Main Image",
            handleChange: handleChange,
            values: values.mainImage,
        },
        {
            labelName: "Background Color",
            forHtml: "bgColor",
            typeName: "text",
            name: "bgColor",
            id: "bgColor",
            placeholderName: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
            handleChange: handleChange,
            values: values.bgColor,
        },
        {
            labelName: "Sub Text Colour",
            forHtml: "subTextColour",
            typeName: "color",
            name: "subTextColour",
            id: "subTextColour",
            placeholderName: "Sub Text Colour",
            handleChange: handleChange,
            color: values.subTextColour,
        },
        {
            labelName: "Main Text Colour",
            forHtml: "mainTextColour",
            typeName: "color",
            name: "mainTextColour",
            id: "mainTextColour",
            placeholderName: "Main Text Colour",
            handleChange: handleChange,
            color: values.mainTextColour,
        },
        {
            labelName: "Button Colour",
            forHtml: "buttonColour",
            typeName: "color",
            name: "buttonColour",
            id: "buttonColour",
            placeholderName: "Button Colour",
            handleChange: handleChange,
            color: values.buttonColour,
        },
        {
            labelName: "Button Text Colour",
            forHtml: "buttonTextColour",
            typeName: "color",
            name: "buttonTextColour",
            id: "buttonTextColour",
            placeholderName: "Button Text Colour",
            handleChange: handleChange,
            color: values.buttonTextColour,
        },
        {
            labelName: "Main Image Open",
            forHtml: "mainImageOpen",
            typeName: "checkbox",
            name: "mainImageOpen",
            id: "mainImageOpen",
            placeholderName: "Main Image Open",
            handleChange: handleChange,
            checked: values.mainImageOpen,
        },
        {
            labelName: "Main Text Open",
            forHtml: "MainTextOpen",
            typeName: "checkbox",
            name: "MainTextOpen",
            id: "MainTextOpen",
            placeholderName: "Main Text Open",
            handleChange: handleChange,
            checked: values.MainTextOpen,
        },
        {
            labelName: "Button Open",
            forHtml: "buttonOpen",
            typeName: "checkbox",
            name: "buttonOpen",
            id: "buttonOpen",
            placeholderName: "Button Open",
            handleChange: handleChange,
            checked: values.buttonOpen,
        },
        {
            labelName: "Sub Text Open",
            forHtml: "subTextOpen",
            typeName: "checkbox",
            name: "subTextOpen",
            id: "subTextOpen",
            placeholderName: "Sub Text Open",
            handleChange: handleChange,
            checked: values.subTextOpen,
        },
        {
            labelName: "Change Position",
            forHtml: "changePosition",
            typeName: "checkbox",
            name: "changePosition",
            id: "changePosition",
            placeholderName: "Change Position",
            handleChange: handleChange,
            checked: values.changePosition,
        },
        {
            labelName: "Background Blur",
            forHtml: "backgrounBlur",
            typeName: "checkbox",
            name: "backgrounBlur",
            id: "backgrounBlur",
            placeholderName: "Background Blur",
            handleChange: handleChange,
            checked: values.backgrounBlur,
        },
        {
            labelName: "Background Image Open",
            forHtml: "bgImageOpen",
            typeName: "checkbox",
            name: "bgImageOpen",
            id: "bgImageOpen",
            placeholderName: "Background Image Open",
            handleChange: handleChange,
            checked: values.bgImageOpen,
        },
        {
            labelName: "Background Darkness",
            forHtml: "bgDarkness",
            typeName: "checkbox",
            name: "bgDarkness",
            id: "bgDarkness",
            placeholderName: "Background Darkness",
            handleChange: handleChange,
            checked: values.bgDarkness,
        },
        {
            labelName: "Background Darkness Value",
            forHtml: "bgDarknessValue",
            typeName: "number",
            name: "bgDarknessValue",
            id: "bgDarknessValue",
            placeholderName: "Background Darkness Value",
            handleChange: handleChange,
            values: values.bgDarknessValue,
            visible: values.bgDarkness,
        }

    ]

    return (
        <CostumeForm formData={formData} handleSubmit={handleSubmit} headerName={"Edit slider object"} btnName={"Save Object"} />
    )
}

export default EditForm;
