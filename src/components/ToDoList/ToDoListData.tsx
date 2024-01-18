import { mdiEye, mdiTrashCan, mdiPencilOutline, mdiPencil, mdiCheckboxOutline } from '@mdi/js'
import React, { useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import { Client } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import UserAvatar from '../UserAvatar'
import FormField from '../../components/Form/Field'
import { Field, Form, Formik } from 'formik'
import { mdiAccount, mdiBallotOutline, mdiGithub, mdiMail, mdiUpload } from '@mdi/js'
import CardBox from '../../components/CardBox'
import FormCheckRadio from '../Form/CheckRadio'
import Divider from '../../components/Divider'

const ReadMore = ({ children }) => {
  const text = children
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 20) : text}
      <span onClick={toggleReadMore} className="text-[#22345C] cursor-pointer ">
        {isReadMore ? '...read more' : ' show less'}
      </span>
    </p>
  )
}

const TableTodoList = () => {
  const { clients } = useSampleClients()

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  //   const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = clients.length / perPage

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

  const isComplete = false

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
            <th className='whitespace-nowrap'>Task Title</th>
            <th className='whitespace-nowrap'>Status</th>
            <th className='whitespace-nowrap'>Assigned to</th>
            <th className='whitespace-nowrap'>Role</th>
            <th className='whitespace-nowrap'>Assigned Date</th>
            <th className='whitespace-nowrap'>Deadline</th>
            <th className='whitespace-nowrap'>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Task" className="font-medium space-y-2">
              <div>Policy and Procedure Review</div>
              <div className="text-gray-400 flex gap-2  text-justify">
                <div>Description:-</div>
                <div>
                  <ReadMore>
                    The process begins when an order is placed. An order is assigned a unique
                    tracking number
                  </ReadMore>
                </div>
              </div>
            </td>
            <td data-label="Status">
              <div
                className={`flex font-bold gap-1 items-center ${
                  !isComplete ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {!isComplete ? 'Complete' : 'Incomplete'}
              </div>
            </td>
            <td data-label="AssignedTo" className="font-medium whitespace-nowrap">
              John Plasi
            </td>
            <td data-label="Role" className="font-medium whitespace-nowrap">
              Team leader
            </td>
            <td data-label="AssignedDate" className="font-medium whitespace-nowrap">
              16 July 2023
            </td>
            <td data-label="Deadline" className="font-medium whitespace-nowrap">
              30 July 2023
            </td>
            <td className="before:hidden lg:w-1 whitespace-nowrap">
              <Buttons type="justify-start lg:justify-end" noWrap>
                <Button
                  color="info"
                  icon={mdiPencil}
                  onClick={() => setIsModalInfoActive(true)}
                  small
                />
                <Button
                  color="danger"
                  icon={mdiTrashCan}
                  onClick={() => setIsModalTrashActive(true)}
                  small
                />
              </Buttons>
            </td>
          </tr>

          <tr>
            <td data-label="Task" className="font-medium space-y-2">
              <div>Vendor Assessment</div>
              <div className="text-gray-400 flex gap-2  text-justify">
                <p>Description:-</p>
              </div>
            </td>
            <td data-label="Status">
              <div
                className={`flex font-bold gap-1 items-center ${
                  isComplete ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {isComplete ? 'Complete' : 'Incomplete'}
              </div>
            </td>
            <td data-label="AssignedTo" className="font-medium whitespace-nowrap">
              Warren Stevens
            </td>
            <td data-label="Role" className="font-medium whitespace-nowrap">
              Privacy Analyst
            </td>
            <td data-label="AssignedDate" className="font-medium whitespace-nowrap">
              15 Aug 2022
            </td>
            <td data-label="Deadline" className="font-medium whitespace-nowrap">
              25 Aug 2023
            </td>
            <td className="before:hidden lg:w-1 whitespace-nowrap">
              <Buttons type="justify-start lg:justify-end" noWrap>
                <Button
                  color="info"
                  icon={mdiPencil}
                  onClick={() => setIsModalInfoActive(true)}
                  small
                />
                <Button
                  color="danger"
                  icon={mdiTrashCan}
                  onClick={() => setIsModalTrashActive(true)}
                  small
                />
              </Buttons>
            </td>
          </tr>

          <tr>
            <td data-label="Task" className="font-medium space-y-2">
              <div>Data Retention Strategy</div>
              <div className="text-gray-400 flex gap-2  text-justify">
                <p>Description:-</p>
              </div>
            </td>
            <td data-label="Status">
              <div
                className={`flex font-bold gap-1 items-center ${
                  !isComplete ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {!isComplete ? 'Complete' : 'Incomplete'}
              </div>
            </td>
            <td data-label="AssignedTo" className="font-medium whitespace-nowrap">
              Amit Sharma
            </td>
            <td data-label="Role" className="font-medium whitespace-nowrap">
              IT Security Manager
            </td>
            <td data-label="AssignedDate" className="font-medium whitespace-nowrap">
              16 Feb 2023
            </td>
            <td data-label="Deadline" className="font-medium whitespace-nowrap">
              28 Feb 2023
            </td>
            <td className="before:hidden lg:w-1 whitespace-nowrap">
              <Buttons type="justify-start lg:justify-end" noWrap>
                <Button
                  color="info"
                  icon={mdiPencil}
                  onClick={() => setIsModalInfoActive(true)}
                  small
                />
                <Button
                  color="danger"
                  icon={mdiTrashCan}
                  onClick={() => setIsModalTrashActive(true)}
                  small
                />
              </Buttons>
            </td>
          </tr>

          <tr>
            <td data-label="Task" className="font-medium space-y-2">
              <div>Incident Response Plan</div>
              <div className="text-gray-400 flex gap-2  text-justify">
                <p>Description:-</p>
                <p>
                  <ReadMore>
                    The process begins when an order is placed. An order is assigned a unique
                    tracking number
                  </ReadMore>
                </p>
              </div>
            </td>
            <td data-label="Status">
              <div
                className={`flex font-bold gap-1 items-center ${
                  isComplete ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {isComplete ? 'Complete' : 'Incomplete'}
              </div>
            </td>
            <td data-label="AssignedTo" className="font-medium whitespace-nowrap">
              Peter Dinklage
            </td>
            <td data-label="Role" className="font-medium whitespace-nowrap">
              Training Specialist
            </td>
            <td data-label="AssignedDate" className="font-medium whitespace-nowrap">
              1 March 2023
            </td>
            <td data-label="Deadline" className="font-medium whitespace-nowrap">
              30 March 2023
            </td>
            <td className="before:hidden lg:w-1 whitespace-nowrap">
              <Buttons type="justify-start lg:justify-end" noWrap>
                <Button
                  color="info"
                  icon={mdiPencil}
                  onClick={() => setIsModalInfoActive(true)}
                  small
                />
                <Button
                  color="danger"
                  icon={mdiTrashCan}
                  onClick={() => setIsModalTrashActive(true)}
                  small
                />
              </Buttons>
            </td>
          </tr>
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
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableTodoList
