'use client'
import { getUserDispatch } from '@/redux/authSlice'
import { createManagementDispatch } from '@/redux/managementSlice'
import { managementFormValidation } from '@/utils/managementFormValidation'
import { Formik } from 'formik'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'


export default function page() {
    const [file,setFile] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [btnLoading,setBtnLoading] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    
    useEffect(()=> {
      setIsLoading(true)
       const token = localStorage.getItem('access-token')
       if(!token) {
        router.push("/")
        return;
       }
       const decodedToken = jwtDecode(token)
       const role = decodedToken.role[0]
       if(role !== 'ADMIN') {
        router.push("/")
       }
       setIsLoading(false)
    },[router])
    if(isLoading) return <div className='flex h-screen justify-center items-center text-2xl'>Loading...</div>

    const _handleSubmit = async (values) => {
      setBtnLoading(true)
      const formData = new FormData()
      formData.append("file",file)
      formData.append("managementJson",JSON.stringify(values))
      dispatch(createManagementDispatch(formData))
      toast.success('Gönderildi')
    }

  return (
    <div className='flex flex-row container mt-12'>
        <Formik
        initialValues={{
          caseNumber: 0,
          operatorAdi: '',
          firmaAdi: '',
          vakaIlcesi: '',
          vakaSehri: '',
          hizmet: '',
          mesafe: 0,
          ekPoz: '',
          date: '',
          ilceler: '',
          pozSayisi: 0,
          vakaSonlandiran: '',
          aciklama: ''
        }}
        onSubmit={_handleSubmit}
        validationSchema={managementFormValidation}
        >
          {({values,touched,handleSubmit,handleChange,errors,setFieldTouched,setFieldValue})=> (
            <div className='flex flex-col gap-y-8 mx-auto'>
            <div className='grid grid-cols-4 gap-y-12 gap-x-12'>
            <span className='relative flex flex-col gap-y-2'>
              <label>Case Number</label>
              <input 
                className='border-gray-500 border bg-transparent rounded-lg p-2'
                id='caseNumber'
                name='caseNumber'
                value={values.caseNumber} 
                onChange={handleChange('caseNumber')} 
                type='number'
              />
              {
                errors.caseNumber && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.caseNumber}</span>
              }
            </span>

            <span className='relative flex flex-col gap-y-2'>
              <label>Operatör Adı</label>
              <input 
                className='border-gray-500 border bg-transparent rounded-lg p-2'
                id='operatorAdi'
                name='operatorAdi'
                value={values.operatorAdi} 
                onChange={handleChange('operatorAdi')} 
              />
              {
                errors.operatorAdi && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.operatorAdi}</span>
              }
            </span>

            <span className='relative flex flex-col gap-y-2'>
              <label>Firma Adı</label>
              <input 
                className='border-gray-500 border bg-transparent rounded-lg p-2'
                id='firmaAdi'
                name='firmaAdi'
                value={values.firmaAdi} 
                onChange={handleChange('firmaAdi')} 
              />
               {
                errors.firmaAdi && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.firmaAdi}</span>
              }
            </span>

            <span className='relative flex flex-col gap-y-2'>
              <label>Vaka İlçesi</label>
              <input 
                className='border-gray-500 border bg-transparent rounded-lg p-2'
                id='vakaIlcesi'
                name='vakaIlcesi'
                value={values.vakaIlcesi} 
                onChange={handleChange('vakaIlcesi')} 
              />
              {
                errors.vakaIlcesi && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.vakaIlcesi}</span>
              }
            </span>

            <span className='relative flex flex-col gap-y-2'>
              <label>Vaka Şehri</label>
              <input 
                className='border-gray-500 border bg-transparent rounded-lg p-2'
                id='vakaSehri'
                name='vakaSehri'
                value={values.vakaSehri} 
                onChange={handleChange('vakaSehri')} 
              />
              {
                errors.vakaSehri && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.vakaSehri}</span>
              }
            </span>

            <span className='relative flex flex-col gap-y-2'>
              <label>Hizmet</label>
              <input 
                className='border-gray-500 border bg-transparent rounded-lg p-2'
                id='hizmet'
                name='hizmet'
                value={values.hizmet} 
                onChange={handleChange('hizmet')} 
              />
              {
                errors.hizmet && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.hizmet}</span>
              }
            </span>

            <span className='relative flex flex-col gap-y-2'>
              <label>Mesafe</label>
              <input 
                className='border-gray-500 border bg-transparent rounded-lg p-2'
                id='mesafe'
                name='mesafe'
                value={values.mesafe} 
                onChange={handleChange('mesafe')} 
                type='number'
              />
              {
                errors.mesafe && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.mesafe}</span>
              }
            </span>

            <span className='relative flex flex-col gap-y-2'>
              <label>Ek Poz</label>
              <input 
                className='border-gray-500 border bg-transparent rounded-lg p-2'
                id='ekPoz'
                name='ekPoz'
                value={values.ekPoz} 
                onChange={handleChange('ekPoz')} 
              />
              {
                errors.ekPoz && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.ekPoz}</span>
              }
            </span>

            <span className='relative flex flex-col gap-y-2'>
              <label>Poz Sayısı</label>
              <input 
                className='border-gray-500 border bg-transparent rounded-lg p-2'
                id='pozSayisi'
                name='pozSayisi'
                value={values.pozSayisi} 
                onChange={handleChange('pozSayisi')} 
                type='number'
              />
              {
                errors.pozSayisi && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.pozSayisi}</span>
              }
            </span>

            <span className='relative flex flex-col gap-y-2'>
              <label>İlçeler</label>
              <input 
                className='border-gray-500 border bg-transparent rounded-lg p-2'
                id='ilceler'
                name='ilceler'
                value={values.ilceler} 
                onChange={handleChange('ilceler')} 
              />
              {
                errors.ilceler && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.ilceler}</span>
              }
            </span>

            <span className='relative flex flex-col gap-y-2'>
              <label>Vaka Sonlandıran</label>
              <input 
                className='border-gray-500 border bg-transparent rounded-lg p-2'
                id='vakaSonlandiran'
                name='vakaSonlandiran'
                value={values.vakaSonlandiran} 
                onChange={handleChange('vakaSonlandiran')} 
              />
              {
                errors.vakaSonlandiran && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.vakaSonlandiran}</span>
              }
            </span>

            <span className='flex flex-col gap-y-2'>
              <label>Tarih</label>
              <input 
                className='border-gray-500 border bg-transparent rounded-lg p-2'
                id='date'
                name='date'
                value={values.date} 
                onChange={handleChange('date')} 
                type='date'
              />
              {
                errors.date && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.date}</span>
              }
            </span>
          </div>

          <div className='w-full'>
            <span className='flex flex-col gap-y-2'>
              <label className='text-blue-600'>Döküman</label>
              <input onChange={(e)=> setFile(e.target.files[0])} type='file' required />
            </span>
          <span className='relative flex flex-col gap-y-2 mt-6'>
              <label>Açıklama</label>
              <textarea 
                className='border-gray-500 border bg-transparent rounded-lg p-2'
                id='aciklama'
                name='aciklama'
                value={values.aciklama} 
                onChange={handleChange('aciklama')} 
                rows={10}
              />
              {
                errors.aciklama && <span className='text-xs text-red-600 absolute -bottom-5'>{errors.aciklama}</span>
              }
            </span>
            <button onClick={()=> handleSubmit()} type='submit' className='bg-blue-600 mt-6 w-full p-2 rounded-lg'>Gönder</button>
          </div>
          </div>
          )}
        </Formik>
    </div>
  )
}
