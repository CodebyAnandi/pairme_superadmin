import React, { useState, useEffect } from 'react'
import { mdiEye, mdiTrashCan, mdiPencilOutline, mdiPencil } from '@mdi/js'
import { useRouter } from 'next/router'

import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'

import axiosInstanceAuth from '../../apiInstances/axiosInstanceAuth'


const TableAddUser = ({ searchUser }) => {
  const router = useRouter()

  const perPage = 10

  const [allUser, setAllUser] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = allUser?.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = allUser.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  // Get All Admin Show
  const getAdmindata = async () => {
    await axiosInstanceAuth
      .get('admin/user_data')
      .then((res) => {
        const myData = res?.data
        setAllUser(myData?.data || [])
        // setFiltred(myData?.data)
        console.log('AdminData---->', myData)
      })
      .catch((err) => {
        console.log('err --->', err)
      })
  }

  useEffect(() => {
    getAdmindata()
  }, [])

  const handleClickEye = async (id) => {
    router.push(`userlist/${id}`)
  }

  return (
    <>
      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <CardBoxModal
        title="Add User"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Date of Birth</th>
            <th className="whitespace-nowrap">Phone Number</th>
            <th>Gender</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {clientsPaginated?.length > 0 &&
            clientsPaginated
              ?.filter((e) => {
                const searchTerm = searchUser.toLowerCase()
                return (
                  searchTerm === '' ||
                  e.name.toLowerCase().includes(searchTerm) ||
                  e.email.toLowerCase().includes(searchTerm) ||
                  e.dateOfBirth.toLowerCase().includes(searchTerm) ||
                  e.gender.toLowerCase().includes(searchTerm) ||
                  (e.phoneNumber && e.phoneNumber.toString().toLowerCase().includes(searchTerm))
                )
              })
              .map((d, index) => (
                <tr key={index}>
                  <td data-label="Name">{d.name}</td>
                  <td data-label="Email">{d.email}</td>
                  <td data-label="Dob">{d.dateOfBirth}</td>
                  <td data-label="Phone" className="whitespace-nowrap">
                    {d.phoneNumber}
                  </td>
                  <td data-label="Gender">{d.gender}</td>

                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <Buttons type="justify-center " noWrap>
                      <Button
                        color="info"
                        icon={mdiEye}
                        // onClick={() => setIsModalInfoActive(true)}
                        onClick={() => handleClickEye(d?._id)}
                        small
                      />
                      {/* <Button
                        color="danger"
                        icon={mdiTrashCan}
                        onClick={() => setIsModalTrashActive(true)}
                        small
                      /> */}
                    </Buttons>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          {/* <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small> */}
        </div>
      </div>
    </>
  )
}

export default TableAddUser
