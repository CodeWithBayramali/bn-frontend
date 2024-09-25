'use client'

import React from 'react'
import { ImCancelCircle } from "react-icons/im";
import { createUserValidation } from '@/utils/createUserValidation';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { createUserDispatch } from '@/redux/adminSlice';

export const CreateUserModal = ({open,setOpen}) => {
    const dispatch = useDispatch()
    const _handleSubmit = (values) => {
        dispatch(createUserDispatch(values))
        setOpen(!open)
    }

    return(
      <div className={`${open ? 'fixed z-50 inset-0 flex flex-col items-center justify-center backdrop-blur-sm bg-black bg-opacity-75':'hidden'}`}>
        
        <div className='bg-gray-800 relative grid grid-cols-1 w-72 gap-x-4 gap-y-4 p-4 rounded-lg'>
        <ImCancelCircle className='absolute right-4 top-4 text-red-600 cursor-pointer' onClick={()=> setOpen(!open)} size={24} />
        <h2 className='text-blue-600 text-xl font-bold text-center mt-6'>Kullanıcı Oluştur</h2>
        <Formik
            initialValues={{
                name: '',
                email: '',
                hashedPassword: ''
            }}
            onSubmit={_handleSubmit}
        >
            {({values,handleChange,handleSubmit,errors})=> (
                <>
                <span className='flex flex-col gap-y-1'>
                <label>Kullanıcı Adı</label>
                <input 
                id='name'
                name='name'
                value={values.name}
                onChange={handleChange('name')}
                className='bg-transparent border p-2 border-gray-400 rounded-lg' />
                {
                errors.name && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.name}</span>
              }
              </span>
    
              <span className='flex flex-col gap-y-1'>
                <label>E-mail</label>
                <input 
                id='email'
                name='email'
                value={values.email}
                onChange={handleChange('email')}
                className='bg-transparent border p-2 border-gray-400 rounded-lg' />
                {
                errors.email && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.email}</span>
              }
              </span>
    
              <span className='flex flex-col gap-y-1'>
                <label>Şifre</label>
                <input 
                type='password'
                id='hashedPassword'
                name='hashedPassword'
                value={values.hashedPassword}
                onChange={handleChange('hashedPassword')}
                className='bg-transparent border p-2 border-gray-400 rounded-lg' />
                {
                errors.hashedPassword && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.hashedPassword}</span>
              }
              </span>
              <button type='submit' onClick={()=> handleSubmit()} className='w-full bg-green-600 rounded-full p-2'>Oluştur</button>
              </>
            )}
          </Formik>
        </div>
      </div>
    )
  }