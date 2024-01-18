import {
  mdiPlus,
  mdiAccount,
  mdiMail,
  mdiLock,
  mdiPhone,
  mdiAccountTie,
  mdiListBoxOutline,
} from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useState } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableTodoList from '../components/ToDoList/ToDoListData'
import { getPageTitle } from '../config'
import Buttons from '../components/Buttons'
import CardBoxModal from '../components/CardBox/Modal'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/Form/Field'

const ToDoList = () => {
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
  }

  return (
    <>
      <CardBoxModal
        title="Add To-Do-List"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <div className="space-y-3 shadow-lg bg-white px-5 py-5 rounded-lg">
          <Formik initialValues={{}} onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
            <Form>
              <FormField label="Task Name">
                <Field name="taskname" placeholder="Task Name" />
              </FormField>

              <FormField label="Task Description (Optional)">
                <Field name="taskdescription" placeholder="Task Description (Optional)" />
              </FormField>

              <FormField label="Assigned To">
                <Field name="assignedto" placeholder="Assigned To" />
              </FormField>

              <FormField label="Role">
                <Field name="role" placeholder="Role" />
              </FormField>

              <FormField label="Assigned Date">
                <Field type="date" name="assigneddate " placeholder="Assigned Date " />
              </FormField>

              <FormField label="Deadline">
                <Field type="date" name="Deadline" placeholder="Deadline " />
              </FormField>
            </Form>
          </Formik>
        </div>
      </CardBoxModal>

      <Head>
        <title>{getPageTitle('Tables')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiListBoxOutline}
          title="To-Do-List"
          main
        ></SectionTitleLineWithButton>

        <div onClick={() => setIsModalInfoActive(true)}>
          <Buttons className="flex justify-end mb-3">
            <Button type="submit" color="info" label="Add" icon={mdiPlus} className="rounded-lg" />
          </Buttons>
        </div>

        <CardBox className="mb-6" hasTable>
          <TableTodoList />
        </CardBox>
      </SectionMain>
    </>
  )
}

ToDoList.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ToDoList
