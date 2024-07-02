
'use client'

import { mdiAccount, mdiArrowLeft } from '@mdi/js'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement, useState, useEffect } from 'react'
import CardBox from '../../../components/CardBox'
import LayoutAuthenticated from '../../../layouts/Authenticated'
import SectionMain from '../../../components/Section/Main'
import SectionTitleLineWithButton from '../../../components/Section/TitleLineWithButton'
import TableUserList from "../../../components/AddUser/AddUserData"
import UserIDWiseData from '../../../components/UserList/UserIDWiseData'
import { getPageTitle } from '../../../config'

import Button from '../../../components/Button'
import Buttons from '../../../components/Buttons'

// import axiosInstanceAuth from '../../../apiInstances/axiosInstanceAuth'
// import axiosInstance from '../../../apiInstances/axiosInstance'
// import axios from 'axios'

const UserList = () => {
  const router = useRouter()

  const [userConnectionLength, setUserConnectionLength] = useState([])
  console.log('🚀 ~ UserList ~ userLength:', userConnectionLength)
  // const getUserdata = async () => {
  //   const { id } = router.query;
  //   console.log("Fetching user data for ID:", id);
  
  //   if (!id) {
  //     console.error('No user ID found in router query.');
  //     return;
  //   }
  
  //   try {
  //     // Check if the user ID belongs to a deleted user
  //     const isDeletedUser = await axiosInstance.head(`http://localhost:3334/admin/getDeleteUserProfile/${id}`);
  //     console.log("Head request response:", isDeletedUser);
  
  //     if (isDeletedUser.status === 200) {
  //       // Fetch deleted user data
  //       const res = await axios({
  //         url: `http://localhost:3334/admin/getDeleteUserProfile/${id}`,
  //         method: "get"
  //       });
  //       const myData = res?.data;
  //       console.log('Deleted User Data:', myData);
  //       setUserConnectionLength(myData?.data?.connectedUser?.length || 0);
  //     } else {
  //       // Fetch active user data
  //       const res = await axiosInstanceAuth.get(`http://localhost:3334/admin/findUserData/${id}`);
  //       const myData = res?.data;
  //       console.log('Active User Data:', myData);
  //       setUserConnectionLength(myData?.data?.connectedUser?.length || 0);
  //     }
  //   } catch (err) {
  //     console.error('Error fetching user data:', err.response || err.message || err);
  //   }
  // };
  
  
  // // CompanyListData

  // useEffect(() => {
  //   getUserdata()
  // }, [])

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

       <CardBox className="mb-6" hasTable>
          <TableUserList/>
        </CardBox> 
      </SectionMain>
    </>
  )
}

UserList.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default UserList

 