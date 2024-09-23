"use client";
import { signInDispatch } from "@/redux/authSlice";
import { loginValidation } from "@/utils/loginValidation";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch()
  const _handleSubmit = (values) => {
    dispatch(signInDispatch(values))
  };

  return (
    <section className="container flex items-center justify-center h-[90vh] mx-auto">
      <Formik
        initialValues={{
          email: "",
          hashedPassword: "",
        }}
        onSubmit={_handleSubmit}
        validationSchema={loginValidation}
      >
        {({ values, handleChange ,handleSubmit, errors, touched }) => (
          <div className="bg-gray-700 p-4 flex flex-col gap-y-4 rounded-lg">
            <h1 className="text-green-500 font-bold text-center">Giriş Yap</h1>
            <input
              name="email"
              value={values.email}
              onChange={handleChange('email')}
              className="bg-transparent border-gray-400 border w-72 rounded-lg p-2"
              placeholder="Email"
            />
            <input
              name="hashedPassword"
              value={values.hashedPassword}
              type="password"
              onChange={handleChange('hashedPassword')}
              className="bg-transparent border-gray-400 border w-72 rounded-lg p-2"
              placeholder="Password"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-indigo-600 rounded-lg w-full p-2"
            >
              Giriş
            </button>
          </div>
        )}
      </Formik>
    </section>
  );
}
