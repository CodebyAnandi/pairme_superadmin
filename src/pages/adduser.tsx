import {
  mdiAccount,
  mdiMail,
  mdiLock,
  mdiPhone,
  mdiAccountTie,
} from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useState } from 'react'

import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableAddUser from '../components/AddUser/AddUserData'
import { getPageTitle } from '../config'
import CardBoxModal from '../components/CardBox/Modal'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/Form/Field'
import { GoSearch } from 'react-icons/go'

const AddUser = () => {
  const [searchUser, setSearchUser] = useState('')

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
  }

  return (
    <>
      <CardBoxModal
        title="Add User"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <div className="space-y-3 shadow-lg bg-white px-5 py-5 rounded-lg">
          <Formik initialValues={{}} onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
            <Form>
              <FormField icons={[mdiAccount, mdiAccountTie]}>
                <Field name="fullname" placeholder="Full name" />
                <Field name="employeerole" placeholder="Employee Role" />
              </FormField>

              <FormField icons={[mdiMail, mdiLock]}>
                <Field type="email" name="email" placeholder="Email" />
                <Field name="password" placeholder="Password" />
              </FormField>

              <FormField icons={[mdiPhone, mdiLock]}>
                <Field name="Phone" placeholder="Phone" />
                <Field name="confirmpassword" placeholder="Confirm Password" />
              </FormField>
            </Form>
          </Formik>
        </div>
      </CardBoxModal>

      <Head>
        <title>{getPageTitle()}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccount} title="User Tables" main>
          <div className="relative">
            <input
              className="shadow-md pl-10  rounded-lg lg:w-60 text-[#000000] text-[16px] py-2 px-3  focus:outline-none"
              id="username"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchUser(e.target.value)}
            />

            <div className="absolute left-0 inset-y-0 flex py-2 items-center ">
              <GoSearch size={20} className="ml-3 text-[#22345C]" />
            </div>
          </div>
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <TableAddUser searchUser={searchUser} />  
        </CardBox>
      </SectionMain>
    </>
  )
}

AddUser.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AddUser
