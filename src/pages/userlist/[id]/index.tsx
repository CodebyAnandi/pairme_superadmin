// 'use client'

// import { mdiAccount, mdiArrowLeft, mdiPencil } from '@mdi/js'
// import Head from 'next/head'
// import { useRouter } from 'next/router'
// import React, { useState, useEffect } from 'react'
// import CardBox from '../../../components/CardBox'
// import LayoutAuthenticated from '../../../layouts/Authenticated'
// import SectionMain from '../../../components/Section/Main'
// import SectionTitleLineWithButton from '../../../components/Section/TitleLineWithButton'
// import TableUserList from "../../../components/AddUser/AddUserData"
// import UserIDWiseData from '../../../components/UserList/UserIDWiseData'
// import { getPageTitle } from '../../../config'
// import Button from '../../../components/Button'
// import Buttons from '../../../components/Buttons'
// import EditUserForm from '../../../components/EditUserForm/EditUserForm' // Corrected import path
// import Modal from 'react-responsive-modal'
// import 'react-responsive-modal/styles.css' // Import the modal component if not already imported
// import axiosInstanceAuth from '../../../apiInstances/axiosInstanceAuth'

// const UserList = () => {
//   const router = useRouter()
//   const { id } = router.query
//   console.log('Fetching user data for ID:00000++>', id)

//   const [isEditing, setIsEditing] = useState(false)
//   const [currentUser, setCurrentUser] = useState(null)
//   console.log("currentUser",currentUser)

//   // useEffect(() => {
//   //   const fetchUserData = async () => {
//   //     if (id) {
//   //       try {
//   //         // Fetch user data based on ID
//   //         const res = await axiosInstanceAuth.get(
//   //           `${process.env.NEXT_PUBLIC_BASE_URL}admin/getDeleteUserProfile/${id}`
//   //         );
//   //         let userData = res.data;
//   //         console.log("---->>>1111", userData);
    
//   //         // Check if userData is valid
//   //         if (!userData || Object.keys(userData).length === 0 || !userData.profile) {
//   //           try {
//   //             // Fetch user data based on ID
//   //             const secondRes = await axiosInstanceAuth.get(
//   //               `${process.env.NEXT_PUBLIC_BASE_URL}admin/findUserData/${id}`
//   //             );
//   //             userData = secondRes.data;
//   //             console.log("---->>>2222", userData);
//   //             setCurrentUser(userData?.data); // Set current user data
//   //           } catch (err) {
//   //             console.error('Error fetching user data:', err.response || err.message || err);
//   //           }
//   //         } else {
//   //           setCurrentUser(userData.profile); // Set current user data
//   //         }
    
//   //         console.log("---->>> final userData", userData);
//   //       } catch (err) {
//   //         console.error('Error fetching user data:', err.response || err.message || err);
//   //       }
//   //     }
//   //   };
    
//   //   fetchUserData();
//   // }, [id]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (id) {
//         try {
//           // Fetch user data based on ID
//           const res = await axiosInstanceAuth.get(
//             `${process.env.NEXT_PUBLIC_BASE_URL}admin/findUserData/${id}`
//           );
//           const userData = res.data;
//           console.log("---->>>2222", userData);
//           setCurrentUser(userData?.data); // Set current user data
//         } catch (err) {
//           console.error('Error fetching user data:', err.response || err.message || err);
//         }
//       }
//     };
  
//     fetchUserData();
//   }, [id]);
  
  
//   const handleBackAction = () => {
//     router.push(`/adduser`)
//   }

//   const handleSave = (updatedUser) => {
//     // Handle save logic here (e.g., update user data via API)
//     console.log('Updated User Data:', updatedUser)
//     setIsEditing(false) // Close modal after saving
//   }

//   const handleCancel = () => {
//     setIsEditing(false) // Close modal on cancel
//   }

//   return (
//     <>
//       <Head>
//         <title>{getPageTitle()}</title>
//       </Head>

