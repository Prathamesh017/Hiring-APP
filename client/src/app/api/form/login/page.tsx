'use client'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useMutation } from '@apollo/client'
import { Login_Candidate, Login_Company } from '@/app/graphql/mutation'
import { useSearchParams } from 'next/navigation'
import Loading from '../loadingSpinner'
import { useRouter } from 'next/navigation'

let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(regex, 'Invalid Email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
})

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const router = useRouter()

  const [
    loginUser,
    { data: candidateData, loading: candidateLoading, error: candidateError },
  ] = useMutation(Login_Candidate)
  const [
    loginCompany,
    { data: companyData, loading: companyLoading, error: companyeError },
  ] = useMutation(Login_Company)
  const searchParams = useSearchParams()
  const account = searchParams.get('account')
  const onSubmit = (data: any) => {
    if (account === 'company') {
      loginCompany({
        variables: { companyEmail: data.email, companyPassword: data.password },
      })
    } else if (account === 'candidate') {
      loginUser({
        variables: { email: data.email, password: data.password },
      })
    }
  }
  if (companyData || candidateData) {
    let data = JSON.stringify(companyData || candidateData)
    localStorage.setItem('data', data)
    router.push('/api/company')
  }
  return (
    <>
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
          <h1 className=" text-xl md:text-3xl text-[#01967b] capitalize">
            Login {account}
          </h1>
          <div className=" w-3/4 h-2/3 md:w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form className="p-4 " onSubmit={handleSubmit(onSubmit)}>
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

              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="w-full  px-2 py-1 md:px-4 md:py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#01967b]  rounded-md hover:text-slate-900 cursor focus:outline-none focus:bg-purple-600"
                >
                  Login
                </button>
              </div>
            </form>
            <p>{}</p>
            <p className="text-red-700 text-center">
              {((candidateError || companyeError) && candidateError?.message) ||
                companyeError?.message}
            </p>
            <p className="text-green-700 text-center">
              {candidateData || companyData ? 'Login Successfully' : ''}
            </p>
            <p className="text-center">
              {(candidateLoading || companyLoading) && <Loading></Loading>}
            </p>

            <div className="flex flex-col justify-start md:flex-row md:justify-between mt-4 text-slate-700 p-2">
              Do not have an account?{' '}
              <span className="text-[#01967b] outline p-2 rounded">
                <Link href={'/api/form/candidate'}>Register</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
