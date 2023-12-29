"use client"
import React, { useState } from 'react'

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import SubmitButton from '../FormsElement/SubmitButton';
import Color from '../FormsElement/Color';

const setSubmitData = (values) => {
    localStorage.setItem('adminSettings', JSON.stringify(values));
}

const validationSchema = Yup.object({
    adminPageBgColor: Yup.string(),
    adminPageTextColor: Yup.string(),
    adminPageCardColor: Yup.string(),
    title: Yup.boolean(),
});

function AdminPageSettings({ adminSettings, setWhichPage, setOpenPage}) {
    const [openColorPicker, setOpenColorPicker] = useState('');

    return (
        <Formik initialValues={{
            adminPageBgColor: adminSettings ? adminSettings.adminPageBgColor : '#fff',
            adminPageTextColor: adminSettings ? adminSettings.adminPageTextColor : '#000',
            adminPageCardColor: adminSettings ? adminSettings.adminPageCardColor : '#fff',
            adminPageBtnColor: adminSettings ? adminSettings.adminPageBtnColor : '#fff',
            adminPageBtnHoverColor: adminSettings ? adminSettings.adminPageBtnHoverColor : '#fff',
        }}
            validationSchema={validationSchema}
            onSubmit={values => {
                setSubmitData(values)
                setWhichPage("Admin Sayfa Ayarları");
                setOpenPage(true)
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }}>
            <Form className='grid border grid-cols-1 md:grid-cols-2 p-5 rounded  gap-y-5 shadow-custome h-full' style={{ background: adminSettings.adminPageCardColor ? adminSettings.adminPageCardColor : '#fff' }}>
                <div className='font-semibold text-xl'>Admin Control Panel</div>
                <div className='flex flex-col md:flex-row gap-8 col-span-2'>
                    <div className='flex justify-between md:justify-normal flex-wrap gap-4 md:gap-2  '>
                        <Color label="Background Color" name="adminPageBgColor" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} hideColorTypeBtns={true} />
                        <Color label="Text Color" name="adminPageTextColor" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} hideColorTypeBtns={true} />
                        <Color label="Card Background Color" name="adminPageCardColor" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} hideColorTypeBtns={true} />
                        <Color label="Button Color" name="adminPageBtnColor" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} hideColorTypeBtns={true} />
                        <Color label="Button Hover Color" name="adminPageBtnHoverColor" setOpenColorPicker={setOpenColorPicker} openColorPicker={openColorPicker} hideColorTypeBtns={true} />
                    </div>
                </div>
                <SubmitButton title="Save Settings" adminSettings={adminSettings} />
            </Form>
        </Formik>
    )
}

export default AdminPageSettings;
