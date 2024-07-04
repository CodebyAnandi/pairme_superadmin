// import { mdiCheckDecagram } from '@mdi/js'
// import { Field, Form, Formik } from 'formik'
// import { useAppSelector } from '../../stores/hooks'
// import CardBox from '.'
// import FormCheckRadio from '../Form/CheckRadio'
// import PillTag from '../PillTag'
// import UserAvatarCurrentUser from '../UserAvatar/CurrentUser'

// type Props = {
//   className?: string
// }

// const CardBoxUser = ({ className }: Props) => {
//   const userName = useAppSelector((state) => state.main.userName)

//   return (
//     <CardBox className={className}>
//       <div className="flex flex-col lg:flex-row items-center justify-around lg:justify-center">
//         <UserAvatarCurrentUser className="mb-6 lg:mb-0 lg:mx-12" />
//         <div className="space-y-3 text-center md:text-left lg:mx-12">
//           <div className="flex justify-center md:block">
//             <Formik
//               initialValues={{
//                 notifications: ['1'],
//               }}
//               onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
//             >
//               <Form>
//                 <FormCheckRadio type="switch" label="Notifications">
//                   <Field type="checkbox" name="notifications" value={'1'} />
//                 </FormCheckRadio>
//               </Form>
//             </Formik>
//           </div>
//           <h1 className="text-2xl">
//             Howdy, <b>{userName}</b>!
//           </h1>
//           <p>
//             Last login <b>12 mins ago</b> from <b>127.0.0.1</b>
//           </p>
//           <div className="flex justify-center md:block">
//             <PillTag label="Verified" color="info" icon={mdiCheckDecagram} />
//           </div>
//         </div>
//       </div>
//     </CardBox>
//   )
// }

// export default CardBoxUser
import React, { useEffect, useState } from 'react'
import { mdiCheckDecagram } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import CardBox from '.'
import FormCheckRadio from '../Form/CheckRadio'
import PillTag from '../PillTag'
import UserAvatarCurrentUser from '../UserAvatar/CurrentUser'

type Props = {
  className?: string
}

const CardBoxUser = ({ className }: Props) => {
  const [user, setUser] = useState(null)
  console.log(user)

  useEffect(() => {
    const token = localStorage.getItem('Token')

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3334/api/admin/loggedUserInfo', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    fetchUserData()
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <CardBox className={className}>
      <div className="flex flex-col lg:flex-row items-center justify-around lg:justify-center">
        <UserAvatarCurrentUser className="mb-6 lg:mb-0 lg:mx-12" />
        <div className="space-y-3 text-center md:text-left lg:mx-12">
          <div className="flex justify-center md:block">
            <Formik
              initialValues={{
                notifications: ['1'],
              }}
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
              <Form>
                <FormCheckRadio type="switch" label="Notifications">
                  <Field type="checkbox" name="notifications" value={'1'} />
                </FormCheckRadio>
              </Form>
            </Formik>
          </div>
          <h1 className="text-2xl">
            Howdy, <b>{user[0].name}</b>!
          </h1>
          <p>
            Last login <b>{user[1]}</b> 
          </p>
          <div className="flex justify-center md:block">
            <PillTag label="Verified" color="info" icon={mdiCheckDecagram} />
          </div>
        </div>
      </div>
    </CardBox>
  )
}

export default CardBoxUser
