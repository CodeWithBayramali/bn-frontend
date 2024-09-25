import * as yup from 'yup'

export const managementFormValidation = yup.object().shape({
    caseNumber: yup.number().required(),
    operatorAdi: yup.string().required(),
    firmaAdi: yup.string().required(),
    hizmet: yup.string().required(),
    mesafe: yup.number().required(),
    ekPoz: yup.string(),
    date: yup.date().required(),
    pozSayisi: yup.number().required(),
    vakaSonlandiran: yup.string().required(),
    aciklama: yup.string()
})