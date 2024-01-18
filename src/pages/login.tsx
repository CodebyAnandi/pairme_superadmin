'use client'
import React, { useState } from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/Section/FullScreen'
import LayoutGuest from '../layouts/Guest'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import Image from 'next/image'
import pairmeLogo from '../assets/img/pairmelogo.png'

import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import axiosInstance from '../apiInstances/axiosInstance'

export default function Error() {
  const router = useRouter()

  const initialValues = {
    email: '',
    password: '',
  }

  const [loginFields, setLoginFields] = useState({
    email: '',
    password: '',
  })

  const onChangeInput = (e) => {
    const value = e.target.value
    const name = e.target.name

    setLoginFields({
      ...loginFields,
      [name]: value,
    })
  }

  const mydata = {
    email: loginFields?.email,
    password: loginFields?.password,
  }

  const handleSubmit = async () => {
    await axiosInstance
      .post('admin/login', mydata)
      .then((res) => {
        const myData = res?.data
        console.log('=========myData', myData)
        if (myData?.status) {
          localStorage.setItem('Token', myData?.token)
          // localStorage.setItem('Role', myData?.data?.userData?.role)

          router.push('/dashboard')
          toast.success(myData?.message)
          // alert('Success')
        } else {
          // alert('Faild')
          toast.error(myData?.message)
        }
      })
      .catch((err) => {
        console.log('err --->', err)
      })
  }

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
      </Head>

      <SectionFullScreen bg="blue">
        <div className="flex items-center justify-center gap-3">
          <Image src={pairmeLogo} width={80} height={80} alt="One" className="" />
          <div>
            <h1 className="lg:text-6xl md:text-4xl font-bold tracking-wide">PairMe</h1>
          </div>
        </div>

        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik initialValues={initialValues} onSubmit={() => handleSubmit()}>
            <Form>
              {/* <FormField label="Login" help="Please enter your login">
                <Field name="login" />
              </FormField> */}

              {/* <FormField label="Password" help="Please enter your password">
                <Field name="password" type="password" />
              </FormField> */}

              {/* <div className="flex justify-between">
                <FormCheckRadio
                  type="checkbox"
                  label="Remember me"
                  className="text-[#22345C] font-medium"
                >
                  <Field type="checkbox" name="remember" />
                </FormCheckRadio>

                <p className="text-[#22345C] font-medium cursor-pointer">Forget Password ?</p>
              </div> */}

              {/* <Divider /> */}
              <div className="space-y-4 mx-3">
                <div className="space-y-2">
                  <div className="font-bold font-sans ">Email </div>
                  <input
                    className="rounded-md w-full py-3 "
                    type="text"
                    name="email"
                    placeholder="Please enter your email"
                    value={loginFields?.email}
                    onChange={onChangeInput}
                  />
                </div>

                <div className="space-y-2">
                  <div className="font-bold font-sans ">Password </div>
                  <input
                    className="rounded-md w-full py-3"
                    type="password"
                    name="password"
                    placeholder="Please enter your password"
                    value={loginFields?.password}
                    onChange={onChangeInput}
                  />
                </div>

                <div className="flex justify-center mt-16">
                  <button className="bg-gradient-to-r from-[#2E6FFF] to-[#6D9AFF]  mt-10 text-white text-lg font-bold py-2 px-4 rounded-full">
                    Login
                  </button>
                </div>
              </div>

              {/* <Buttons className="flex justify-center mt-16">
                <Button
                  type="submit"
                  label="Login"
                  className="bg-gradient-to-r from-[#2E6FFF] to-[#6D9AFF] text-white font-medium rounded-full text-lg tracking-wider"
                />
              </Buttons> */}
            </Form>
          </Formik>
        </CardBox>
        <ToastContainer />
      </SectionFullScreen>
    </>
  )
}

Error.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}
