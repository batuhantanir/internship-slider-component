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
    speed: Yup.number().required('Required'),
    loop: Yup.boolean().required('Required'),
    navigation: Yup.boolean().required('Required'),
});

function CustomSliderSettings({ storedSettings }) {

    return (
        <Formik
            initialValues={{
                loop: storedSettings?.loop,
                navigation: storedSettings?.navigation,
                effect: 'fade',
                speed: storedSettings?.speed,
                pagination: storedSettings?.pagination,
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
                setSubmitData(values)
                window.location.reload();
            }}>
            <Form>
                <div className='grid border grid-cols-1 md:grid-cols-2 p-5 rounded bg-white gap-y-5'>
                    <div className='font-semibold text-xl'>Custom Slider Settings</div>
                    <Input label='Speed (ms)' name='speed' type='number' />
                    <CheckBox label='Loop' name='loop' />
                    <CheckBox label='Navigation' name='navigation' />
                    <CheckBox label='Pagination' name='pagination' />
                    <SubmitButton title="Add Object" />
                </div>

            </Form>
        </Formik>
    )
}

export default CustomSliderSettings;
