'use client'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Update_Job } from '@/app/graphql/mutation'
import { useMutation } from '@apollo/client'
import Loading from '../form/loadingSpinner'

const schema = yup.object().shape({
  qualification: yup.string().required('Highest Qualification is required'),
  description: yup
    .string()
    .required('description is required')
    .min(100, 'description be at least 100 characters long')
    .max(300, 'desciption be a  maximum 300 characters long'),
  link: yup.string().required(`add a link to view your profile `),
  salary: yup.string().required('Expected Salary is required'),
  location: yup.string().required('Location is required'),
})

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const [updateJob, { data, loading, error }] = useMutation(Update_Job)
  let candidate: any
  if (typeof window !== 'undefined') {
    candidate = JSON.parse(localStorage.getItem('data') as string)
  }

  const onSubmit = (data: any) => {
    updateJob({
      variables: {
        id: candidate?.loginCandidate?.id,
        qualification: data.qualification,
        salary: data.salary,
        link: data.link,
        description: data.description,
        location: data.location,
      },
    })
  }

  return (
    <>
      <div className="flex flex-col md:p-4 ml-4 mt-4 md:mt-0">
        <div className="">
          <h1 className=" text-xl md:text-xl text-[#01967b]">Update Profile</h1>
          <div className=" w-11/12 md:w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Highest Qualification
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    {...register('qualification')}
                    className="block w-full mt-1  text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-black-700 "
                  />
                  <p className="text-red-700">
                    {errors.qualification && errors.qualification.message}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Description Yourself
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Add a Github or relevant Link
                </label>
                <div className="flex text-sm flex-col items-start text-slate-700">
                  <input
                    type="text"
                    {...register('link')}
                    className="block w-full mt-1  text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-black-700 "
                  />
                  {errors.link && (
                    <p className="text-red-700">{errors.link.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Expected Salary
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    className="block w-full text-slate-900 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-black-700 "
                    {...register('salary')}
                  />

                  {errors.salary && (
                    <p className="text-red-700">{errors.salary.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Your Current Location
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    className="block w-full text-slate-900 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-black-700 "
                    {...register('location')}
                  />

                  {errors.location && (
                    <p className="text-red-700">{errors.location.message}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="w-full  px-2 py-1 md:px-4 md:py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#01967b]  rounded-md hover:text-slate-900 cursor focus:outline-none focus:bg-purple-600"
                >
                  Update Profile
                </button>
              </div>
            </form>
            <p className="text-red-700 text-center">
              {error ? error.message : ''}
            </p>
            <p className="text-green-700 text-center">
              {data ? 'Profile Updated.Refresh To See Changes' : ''}
            </p>
            <p className="text-center">{loading && <Loading></Loading>}</p>
          </div>
        </div>
      </div>
    </>
  )
}
