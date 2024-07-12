'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

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
            <source src={`${process.env.NEXT_PUBLIC_BASE_URL}${media}`} type={`video/${getFileType(media)}`} />
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
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectedMedia}`}
            alt="Zoomed In Image"
            className='h-[600px] w-[850px]'
          />
        ) : type === 'video' ? (
          <video className="h-[400px] w-[850px]" controls>
            <source
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${selectedMedia}`}
              type={`video/${getFileType(selectedMedia)}`}
            />
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
  console.log("🚀 ~ UserIDWiseData ~ userProfileImg:", userProfileImg)
  

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

  const defaultImage = 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  // Get ID wise  User Show
  const getUserdata = async () => {
    const { id } = router.query;
    console.log("Fetching user data for ID:00000++>", id);
  
    if (!id) {
      console.error('No user ID found in router query.');
      return;
    }
  
    try {
      // Check if the user ID belongs to a deleted user
      const res = await axiosInstanceAuth.get(`${process.env.NEXT_PUBLIC_BASE_URL}admin/getDeleteUserProfile/${id}`);
      const myData = res.data.profile;
      console.log('User Data:--->', myData);

      const isDeleted = myData?.isDeleted;
  
      if (isDeleted) {
        // Fetch deleted user data
        const res = await axiosInstanceAuth.get(`${process.env.NEXT_PUBLIC_BASE_URL}admin/getDeleteUserProfile/${id}`);
        const myData = res.data;
        console.log("🚀 ~ getUserdata ~ myData-=--=>>>:", myData)
        setUserData(myData?.profile || []);
        setUserAddress(myData?.profile?.address || []);
        setUserBusinessAddress(myData?.profile?.businessaddress || []);
        setUserProfessionalDetails(myData?.profile?.professionalDetails || []);
        setUserYourself(myData?.profile?.yourself || []);
        setUserLookingfor(myData?.profile?.lookingfor || []);
        setUserProfileImg([
          myData.profileData.image.photo_1 || '',
          myData.profileData.image.photo_2 || '',
          myData.profileData.image.photo_3 || '',
          myData.profileData.image.photo_4 || '',
          myData.profileData.image.photo_5 || '',
          myData.profileData.image.photo_6 || '',
        ]);
        setUserMedia([
          myData.profileData.image.photo_1 || '',
          myData.profileData.image.photo_2 || '',
          myData.profileData.image.photo_3 || '',
          myData.profileData.image.photo_4 || '',
          myData.profileData.image.photo_5 || '',
          myData.profileData.image.photo_6 || '',
        ]);
        setUserBio(myData?.profileData);
        setUserFile({
          file_1: myData?.profileData?.file?.file_1,
          file_2: myData?.profileData?.file?.file_2,
          file_3: myData?.profileData?.file?.file_3,
        });
      } else {
        // Fetch active user data
        const res = await axiosInstanceAuth.get(`${process.env.NEXT_PUBLIC_BASE_URL}admin/findUserData/${id}`);
        const myData = res?.data;
        console.log('User Data:--->', myData);
        setUserData(myData?.data || []);
        // setUserProfileImg(myData?.profileData?.image || [] );
        setUserAddress(myData?.data?.address || []);
        setUserBusinessAddress(myData?.data?.businessaddress || []);
        setUserProfessionalDetails(myData?.data?.professionalDetails || []);
        setUserYourself(myData?.data?.yourself || []);
        setUserLookingfor(myData?.data?.lookingfor || []);
        setUserProfileImg([
          myData.profileData.image.photo_1 || '',
          myData.profileData.image.photo_2 || '',
          myData.profileData.image.photo_3 || '',
          myData.profileData.image.photo_4 || '',
          myData.profileData.image.photo_5 || '',
          myData.profileData.image.photo_6 || '',
        ]);
        setUserMedia([
          myData.profileData.image.photo_1 || '',
          myData.profileData.image.photo_2 || '',
          myData.profileData.image.photo_3 || '',
          myData.profileData.image.photo_4 || '',
          myData.profileData.image.photo_5 || '',
          myData.profileData.image.photo_6 || '',
        ]);
        setUserBio(myData?.profileData);
        setUserFile({
          file_1: myData?.profileData?.file?.file_1,
          file_2: myData?.profileData?.file?.file_2,
          file_3: myData?.profileData?.file?.file_3,
        });
      }
    } catch (err) {
      console.error('Error fetching user data:', err.response || err.message || err);
    }
  };
  
  useEffect(() => {
    if (router.query.id) {
      getUserdata();
    }
  }, [router.query.id]);



  return (
    <>
      {/* <div className="flex gap-10">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="companylogo"
            width={100}
            height={100}
            className="rounded-lg"
            onClick={() => onImageClick(index)}
          />
        ))}

        <Modal open={open} onClose={onCloseModal} center>
          <Image src={selectedImage} alt="Zoomed In Image" />
        </Modal>
      </div> */}
      {/* <div className="rounded-lg p-5 shadow-lg mt-5">
        <div>
          <div className="text-xl font-bold mb-2 flex gap-2 items-center">
            <FaCircleUser />
            Profile
          </div>
          <div className="flex gap-10 w-[500%] ">
            {userMedia.map((media, index) => (
              <ZoomableMedia
                key={index}
                media={media}
                type={
                  media.includes('.jpg') || media.includes('.png') || media.includes('.webp')
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
            ))}
          </div>
        </div>
      </div> */}
      {/* ==================================  */}

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
          e.target.onerror = null; // Prevent infinite loops in case the default image also fails to load
          e.target.src = defaultImage; // Set default image path here
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

      {/* Profile code  */}
      {/* <div className="rounded-lg p-5 shadow-lg mt-5">
        <div>
          <div className="text-xl font-bold mb-2 flex gap-2 items-center">
            <FaCircleUser />
            Profile
          </div>
          <div className="flex gap-10">
            {userImage.map((image, index) =>
              image ? (
                <Image
                  key={index}
                  src={`${BACKEND_BASE_URL}${image}`}
                  alt={`profile-${index}`}
                  width={100} // Set the width property
                  height={100} // Set the height property
                  className="rounded-lg"
                  onClick={() => onImageClick(index)}
                />
              ) : null
            )}

            <Modal open={open} onClose={onCloseModal} center>
              <Image
                src={`${BACKEND_BASE_URL}${selectedImage}`}
                alt="Zoomed In Image"
                width={600}
                height={600}
              />
            </Modal>
          </div>
        </div>
      </div> */}

      <div className="rounded-lg p-5 shadow-lg mt-5">
        <div>
          <div className="text-xl font-bold mb-2 flex gap-2 items-center">
            <FaCircleUser />
            Profile
          </div>
          <div className="flex gap-10 w-[500%] ">
            {userProfileImg.map((media, index) => {
              console.log("🚀 ~ {userProfileImg.map ~ media:", media)
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
      </div>

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

      {/* <div className="rounded-lg p-5 shadow-lg mt-5">
        <div>
          <div className="text-xl font-bold mb-2 flex gap-2 items-center">
            <LuFiles /> File
          </div>

          <table className="shadow-xl rounded-lg">
            <tbody>
              {Object.keys(userFile).map((fileKey) => (
                <tr key={fileKey}>
                  <td data-label="FullName" className="">
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
                  src={`${BACKEND_BASE_URL}${currentFile}`}
                  width="100%"
                  height="800px"
                  frameBorder="0"
                />
              </div>
            </div>
          )}
        </div>
      </div> */}

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

      
      <div className="rounded-lg p-5 shadow-lg mt-5">
        <div>
          <div className="text-xl font-bold mb-2 flex gap-2 items-center">
            <FaHome />
            Address
          </div>

          {/* <table className="shadow-xl rounded-lg">
            <thead>
              <tr>
                <th className="whitespace-nowrap">Address</th>
                <th className="whitespace-nowrap">Country</th>
                <th className="whitespace-nowrap">State</th>
                <th className="whitespace-nowrap">City</th>
                <th className="whitespace-nowrap">Zip Code</th>
              </tr>
            </thead>
            <tbody>
              <>
                <tr>
                  <td data-label="Address">{userAddress?.address}</td>
                  <td data-label="Country">{userAddress?.country}</td>
                  <td data-label="State">{userAddress?.state}</td>
                  <td data-label="City">{userAddress?.city}</td>
                  <td data-label="ZipCode">{userAddress?.zipCode}</td>
                </tr>
              </>
            </tbody>
          </table> */}

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

      <div className="rounded-lg p-5 shadow-lg mt-5">
        <div>
          <div className="text-xl font-bold mb-2 flex gap-2 items-center">
            <PiBuildingsBold />
            Business Address
          </div>

          {/* <table className="shadow-xl rounded-lg">
            <thead>
              <tr>
                <th className="whitespace-nowrap">Address</th>
                <th className="whitespace-nowrap">Country</th>
                <th className="whitespace-nowrap">State</th>
                <th className="whitespace-nowrap">City</th>
                <th className="whitespace-nowrap">Zip Code</th>
                <th className="whitespace-nowrap">Start Date</th>
              </tr>
            </thead>
            <tbody>
              <>
                <tr>
                  <td data-label="Address">{userBusinessAddress.address}</td>
                  <td data-label="Country">{userBusinessAddress.country}</td>
                  <td data-label="State">{userBusinessAddress.state}</td>
                  <td data-label="City">{userBusinessAddress.city}</td>
                  <td data-label="ZipCode">{userBusinessAddress.zipCode}</td>
                  <td data-label="startdate">{userBusinessAddress.startdate}</td>
                </tr>
              </>
            </tbody>
          </table> */}

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

      <div className="rounded-lg p-5 shadow-lg mt-5">
        <div>
          <div className="text-xl font-bold mb-2 flex gap-2 items-center">
            <FaUserTie />
            Professional Details
          </div>

          {/* <table className="shadow-xl rounded-lg">
            <thead>
              <tr>
                <th className="whitespace-nowrap">Company Name</th>
                <th className="whitespace-nowrap">Role</th>
                <th className="whitespace-nowrap">Company Domain</th>
                <th className="whitespace-nowrap">Email</th>
                <th className="whitespace-nowrap">Category</th>
                <th className="whitespace-nowrap">Business Experience</th>
                <th className="whitespace-nowrap">Skills</th>
                <th className="whitespace-nowrap">Education</th>
              </tr>
            </thead>
            <tbody>
              <>
                <tr>
                  <td data-label="CompanyName">{userProfessionalDetails.company_name}</td>
                  <td data-label="Role">{userProfessionalDetails.add_role}</td>
                  <td data-label="CompanyDomain">{userProfessionalDetails.company_domain}</td>
                  <td data-label="Email">{userProfessionalDetails.email}</td>
                  <td data-label="Category">{userProfessionalDetails.category}</td>
                  <td data-label="BusinessExperience">
                    {userProfessionalDetails.business_experience}
                  </td>
                  <td data-label="Skills">{userProfessionalDetails.skills}</td>
                  <td data-label="Education">{userProfessionalDetails.education}</td>
                </tr>
              </>
            </tbody>
          </table> */}

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

      <div className="rounded-lg p-5 shadow-lg mt-5">
        <div>
          <div className="text-xl font-bold mb-2 flex gap-2 items-center">
            <GiSkills />
            Best Describe Yourself
          </div>

          <div className="grid grid-cols-1  gap-4 mx-5">
            <ul className="list-disc flex">
              {userYourself.map((item, index) => (
                <li key={index} className="flex-grow">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-lg p-5 shadow-lg mt-5">
        <div>
          <div className="text-xl font-bold mb-2 flex gap-2 items-center">
            <BsDiagram3Fill />
            Looking To Connect With
          </div>

          <div className="grid grid-cols-1  gap-4 mx-5">
            <ul className="list-disc flex">
              {userLookingfor.map((item, index) => (
                <li key={index} className="flex-grow">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserIDWiseData
