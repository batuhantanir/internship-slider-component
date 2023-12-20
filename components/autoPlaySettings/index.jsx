"use client"
import React from 'react'

import CostumeForm from '../customForm'

import { useFormik } from 'formik';
import * as Yup from 'yup';

const setSubmitData = (values) => {
  localStorage.setItem('autoPlaySettings', JSON.stringify(values));
}

const validationSchema = Yup.object({
  delay: Yup.number().required('Required'),
  disableOnInteraction: Yup.boolean().required('Required'),
  waitForTransition: Yup.boolean().required('Required'),
  pauseOnMouseEnter: Yup.boolean().required('Required'),
});

function AutoPlaySettings({ storedSettings }) {

  const { handleSubmit, handleChange, values, resetForm } = useFormik({
    initialValues: {
      autoPlay: storedSettings?.autoPlay,
      delay: storedSettings?.delay,
      disableOnInteraction: storedSettings?.disableOnInteraction,
      waitForTransition: storedSettings?.waitForTransition,
      pauseOnMouseEnter: storedSettings?.pauseOnMouseEnter,
    },
    validationSchema,
    onSubmit: values => {
      setSubmitData(values)
      window.location.reload();
    },
  })

  const formData = [

    {
      labelName: "Auto play",
      forHtml: "autoPlay",
      typeName: "checkbox",
      name: "autoPlay",
      id: "autoPlay",
      handleChange: handleChange,
      checked: values.autoPlay,
    },
    {
      labelName: "On Interaction",
      forHtml: "disableOnInteraction",
      typeName: "checkbox",
      name: "disableOnInteraction",
      id: "disableOnInteraction",
      handleChange: handleChange,
      checked: values.disableOnInteraction,
    },
    {
      labelName: "Wait For Transition",
      forHtml: "waitForTransition",
      typeName: "checkbox",
      name: "waitForTransition",
      id: "waitForTransition",
      handleChange: handleChange,
      checked: values.waitForTransition,
    },
    {
      labelName: "Pause On Mouse Enter",
      forHtml: "pauseOnMouseEnter",
      typeName: "checkbox",
      name: "pauseOnMouseEnter",
      id: "pauseOnMouseEnter",
      handleChange: handleChange,
      checked: values.pauseOnMouseEnter,
    },
    {
      labelName: "Autoplay Delay (ms)",
      forHtml: "delay",
      typeName: "number",
      name: "delay",
      id: "delay",
      placeholderName: "Autoplay Delay (ms)",
      handleChange: handleChange,
      values: values.delay,
    },
  ]

  return (
    <CostumeForm formData={formData} handleSubmit={handleSubmit} headerName={"Autoplay settings"} btnName={"Save settings"} />
  )
}

export default AutoPlaySettings;
