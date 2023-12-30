"use client"
import React from 'react'

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {CheckBox,Input,SubmitButton} from '../FormsElement';

const setSubmitData = (values) => {
    localStorage.setItem('customSliderSettings', JSON.stringify(values));
}

const validationSchema = Yup.object({
    speed: Yup.number(),
    loop: Yup.boolean(),
    navigation: Yup.boolean(),
    pagination: Yup.boolean(),
});

function CustomSliderSettings({ storedSettings, adminSettings, setWhichPage,setOpenPage }) {

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
                setWhichPage('Slider Ayarları')
                setOpenPage(true);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }}>
            <Form className='grid border grid-cols-1 md:grid-cols-2 p-5 rounded bg-white gap-y-5 shadow-custome' style={{ background: adminSettings.adminPageCardColor ? adminSettings.adminPageCardColor : '#fff' }}>
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
                <SubmitButton title="Save settings" adminSettings={adminSettings} />
            </Form>
        </Formik>
    )
}

export default CustomSliderSettings;
