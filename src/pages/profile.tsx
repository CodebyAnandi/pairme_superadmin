
import {
  mdiAccount,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
  mdiMail,
  mdiUpload,
} from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import { useState, type ReactElement } from 'react'
import axios from 'axios'
import Button from '../components/Button'
import Buttons from '../components/Buttons'
import Divider from '../components/Divider'
import CardBox from '../components/CardBox'
import CardBoxComponentBody from '../components/CardBox/Component/Body'
import CardBoxComponentFooter from '../components/CardBox/Component/Footer'
import FormField from '../components/Form/Field'
import FormFilePicker from '../components/Form/FilePicker'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import CardBoxUser from '../components/CardBox/User'
import type { UserForm } from '../interfaces'
import { getPageTitle } from '../config'
import { useAppSelector } from '../stores/hooks'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { fetchLoggedUserInfo } from '../stores/adminSlice';

const ProfilePage = () => {
  const userName = useAppSelector((state) => state.main.userName)
  const userEmail = useAppSelector((state) => state.main.userEmail)
  const dispatch = useDispatch();
  const data = useSelector((state) => state.loggedUser.userInfo);
  // const [userInfo, setUserInfo] = useState()
  // console.log('-->', userInfo)
  

  const userForm: UserForm = {
    name: userName,
    email: userEmail,
  }

  

  const handlePasswordChange = async (values, { setSubmitting }) => {
    console.log('Sending request to API with values:', values) // Debugging log
    try {
      // Get the JWT token from wherever you stored it (localStorage, etc.)
      const token = localStorage.getItem('Token') // Adjust as per your actual storage method
      console.log(token)

      const response = await axios.post(
        'http://localhost:3334/api/admin/changeAdminPassword',
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          newPasswordConfirmation: values.newPasswordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      )

      console.log(response.data) // Log the response for debugging
      alert('Password changed successfully')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message)
        alert(`Error: ${error.response.data.message}`)
      } else {
        alert('Error changing password')
      }
      console.error('Error:', error)
    } finally {
      setSubmitting(false) // Ensure to set submitting to false regardless of success or failure
    }
  }

  const handleNameEmailChange = async (values, { setSubmitting }) => {
    console.log('Sending request to API with values:', values) // Debugging log

    try {
      // Get the JWT token from wherever you stored it (localStorage, etc.)
      const token = localStorage.getItem('Token') // Adjust as per your actual storage method
      console.log(token)

      const response = await axios.post(
        'http://localhost:3334/api/admin/changeAdminNameEmail',
        {
          name: values.name,
          email: values.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      )

      console.log(response.data) // Log the response for debugging
      alert('Name and email changed successfully')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`)
      } else {
        alert('Error changing name and email')
      }
      console.error('Error:', error)
    } finally {
      setSubmitting(false) // Ensure to set submitting to false regardless of success or failure
    }
  }

  useEffect(() => {
    dispatch(fetchLoggedUserInfo());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{getPageTitle('Profile')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiAccount}
          title="Profile"
          main
        ></SectionTitleLineWithButton>

        <CardBoxUser className="mb-6" UserInfo={data} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <CardBox className="mb-6">
              <FormField label="Avatar" help="Max 500kb">
                <FormFilePicker label="Upload" color="info" icon={mdiUpload} />
              </FormField>
            </CardBox>

            <CardBox className="flex-1" hasComponentLayout>
              <Formik initialValues={userForm} onSubmit={handleNameEmailChange}>
                <Form className="flex flex-col flex-1">
                  <CardBoxComponentBody>
                    <FormField
                      label="Name"
                      help="Required. Your name"
                      labelFor="name"
                      icons={[mdiAccount]}
                    >
                      <Field name="name" id="name" placeholder="Name" />
                    </FormField>
                    <FormField
                      label="E-mail"
                      help="Required. Your e-mail"
                      labelFor="email"
                      icons={[mdiMail]}
                    >
                      <Field name="email" id="email" placeholder="E-mail" />
                    </FormField>
                  </CardBoxComponentBody>
                  <CardBoxComponentFooter>
                    {data && data.length > 0 && data[0].role === 'admin' ? (
                      <Buttons>
                        <Button color="info" type="submit" label="Submit" />
                        <Button color="info" label="Options" outline />
                      </Buttons>
                    ) : (
                      <Buttons>
                        <Button color="info" type="submit" label="Submit" outline disabled />
                        <Button color="info" label="Options" outline disabled />
                      </Buttons>
                    )}
                  </CardBoxComponentFooter>
                </Form>
              </Formik>
            </CardBox>
          </div>

          <CardBox hasComponentLayout>
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                newPasswordConfirmation: '',
              }}
              onSubmit={handlePasswordChange}
            >
              <Form className="flex flex-col flex-1">
                <CardBoxComponentBody>
                  <FormField
                    label="Current password"
                    help="Required. Your current password"
                    labelFor="currentPassword"
                    icons={[mdiAsterisk]}
                  >
                    <Field
                      name="currentPassword"
                      id="currentPassword"
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormField>

                  <Divider />

                  <FormField
                    label="New password"
                    help="Required. New password"
                    labelFor="newPassword"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPassword"
                      id="newPassword"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormField>

                  <FormField
                    label="Confirm password"
                    help="Required. New password one more time"
                    labelFor="newPasswordConfirmation"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPasswordConfirmation"
                      id="newPasswordConfirmation"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormField>
                </CardBoxComponentBody>

                <CardBoxComponentFooter>
                  {/* <Buttons>
                    <Button color="info" type="submit" label="Submit" />
                    <Button color="info" label="Options" outline />
                  </Buttons> */}
                  {data && data.length > 0 && data[0].role === 'admin' ? (
                    <Buttons>
                      <Button color="info" type="submit" label="Submit" />
                      <Button color="info" label="Options" outline />
                    </Buttons>
                  ) : (
                    <Buttons>
                      <Button color="info" type="submit" label="Submit" outline disabled />
                      <Button color="info" label="Options" outline disabled />
                    </Buttons>
                  )}
                </CardBoxComponentFooter>
              </Form>
            </Formik>
          </CardBox>
        </div>
      </SectionMain>
    </>
  )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProfilePage
