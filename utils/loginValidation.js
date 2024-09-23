import * as yup from 'yup'

export const loginValidation = yup.object().shape({
    email: yup.string().email().required(),
    hashedPassword: yup.string().required()
})