"use client"
import React from 'react'

import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../Form/Input';
import File from '../Form/File';
import Color from '../Form/Color';
import CheckBox from '../Form/CheckBox';
import SubmitButton from '../Form/SubmitButton';

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
    return (
        <Formik initialValues={{
            autoPlay: storedSettings?.autoPlay,
            delay: storedSettings?.delay,
            disableOnInteraction: storedSettings?.disableOnInteraction,
            waitForTransition: storedSettings?.waitForTransition,
            pauseOnMouseEnter: storedSettings?.pauseOnMouseEnter,
        }}
            validationSchema={validationSchema}
            onSubmit={values => {
                // setSubmitData(values)
                // window.location.reload();
                console.log(values)
            }}>
            <Form className='grid border grid-cols-1 md:grid-cols-2 p-5 rounded bg-white gap-y-5'>
                <div className='font-semibold text-xl'>Add Object Form</div>
                <Input label='Delay (ms)' name='delay' type='number' placeholder="2000 ms"/>
                <CheckBox label='Disable on interaction' name='disableOnInteraction' />
                <CheckBox label='Wait for transition' name='waitForTransition' />
                <CheckBox label='Pause on mouse enter' name='pauseOnMouseEnter' />
                <SubmitButton title="Add Object" />
            </Form>
        </Formik>
    )
}

export default AutoPlaySettings;
