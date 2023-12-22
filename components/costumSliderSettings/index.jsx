"use client"
import React from 'react'

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../Form/Input';
import CheckBox from '../Form/CheckBox';
import SubmitButton from '../Form/SubmitButton';

const setSubmitData = (values) => {
    localStorage.setItem('customSliderSettings', JSON.stringify(values));
}

const validationSchema = Yup.object({
    speed: Yup.number(),
    loop: Yup.boolean(),
    navigation: Yup.boolean(),
    pagination: Yup.boolean(),
});

function CustomSliderSettings({ storedSettings }) {

    const initialValues = {
        loop: storedSettings?.loop,
        navigation: storedSettings?.navigation,
        effect: 'fade',
        speed: storedSettings?.speed,
        pagination: storedSettings?.pagination,
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => {
                setSubmitData(values)
                window.location.reload();
            }}>
            <Form className='grid border grid-cols-1 md:grid-cols-2 p-5 rounded bg-white gap-y-5 shadow-custome'>
                <div className='font-semibold text-xl'>Custom Slider Settings</div>
                <div className='flex flex-col md:flex-row gap-8 col-span-2'>
                    <div className='flex-1'>
                        <Input label='Speed (ms)' name='speed' type='range' max={3000} min={100} step={100} />
                    </div>
                    <div className='flex justify-between md:justify-normal md:flex-col gap-4 md:gap-2 flex-row flex-wrap'>
                        <CheckBox label='Loop' name='loop' />
                        <CheckBox label='Navigation' name='navigation' />
                        <CheckBox label='Pagination' name='pagination' />
                    </div>
                </div>
                <SubmitButton title="Save settings" />
            </Form>
        </Formik>
    )
}

export default CustomSliderSettings;
