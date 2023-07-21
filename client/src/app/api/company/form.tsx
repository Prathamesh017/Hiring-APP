'use client'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { jobs_category } from '@/app/components/Jobs'
import { Create_Job } from '@/app/graphql/mutation'
import { useMutation } from '@apollo/client'
import Loading from '../form/loadingSpinner'

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(4, 'Title must be at least 6 characters long'),
  category: yup.string().required(`Category is required`),
  description: yup
    .string()
    .required('Job Description is required')
    .min(100, 'Job Description be at least 100 characters long')
    .max(300, 'Job Desciption be a  maximum 300 characters long'),
  salary: yup.string().required('Salary is required'),
  location: yup.string().required('Location is required'),
})

export default function Form() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [createJob, { data, loading, error }] = useMutation(Create_Job)
  let companyData: any
  if (typeof window !== 'undefined') {
    companyData = JSON.parse(localStorage.getItem('data') as string)
  }

  const onSubmit = (data: any) => {
    createJob({
      variables: {
        companyId: companyData.loginCompany.id,
        title: data.title,
        description: data.description,
        category: data.category,
        salary: data.salary,
        location: data.location,
      },
    })
  }

  return (
    <>
      <div className="flex flex-col md:p-4 ml-4">
        <div className="">
          <h1 className=" text-xl md:text-xl text-[#01967b]">Post A New Job</h1>
          <div className=" w-11/12 md:w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Job Title
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    {...register('title')}
                    className="block w-full mt-1  text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-black-700 "
                  />
                  <p className="text-red-700">
                    {errors.title && errors.title.message}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Job Description
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
                  Category
                </label>
                <div className="flex text-sm flex-col items-start text-slate-700">
                  <select
                    {...register('category')}
                    onChange={(e) =>
                      setValue('category', e.target.value, {
                        shouldValidate: true,
                      })
                    }
                    className="border border-black-700 w-full"
                  >
                    {jobs_category.map((job, index) => {
                      return (
                        <option
                          className="text-slate-700"
                          value={job}
                          key={index}
                        >
                          {job}
                        </option>
                      )
                    })}
                  </select>
                  {errors.category && (
                    <p className="text-red-700">{errors.category.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Salary
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
                  Location
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
                  Post A Job
                </button>
              </div>
            </form>
            <p className="text-red-700 text-center">
              {error ? error.message : ''}
            </p>
            <p className="text-green-700 text-center">
              {data ? 'Job Posted Successfully' : ''}
            </p>
            <p className="text-center">{loading && <Loading></Loading>}</p>
          </div>
        </div>
      </div>
    </>
  )
}
