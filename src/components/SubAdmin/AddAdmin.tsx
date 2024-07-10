import React, { useState, useEffect } from 'react'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import { useRouter } from 'next/router'

import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'

import axiosInstanceAuth from '../../apiInstances/axiosInstanceAuth'

const AddAdmin = ({ searchUser = '' }) => {
  // Provide default value for searchUser
  const router = useRouter()

  const perPage = 10

  const [allUser, setAllUser] = useState([])
  console.log('🚀 ~ TableAddUser ~ allUser:', allUser)
  const [deletedUsers, setDeletedUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isModalAddUserActive, setIsModalAddUserActive] = useState(false)
  const [showDeleteUsers, setShowDeleteUsers] = useState(false)

  const clientsPaginated = (showDeleteUsers ? deletedUsers : allUser)?.slice(
    perPage * currentPage,
    perPage * (currentPage + 1)
  )

  const numPages = Math.ceil((showDeleteUsers ? deletedUsers : allUser).length / perPage)

  const pagesList = Array.from({ length: numPages }, (_, index) => index)

  // const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  // const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    password: '',
    permissions: {
      delete: false,
      report: false,
      update: false,
    },
  })
  // console.log('newUser', newUser)

  const handleAddUserChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setNewUser((prevUser) => ({
        ...prevUser,
        permissions: {
          ...prevUser.permissions,
          [name]: checked,
        },
      }))
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }))
    }
  }

  const submitForm = async () => {
    try {
      const res = await axiosInstanceAuth.post(`${process.env.NEXT_PUBLIC_BASE_URL}admin/createSubAdmin`, newUser)
      console.log('SubAdmin created successfully', res.data)
      // Optionally, you can refresh the list of sub-admins after successful creation
      getAdmindata()
    } catch (err) {
      console.error('Error creating sub-admin:', err)
    }
  }

  const handleModalAction = () => {
    submitForm()
    // setIsModalInfoActive(false)
    // setIsModalTrashActive(false)
    setIsModalAddUserActive(false)
  }

  const handleCancelAction = () => {
    // setIsModalInfoActive(false)
    // setIsModalTrashActive(false)
    setIsModalAddUserActive(false)
  }

  // Get All Admin Show
  const getAdmindata = async () => {
    try {
      const res = await axiosInstanceAuth.get(`${process.env.NEXT_PUBLIC_BASE_URL}admin/getAllSubAdmin`)
      const myData = res?.data
      setAllUser(myData?.data || [])
      console.log('getAllSubAdmin---->', myData)
    } catch (err) {
      console.log('err --->', err)
    }
  }

  const getDeletedUsers = async () => {
    try {
      const res = await axiosInstanceAuth.get(`${process.env.NEXT_PUBLIC_BASE_URL}admin/allDeletedUser`)
      const myData = res?.data
      setDeletedUsers(myData?.data || [])
      console.log('DeletedUsers---->', myData)
    } catch (err) {
      console.log('err --->', err)
    }
  }

  useEffect(() => {
    console.log('🚀 ~ AddAdmin ~ newUser:', newUser)
    getAdmindata()
  }, [])

  const handleClickEye = (_id) => {
    console.log('=-=-=>', _id)
    router.push(`userlist/${_id}`)
  }

  const handleShowAllUsers = () => {
    setCurrentPage(0)
    setShowDeleteUsers(false) // Show all users
    setIsModalAddUserActive(false) // Close Add User modal
  }

  const handleShowDeleteUsers = () => {
    getDeletedUsers()
    setCurrentPage(0)
    setShowDeleteUsers(true) // Show delete users
  }

  const handleDeleteUser = async (_id) => {
    try {
      console.log('Attempting to delete user with ID:', _id)
      await axiosInstanceAuth.delete(`${process.env.NEXT_PUBLIC_BASE_URL}admin/deleteUser/${_id}`)
      setAllUser((prevUsers) => prevUsers.filter((user) => user._id !== _id))
      console.log(`User with ID ${_id} deleted successfully`)
    } catch (err) {
      console.log('Error deleting user:', err)
    }
  }

  return (
    <>
      <CardBoxModal
        title="Add User"
        buttonColor="danger"
        buttonLabel="Submit"
        isActive={isModalAddUserActive}
        onConfirm={handleModalAction}
        onCancel={handleCancelAction}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleAddUserChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={newUser.lastname}
              onChange={handleAddUserChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleAddUserChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={newUser.dateOfBirth}
              onChange={handleAddUserChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={newUser.phoneNumber}
              onChange={handleAddUserChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleAddUserChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Permissions</label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="delete"
                  checked={newUser.permissions.delete}
                  onChange={handleAddUserChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Delete</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="report"
                  checked={newUser.permissions.report}
                  onChange={handleAddUserChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Report</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="update"
                  checked={newUser.permissions.update}
                  onChange={handleAddUserChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Update</span>
              </label>
            </div>
          </div>
        </div>
        {/* <Button label="Close" color="danger" onClick={() => setIsModalAddUserActive(false)} /> */}
      </CardBoxModal>

      <div className="flex justify-between mb-4">
        <div className="flex justify-between w-full">
          <div>
            <Button label="ALL" color="lightDark" onClick={handleShowAllUsers} />
            <Button
              label="Deleted"
              color="lightDark"
              onClick={handleShowDeleteUsers}
              className="ml-2"
            />
          </div>
          <Button label="add" color="contrast" onClick={() => setIsModalAddUserActive(true)} />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Date of Birth</th>
            <th className="whitespace-nowrap">Phone Number</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {clientsPaginated?.length > 0 &&
            clientsPaginated
              .filter((e) => {
                const searchTerm = searchUser.toLowerCase()
                return (
                  searchTerm === '' ||
                  e.firstname?.toLowerCase().includes(searchTerm) ||
                  e.lastname?.toLowerCase().includes(searchTerm) ||
                  e.email?.toLowerCase().includes(searchTerm) ||
                  e.dateOfBirth?.toLowerCase().includes(searchTerm) ||
                  (e.number && e.number.toString().toLowerCase().includes(searchTerm))
                )
              })
              .map((d, index) => (
                <tr key={index}>
                  <td data-label="Name">{d.name}</td>
                  <td data-label="Name">{d.lastname}</td>
                  <td data-label="Email">{d.email}</td>
                  <td data-label="Dob">{d.dateOfBirth}</td>
                  <td data-label="Phone" className="whitespace-nowrap">
                    {d.phoneNumber}
                  </td>

                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <Buttons type="justify-center " noWrap>
                      <Button
                        color="info"
                        icon={mdiEye}
                        onClick={() => handleClickEye(d?._id)}
                        small
                      />
                      <Button
                        color="danger"
                        icon={mdiTrashCan}
                        onClick={() => handleDeleteUser(d?._id)}
                        small
                      />
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
                label={`${page + 1}`}
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

export default AddAdmin
