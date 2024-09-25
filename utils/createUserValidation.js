import * as yup from 'yup'

export const createUserValidation = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
})