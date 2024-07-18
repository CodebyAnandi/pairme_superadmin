'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Button from '../../components/Button'
import { useSampleClients } from '../../hooks/sampleData'

import Image, { type StaticImageData } from 'next/image'
import pairme from '../../assets/img/boy.jpg'

import { FaHome } from 'react-icons/fa'
import { PiBuildingsBold } from 'react-icons/pi'
import { FaUserTie } from 'react-icons/fa'
import { GiSkills } from 'react-icons/gi'
import { BsDiagram3Fill } from 'react-icons/bs'
import { FaCircleUser, FaFileLines } from 'react-icons/fa6'
import { RiContactsFill } from 'react-icons/ri'
// import { PiFilesFill } from 'react-icons/pi'
import { LuFiles } from 'react-icons/lu'
import { IoMdClose } from 'react-icons/io'
import { mdiPencil } from '@mdi/js'
import axiosInstanceAuth from '../../apiInstances/axiosInstanceAuth'
import { BACKEND_BASE_URL } from '../../apiInstances/baseurl'

import Modal from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

// import Modals from 'react-modal'

// import vedioTest from "../../assets/vedio/sample.mp4";

// import pdf from "../../assets/vedio/P-005 Document Control.pdf"

const ZoomableMedia = ({ media, type, width, height }) => {
  const [open, setOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState(null)

  const onMediaClick = () => {
    setSelectedMedia(media)
    setOpen(true)
  }

  const onCloseModal = () => {
    setOpen(false)
  }

  return (
    <div>
      {type === 'image' ? (
        <Image
          src={`${media}`}
          alt="Zoomable Image"
          width={130}
          height={130}
          className="rounded-lg h-[85px] w-[135px]"
          onClick={onMediaClick}
        />
      ) : type === 'video' ? (
        <div onClick={onMediaClick} style={{ cursor: 'pointer' }}>
          <video className="rounded-lg h-[85px] w-[135px]" controls>
            <source
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${media}`}
              type={`video/${getFileType(media)}`}
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : type === 'gif' ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${media}`}
          alt="Zoomable GIF"
          width={width}
          height={height}
          className="rounded-lg h-[85px] w-[135px]"
          onClick={onMediaClick}
        />
      ) : null}

      <Modal open={open} onClose={onCloseModal} center>
        {type === 'image' || type === 'gif' ? (
          <Image
            width={0}
            height={0}
            src={`${media}`}
            alt="Zoomed In Image"
            className="h-[600px] w-[850px]"
          />
        ) : type === 'video' ? (
          <video className="h-[400px] w-[850px]" controls>
            <source src={`${media}`} type={`video/${getFileType(media)}`} />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </Modal>
    </div>
  )
}

// Function to get file type based on extension
const getFileType = (filename) => {
  if (!filename) return ''
  const extension = filename.split('.').pop()
  return extension.toLowerCase()
}

const UserIDWiseData = () => {
  const router = useRouter()
  const { clients } = useSampleClients()
  const [userData, setUserData] = useState<any>([])
  const [userAddress, setUserAddress] = useState<any>([])
  const [userBusinessAddress, setUserBusinessAddress] = useState<any>([])
  const [userProfessionalDetails, setUserProfessionalDetails] = useState<any>([])
  const [userYourself, setUserYourself] = useState<any>([])
  const [userLookingfor, setUserLookingfor] = useState<any>([])
  // const [userImage, setUserImage] = useState<any>([])
  const [userBio, setUserBio] = useState<any>([])
  const [userFile, setUserFile] = useState<any>([])
  const [userProfileImg, setUserProfileImg] = useState<any>([])
  console.log('🚀 ~ UserIDWiseData ~ userProfileImg:', userProfileImg)

  // const [userFiles, setUserFiles] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentFile, setCurrentFile] = useState('')

  const openModal = (fileKey) => {
    setCurrentFile(userFile[fileKey])
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [userMedia, setUserMedia] = useState([])

  const images = [
    pairme,
    pairme,
    pairme,
    pairme,
    pairme,
    pairme,
    // Add more images as needed
  ]

  // const onImageClick = (index) => {
  //   setSelectedImage(userImage[index])
  //   setOpen(true)
  // }

  // const onCloseModal = () => {
  //   setOpen(false)
  // }

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = clients.length / perPage

  const defaultImage =
    'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  // Get ID wise  User Show
  const getUserdata = async () => {
    const { id } = router.query
    // console.log('Fetching user data for ID:00000++>', id)

    if (!id) {
      console.error('No user ID found in router query.')
      return
    }

    try {
      // Check if the user ID belongs to a deleted user
      const res = await axiosInstanceAuth.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}admin/getDeleteUserProfile/${id}`
      )
      const myData = res?.data?.profile
      // console.log('User Data:--->', myData)

      const isDeleted = myData?.isDeleted
      

      if (isDeleted) {
        // Fetch deleted user data
        const res = await axiosInstanceAuth.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}admin/getDeleteUserProfile/${id}`
        )
        const myData = res.data
        
        setUserData(myData?.profile || [])
        setUserAddress(myData?.profile?.address || [])
        setUserBusinessAddress(myData?.profile?.businessaddress || [])
        setUserProfessionalDetails(myData?.profile?.professionalDetails || [])
        setUserYourself(myData?.profile?.yourself || [])
        setUserLookingfor(myData?.profile?.lookingfor || [])
        setUserProfileImg([
          myData?.profileData?.image?.photo_1 || '',
          myData?.profileData.image.photo_2 || '',
          myData.profileData.image.photo_3 || '',
          myData.profileData.image.photo_4 || '',
          myData.profileData.image.photo_5 || '',
          myData.profileData.image.photo_6 || '',
        ])
        setUserMedia([
          myData.profileData.image.photo_1 || '',
          myData.profileData.image.photo_2 || '',
          myData.profileData.image.photo_3 || '',
          myData.profileData.image.photo_4 || '',
          myData.profileData.image.photo_5 || '',
          myData.profileData.image.photo_6 || '',
        ])
        setUserBio(myData?.profileData)
        setUserFile({
          file_1: myData?.profileData?.file?.file_1,
          file_2: myData?.profileData?.file?.file_2,
          file_3: myData?.profileData?.file?.file_3,
        })
      } else {
        // Fetch active user data
        const res = await axiosInstanceAuth.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}admin/findUserData/${id}`
        )
        const myData = res?.data
        
        console.log('User Data:--->', myData)
        setUserData(myData?.data || [])
        // setUserProfileImg(myData?.profileData?.image || [] );
        setUserAddress(myData?.data?.address || [])
        setUserBusinessAddress(myData?.data?.businessaddress || [])
        setUserProfessionalDetails(myData?.data?.professionalDetails || [])
        setUserYourself(myData?.data?.yourself || [])
        setUserLookingfor(myData?.data?.lookingfor || [])
        setUserProfileImg([
          myData?.profileData.image.photo_1 || '',
          myData?.profileData.image.photo_2 || '',
          myData?.profileData.image.photo_3 || '',
          myData?.profileData.image.photo_4 || '',
          myData?.profileData.image.photo_5 || '',
          myData?.profileData.image.photo_6 || '',
        ])
        setUserMedia([
          myData.profileData.image.photo_1 || '',
          myData.profileData.image.photo_2 || '',
          myData.profileData.image.photo_3 || '',
          myData.profileData.image.photo_4 || '',
          myData.profileData.image.photo_5 || '',
          myData.profileData.image.photo_6 || '',
        ])
        setUserBio(myData?.profileData)
        setUserFile({
          file_1: myData?.profileData?.file?.file_1,
          file_2: myData?.profileData?.file?.file_2,
          file_3: myData?.profileData?.file?.file_3,
        })
      }
    } catch (err) {
      console.error('Error fetching user data:', err.response || err.message || err)
    }
  }
  
  // const [permissions, setPermissions] = useState([])
  // console.log('0-0-0-0->>.', permissions)

  console.log('-=-=--=-=-=-=-=>>>>', userProfessionalDetails)

  useEffect(() => {
    if (router.query.id) {
      getUserdata()
    }
  }, [router.query.id])


    const [formData, setFormData] = useState({
      permissions: {
        delete: userData?.permissions?.delete || false,
        update: userData?.permissions?.update || false,
        report: userData?.permissions?.report || false,
      },
    });
  
    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        permissions: {
          ...prevFormData.permissions,
          [name]: checked,
        },
      }));
    };
  
    const handleSave = async () => {
      try {
        const updatedPermissions = {
          permissions: formData.permissions,
        };
        const userId = userData._id; // Assuming userData contains the user's _id
  
        await axiosInstanceAuth.put(`/api/updateUserPermission/${userId}`, updatedPermissions);
  
        setIsModalOpen(false); // Close modal after successful update
      } catch (error) {
        console.error('Error updating user permissions:', error.response || error.message || error);
        // Handle error state or show error message to the user
      }
    };
  

  return (
    <>
      <div>
        <div className="rounded-lg p-5 shadow-lg">
          <div className="flex gap-8">
            <div>
              {/* <Image
                src={`${BACKEND_BASE_URL}${userData?.profileImage}`}
                // src={pairme}
                alt="companylogo"
                width={220}
                height={220}
                className="rounded-lg"
              /> */}
              <Image
                // src={`${BACKEND_BASE_URL}${userData?.profileImage}`}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${userData?.profileImage}`}
                alt="user profile"
                width={220}
                height={220}
                className="rounded-lg"
                onError={(e) => {
                  e.target.onerror = null // Prevent infinite loops in case the default image also fails to load
                  e.target.src = defaultImage // Set default image path here
                }}
              />
            </div>

            <table className="shadow-xl rounded-lg">
              <tbody>
                <>
                  <tr>
                    <td data-label="FullName" className="font-bold ">
                      Full Name
                    </td>
                    <td data-label="FullName" className="capitalize">
                      {userData.name}
                    </td>
                  </tr>
                  <tr>
                    <td data-label="Email" className="font-bold">
                      Email
                    </td>
                    <td data-label="Email">{userData.email}</td>
                  </tr>
                  <tr>
                    <td data-label="DOB" className="font-bold">
                      Data Of Birth
                    </td>
                    <td data-label="DOB">{userData.dateOfBirth}</td>
                  </tr>
                  <tr>
                    <td data-label="Phone" className="font-bold">
                      Phone Number
                    </td>
                    <td data-label="Phone">{userData.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td data-label="Gender" className="font-bold">
                      Gender
                    </td>
                    <td data-label="Gender">{userData.gender}</td>
                  </tr>
                </>
              </tbody>
            </table>
          </div>
        </div>
        {/* )} */}
      </div>

    {userProfileImg && userProfileImg.length > 0 ? (<div className="rounded-lg p-5 shadow-lg mt-5">
        <div>
          <div className="text-xl font-bold mb-2 flex gap-2 items-center">
            <FaCircleUser />
            Profile
          </div>
          <div className="grid md:grid-cols-5 grid-cols-3 2xl:gap-5  gap-8 w-full">
            {userProfileImg.map((media, index) => {
              // console.log('🚀 ~ {userProfileImg.map ~ media:', media)
              return (
                <ZoomableMedia
                  key={index}
                  media={`${process.env.NEXT_PUBLIC_BASE_URL}${media}`}
                  type={
                    media.includes('.jpg') ||
                    media.includes('.png') ||
                    media.includes('.webp') ||
                    media.includes('.jpeg') ||
                    media.includes('.gif')
                      ? 'image'
                      : media.includes('.mp4')
                      ? 'video'
                      : media.includes('.gif')
                      ? 'gif'
                      : 'unknown'
                  }
                  width={130} // Set your desired width for images and videos
                  height={130} //
                />
              )
            })}
          </div>
        </div>
      </div>) : null}
      

      <div>
        {userData?.role === 'sub_admin' ? (
          <div className="rounded-lg p-5 shadow-lg mt-5">
            <div className="mt-5 flex justify-between items-center">
              <div className="text-xl font-bold mb-2 flex gap-2 items-center">
                <RiContactsFill /> Permissions
              </div>
              <Button
                className="flex items-center bg-[#FFFFFF] rounded-full p-2 text-xl font-bold"
                icon={mdiPencil}
                onClick={() => setIsModalOpen(true)} // Directly open edit modal
              >
                <span className="ml-2">Edit</span>
              </Button>
            </div>
            <div>
              <ul className="list-disc ml-5">
                <li className="flex items-center">
                  <input
                    type="checkbox"
                    checked={userData?.permissions?.delete || false}
                    readOnly
                    className="mr-2"
                  />
                  Delete
                </li>
                <li className="flex items-center">
                  <input
                    type="checkbox"
                    checked={userData?.permissions?.update || false}
                    readOnly
                    className="mr-2"
                  />
                  Update
                </li>
                <li className="flex items-center">
                  <input
                    type="checkbox"
                    checked={userData?.permissions?.report || false}
                    readOnly
                    className="mr-2"
                  />
                  Report
                </li>
              </ul>
            </div>
          </div>
        ) : null}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Edit Permissions</h2>
              <div>
                <ul className="list-disc ml-5">
                  <li className="flex items-center">
                    <input
                      type="checkbox"
                      name="delete"
                      // checked={userData?.permissions?.delete || false}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Delete
                  </li>
                  <li className="flex items-center">
                    <input
                      type="checkbox"
                      name="update"
                      // checked={userData?.permissions?.update || false}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Update
                  </li>
                  <li className="flex items-center">
                    <input
                      type="checkbox"
                      name="report"
                      // checked={userData?.permissions?.report || false}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Report
                  </li>
                </ul>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {userBio && userBio?.bio?.length > 0 ? (
        <div className="rounded-lg p-5 shadow-lg mt-5">
          <div>
            <div className="text-xl font-bold mb-2 flex gap-2 items-center">
              <RiContactsFill /> Bio
            </div>

            <div>
              <ul className="list-disc flex ml-5">
                <li className="flex-grow text-justify">{userBio?.bio}</li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      {userFile && userFile?.file_1?.length > 0 ? (
        <div className="rounded-lg p-5 shadow-lg mt-5">
          <div>
            <div className="text-xl font-bold mb-2 flex gap-2 items-center">
              <LuFiles /> File
            </div>

            {Object.keys(userFile).length > 0 && (
              <table className="shadow-xl rounded-lg">
                <tbody>
                  {Object.keys(userFile)
                    .filter((fileKey) => userFile[fileKey] !== undefined) // Filter out files that don't exist
                    .map((fileKey) => (
                      <tr key={fileKey}>
                        <td data-label="File Name" className="">
                          {userFile[fileKey]?.slice(27)?.split('.')[0]}
                        </td>
                        <td>
                          <button
                            onClick={() => openModal(fileKey)}
                            className="bg-blue-500 text-white rounded px-3 py-2 flex items-center gap-2"
                          >
                            <FaFileLines />
                            {`Open`}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}

            {isModalOpen && (
              <div className="modal-overlay mt-5">
                <div className="flex justify-end mb-2">
                  <button
                    className="bg-gray-200 text-black rounded px-3 py-2 flex items-end gap-2"
                    onClick={closeModal}
                  >
                    <IoMdClose className="text-black" size={22} />
                  </button>
                </div>

                <div className="modal">
                  <iframe
                    title="PDF Viewer"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${currentFile}`}
                    width="100%"
                    height="800px"
                    frameBorder="0"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {userAddress && userAddress?.address?.length > 0 ? (
        <div className="rounded-lg p-5 shadow-lg mt-5">
          <div>
            <div className="text-xl font-bold mb-2 flex gap-2 items-center">
              <FaHome />
              Address
            </div>

            <table className="shadow-xl rounded-lg">
              <tbody>
                <>
                  <tr>
                    <td className="font-bold ">Address</td>
                    <td className="capitalize">{userAddress?.address}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Country</td>
                    <td>{userAddress?.country}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">State</td>
                    <td>{userAddress?.state}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">City</td>
                    <td>{userAddress?.city}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Zip Code</td>
                    <td>{userAddress?.zipCode}</td>
                  </tr>
                </>
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {userBusinessAddress && userBusinessAddress?.address?.length > 0? (
        <div className="rounded-lg p-5 shadow-lg mt-5">
          <div>
            <div className="text-xl font-bold mb-2 flex gap-2 items-center">
              <PiBuildingsBold />
              Business Address
            </div>

            <table className="shadow-xl rounded-lg">
              <tbody>
                <>
                  <tr>
                    <td className="font-bold ">Address</td>
                    <td className="capitalize">{userBusinessAddress.address}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Country</td>
                    <td>{userBusinessAddress.country}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">State</td>
                    <td>{userBusinessAddress.state}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">City</td>
                    <td>{userBusinessAddress.city}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Zip Code</td>
                    <td>{userBusinessAddress.zipCode}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Start Date</td>
                    <td>{userBusinessAddress.start_date}</td>
                  </tr>
                </>
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {userProfessionalDetails && userProfessionalDetails?.company_name?.length > 0 ? (
        <div className="rounded-lg p-5 shadow-lg mt-5">
          <div>
            <div className="text-xl font-bold mb-2 flex gap-2 items-center">
              <FaUserTie />
              Professional Details
            </div>

            <table className="shadow-xl rounded-lg">
              <tbody>
                <>
                  <tr>
                    <td className="font-bold ">Company Name</td>
                    <td className="capitalize">{userProfessionalDetails.company_name}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Role</td>
                    <td>{userProfessionalDetails.add_role}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Company Domain</td>
                    <td>{userProfessionalDetails.company_domain}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Email</td>
                    <td>{userProfessionalDetails.email}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Category</td>
                    <td>{userProfessionalDetails.category}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Business Experience</td>
                    <td>{userProfessionalDetails.business_experience}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Skills</td>
                    <td>{userProfessionalDetails.skills}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Education</td>
                    <td>{userProfessionalDetails.education}</td>
                  </tr>
                </>
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {userYourself && userYourself.length > 0 ? (
        <div className="rounded-lg p-5 shadow-lg mt-5">
          <div>
            <div className="text-xl font-bold mb-2 flex gap-2 items-center">
              <GiSkills />
              Best Describe Yourself
            </div>

            <div className="grid grid-cols-0  gap-4 mx-5">
              <ul className="list-disc">
                {userYourself.map((item, index) => (
                  <li key={index} className="flex-grow">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      {userLookingfor && userLookingfor.length > 0? (
        <div className="rounded-lg p-5 shadow-lg mt-5">
          <div>
            <div className="text-xl font-bold mb-2 flex gap-2 items-center">
              <BsDiagram3Fill />
              Looking To Connect With
            </div>

            <div className="grid grid-cols-1  gap-4 mx-5">
              <ul className="list-disc ">
                {userLookingfor.map((item, index) => (
                  <li key={index} className="flex-grow">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default UserIDWiseData
