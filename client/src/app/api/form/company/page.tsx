'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useMutation } from '@apollo/client'
import { Register_Company } from '@/app/graphql/mutation'
import Loading from '../loadingSpinner'
let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Company Name is required')
    .min(4, 'Company must be at least 4 characters long'),
  description: yup
    .string()
    .required('Company Description is required')
    .min(100, 'Company Description be at least 100 characters long')
    .max(300, 'Company Desciption be a  maximum 300 characters long'),
  email: yup
    .string()
    .required('Email is required')
    .matches(regex, 'Invalid Email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  CPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [registerCompany, { data, loading, error }] = useMutation(
    Register_Company,
  )

  const onSubmit = (data: any) => {
    
    registerCompany({
      variables: {
        companyName: data.name,
        companyEmail: data.email,
        companyPassword: data.password,
        companyDescription: data.description,
      },
    })
  }

  return (
    <>
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
          <h1 className=" text-xl md:text-3xl text-[#01967b]">
            Company Register
          </h1>
          <div className=" w-3/4 md:w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    {...register('name')}
                    name="name"
                    className="block w-full mt-1  text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-black-700 border border-black-700 "
                  />
                  <p className="text-red-700">
                    {errors.name && <span>{errors.name.message}</span>}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 undefined">
                  Short Desciption About Your Company
                </label>
                <div className="flex flex-col items-start">
                  <textarea
                    {...register('description')}
                    className="block w-full mt-1  text-black border border-black-700 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-black-700 "
                  />
                  {errors.description && (
                    <p className="text-red-700">{errors.description.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 undefined">
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    className="block w-full mt-1 text-slate-900 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-black-700 "
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-red-700">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    {...register('password')}
                    className="block w-full  text-slate-700 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-black-700 "
                  />
                  {errors.password && (
                    <p className="text-red-700">{errors.password.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Confirm Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    className="block w-full text-slate-900 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-black-700 "
                    {...register('CPassword')}
                  />

                  {errors.CPassword && (
                    <p className="text-red-700">{errors.CPassword.message}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="w-full  px-2 py-1 md:px-4 md:py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#01967b]  rounded-md hover:text-slate-900 cursor focus:outline-none focus:bg-purple-600"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="text-red-700 text-center">
              {error ? error.message : ''}
            </p>
            <p className="text-green-700 text-center">
              {data ? 'Registration Successfully.Login Now' : ''}
            </p>
            <p className="text-center">{loading && <Loading></Loading>}</p>
            <div className="flex flex-col justify-start md:flex-row md:justify-between mt-4 text-slate-700 p-2">
              Already have an account?{' '}
              <span className="text-[#01967b] outline p-2 rounded">
                <Link href={'/api/form/login?account=company'}>Log in</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
