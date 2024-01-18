'use client'

import { mdiAccount, mdiArrowLeft } from '@mdi/js'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement, useState, useEffect } from 'react'
import CardBox from '../../../components/CardBox'
import LayoutAuthenticated from '../../../layouts/Authenticated'
import SectionMain from '../../../components/Section/Main'
import SectionTitleLineWithButton from '../../../components/Section/TitleLineWithButton'

import UserIDWiseData from '../../../components/UserList/UserIDWiseData'
import { getPageTitle } from '../../../config'

import Button from '../../../components/Button'
import Buttons from '../../../components/Buttons'

import axiosInstanceAuth from '../../../apiInstances/axiosInstanceAuth'

const UserList = () => {
  const router = useRouter()

  const [userConnectionLength, setUserConnectionLength] = useState([])
  console.log('🚀 ~ UserList ~ userLength:', userConnectionLength)

  const getUserdata = async () => {
    const { id } = router.query
    await axiosInstanceAuth
      .get(`admin/findUserData/${id}`)
      .then((res) => {
        const myData = res?.data
        setUserConnectionLength(myData?.data?.connectedUser?.length || 0)

        console.log('ConnectionLength--->', myData?.data?.connectedUser?.length)
      })
      .catch((err) => {
        console.log('err --->', err)
      })
  }

  // CompanyListData

  useEffect(() => {
    getUserdata()
  }, [])

  const handleBackAction = () => {
    router.push(`/adduser`)
  }

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccount} title="User List" main>
          {/* <div className="text-3xl ml-5">{userLength}</div> */}
          <div className="flex justify-end ">
            <div className="text-2xl">Connection</div>
            <div className="rounded-full h-8 w-8 flex items-center justify-center bg-[#FFFFFF] font-bold text-xl ml-2 p-5">
              {userConnectionLength}
            </div>
          </div>
        </SectionTitleLineWithButton>

        <div onClick={handleBackAction}>
          <Buttons className="mb-3">
            <Button type="submit" label="Back" icon={mdiArrowLeft} className="rounded-lg" />
          </Buttons>
        </div>

        <CardBox className="mb-6">
          <UserIDWiseData />
        </CardBox>

        {/* <CardBox className="mb-6" hasTable>
          <TableUserList allUser={allUser} />
        </CardBox> */}
      </SectionMain>
    </>
  )
}

UserList.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default UserList
