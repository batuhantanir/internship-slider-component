"use client"
import React from 'react'

import CostumeForm from '../customForm'

import { useFormik } from 'formik';
import * as Yup from 'yup';

const setSubmitData = (values) => {
    localStorage.setItem('customSliderSettings', JSON.stringify(values));
}

const validationSchema = Yup.object({
    speed: Yup.number().required('Required'),
    loop: Yup.boolean().required('Required'),
    navigation: Yup.boolean().required('Required'),
});

function CustomSliderSettings({ storedSettings }) {

    const { handleSubmit, handleChange, values, resetForm } = useFormik({
        initialValues: {
            loop: storedSettings.loop,
            navigation: storedSettings.navigation,
            effect: 'fade',
            speed: storedSettings.speed,
            pagination: storedSettings.pagination,
        },
        validationSchema,
        onSubmit: values => {
            setSubmitData(values)
            window.location.reload();
        },
    })

    const formData = [
        {
            labelName: "Slider Speed",
            forHtml: "speed",
            typeName: "number",
            name: "speed",
            id: "speed",
            handleChange: handleChange,
            values: values.speed,
        },
        {
            labelName: "Slider Loop",
            forHtml: "loop",
            typeName: "checkbox",
            name: "loop",
            id: "loop",
            handleChange: handleChange,
            checked: values.loop,
        },
        {
            labelName: "Navigation",
            forHtml: "navigation",
            typeName: "checkbox",
            name: "navigation",
            id: "navigation",
            handleChange: handleChange,
            checked: values.navigation,
        },
        {
            labelName: "Pagination",
            forHtml: "pagination",
            typeName: "checkbox",
            name: "pagination",
            id: "pagination",
            handleChange: handleChange,
            checked: values.pagination,
        },
    ]

    return (
        <CostumeForm formData={formData} handleSubmit={handleSubmit} headerName={"Slider Settings"} btnName={"Save settings"} />
    )
}

export default CustomSliderSettings;
