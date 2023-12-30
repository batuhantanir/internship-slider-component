"use client"
import React from 'react'

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {CheckBox,Input,SubmitButton} from '../FormsElement';

const setSubmitData = (values) => {
    localStorage.setItem('autoPlaySettings', JSON.stringify(values));
}

const validationSchema = Yup.object({
    delay: Yup.number().required('Required'),
    disableOnInteraction: Yup.boolean().required('Required'),
    waitForTransition: Yup.boolean().required('Required'),
    pauseOnMouseEnter: Yup.boolean().required('Required'),
});

function AutoPlaySettings({ storedSettings, adminSettings,setWhichPage,setOpenPage }) {
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
                setSubmitData(values)
                setWhichPage('Autoplay Ayarları');
                setOpenPage(true);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }}>
            <Form className='grid border grid-cols-1 md:grid-cols-2 p-5 rounded bg-white gap-y-5 shadow-custome' style={{ background: adminSettings.adminPageCardColor ? adminSettings.adminPageCardColor : '#fff' }}>
                <div className='font-semibold text-xl'>Auto play settings</div>
                <div className='flex flex-col md:flex-row gap-8 col-span-2'>
                    <div className='flex-1'>
                        <Input label='Delay (ms)' name='delay' type='range' max={3000} min={100} step={100} />
                    </div>
                    <div className='flex justify-between md:justify-normal md:flex-col gap-4 md:gap-2 flex-row flex-wrap'>
                        <CheckBox label='Auto play' name='autoPlay' />
                        <CheckBox label='Disable on interaction' name='disableOnInteraction' />
                        <CheckBox label='Wait for transition' name='waitForTransition' />
                        <CheckBox label='Pause on mouse enter' name='pauseOnMouseEnter' />
                    </div>
                </div>
                <SubmitButton title="Save Settings" adminSettings={adminSettings} />
            </Form>
        </Formik>
    )
}

export default AutoPlaySettings;