//       <SectionMain>
//         <SectionTitleLineWithButton icon={mdiAccount} title="User Details" main>
//           <div className="flex justify-end items-center">
//             <Button className="flex items-center bg-[#FFFFFF] rounded-full p-2 text-xl font-bold"
//               icon={mdiPencil}
//               onClick={() => setIsEditing(true)} // Directly open edit modal
//             >
//               <span className="ml-2">Edit</span>
//             </Button>
//           </div>
//         </SectionTitleLineWithButton>

//         <div onClick={handleBackAction}>
//           <Buttons className="mb-3">
//             <Button type="submit" label="Back" icon={mdiArrowLeft} className="rounded-lg" />
//           </Buttons>
//         </div>

//         <CardBox className="mb-6">
//           <UserIDWiseData />
//         </CardBox>

//         <CardBox className="mb-6" hasTable>
//           <TableUserList />
//         </CardBox>

//         <Modal open={isEditing} onClose={handleCancel} center>
//           <EditUserForm user={currentUser} onSave={handleSave} onCancel={handleCancel} />
//         </Modal>
//       </SectionMain>
//     </>
//   )
// }

// UserList.getLayout = function getLayout(page) {
//   return <LayoutAuthenticated>{page}</LayoutAuthenticated>
// }

// export default UserList

'use client'

import { mdiAccount, mdiArrowLeft, mdiPencil } from '@mdi/js'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import CardBox from '../../../components/CardBox'
import LayoutAuthenticated from '../../../layouts/Authenticated'
import SectionMain from '../../../components/Section/Main'
import SectionTitleLineWithButton from '../../../components/Section/TitleLineWithButton'
import TableUserList from "../../../components/AddUser/AddUserData"
import UserIDWiseData from '../../../components/UserList/UserIDWiseData'
import { getPageTitle } from '../../../config'
import Button from '../../../components/Button'
import Buttons from '../../../components/Buttons'
import EditUserForm from '../../../components/EditUserForm/EditUserForm' // Corrected import path
import Modal from 'react-responsive-modal'
import 'react-responsive-modal/styles.css' // Import the modal component if not already imported
import axiosInstanceAuth from '../../../apiInstances/axiosInstanceAuth'

const UserList = () => {
  const router = useRouter()
  const { id } = router.query
  console.log('Fetching user data for ID:00000++>', id)

  const [isEditing, setIsEditing] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  console.log("currentUser", currentUser)

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          // Fetch user data based on ID
          const res = await axiosInstanceAuth.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}admin/findUserData/${id}`
          )
          const userData = res.data
          console.log("---->>>2222", userData)
          setCurrentUser(userData?.data) // Set current user data
        } catch (err) {
          console.error('Error fetching user data:', err.response || err.message || err)
        }
      }
    }

    fetchUserData()
  }, [id])

  const handleBackAction = () => {
    router.push(`/adduser`)
  }

  const handleSave = (updatedUser) => {
    // Handle save logic here (e.g., update user data via API)
    console.log('Updated User Data:', updatedUser)
    setIsEditing(false) // Close modal after saving
  }

  const handleCancel = () => {
    setIsEditing(false) // Close modal on cancel
  }

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccount} title="User Details" main>
          <div className="flex justify-end items-center">
            {currentUser && !currentUser.isDeleted && (currentUser.role === 'user' || currentUser.role === 'sub_admin') && (
              <Button className="flex items-center bg-[#FFFFFF] rounded-full p-2 text-xl font-bold"
                icon={mdiPencil}
                onClick={() => setIsEditing(true)} // Directly open edit modal
              >
                <span className="ml-2">Edit</span>
              </Button>
            )}
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
          <TableUserList />
        </CardBox>

        <Modal open={isEditing} onClose={handleCancel} center>
          <EditUserForm user={currentUser} onSave={handleSave} onCancel={handleCancel} />
        </Modal>
      </SectionMain>
    </>
  )
}

UserList.getLayout = function getLayout(page) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default UserList
