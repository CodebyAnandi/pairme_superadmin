import React, { useEffect, useState } from 'react'
import { MenuAsideItem } from '../../interfaces'
import AsideMenuItem from './Item'
import { mdiAccount, mdiAccountSupervisor, mdiMonitor } from '@mdi/js'

type Props = {
  menu: MenuAsideItem[]
  isDropdownList?: boolean
  className?: string
}

export default function AsideMenuList({ menu, isDropdownList = false, className = '' }: Props) {
  
  const [subRole, setSubRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('Token')

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3334/api/admin/loggedUserInfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json();
        setSubRole(data[0]?.role)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    fetchUserData()
  }, [])
  
  console.log("object",subRole)

  const dash ={
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  }
  
  const adduser ={
    href: '/adduser',
    label: 'User',
    icon: mdiAccount,
  }

 const subAdmin = {
    href: '/subadmin',
    label: 'Sub Admin',
    icon: mdiAccountSupervisor,
  }

  return (
    <ul className={className}>
      {/* {menu.map((item, index) => ( */}
        {/* <AsideMenuItem key={index} item={item} isDropdownList={isDropdownList} /> */}
      {/* ))} */}
        <AsideMenuItem  item={dash} isDropdownList={isDropdownList} />
        <AsideMenuItem  item={adduser} isDropdownList={isDropdownList} />

        {
          subRole === "admin" &&
          <AsideMenuItem  item={subAdmin} isDropdownList={isDropdownList} />
        }

    </ul>
  )
}
