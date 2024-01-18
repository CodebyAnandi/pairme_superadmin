'use client'

import React, { useState } from 'react'
import { mdiLogout, mdiClose } from '@mdi/js'
import Icon from '../Icon'
import AsideMenuItem from './Item'
import AsideMenuList from './List'
import { MenuAsideItem } from '../../interfaces'
import { useAppSelector } from '../../stores/hooks'
import ISOLogo from '../../assets/img/ISO_logo.png'
import pairmeLogo from '../../assets/img/pairmelogoW.png'
import Image from 'next/image'
import CardBoxModal from '../CardBox/Modal'
import { useRouter } from 'next/router'

type Props = {
  menu: MenuAsideItem[]
  className?: string
  onAsideLgCloseClick: () => void
}

export default function AsideMenuLayer({ menu, className = '', ...props }: Props) {
  const asideStyle = useAppSelector((state) => state.style.asideStyle)
  const asideBrandStyle = useAppSelector((state) => state.style.asideBrandStyle)
  const asideScrollbarsStyle = useAppSelector((state) => state.style.asideScrollbarsStyle)
  const darkMode = useAppSelector((state) => state.style.darkMode)

  const logoutItem: MenuAsideItem = {
    label: 'Logout',
    icon: mdiLogout,
    color: 'info',
    isLogout: true,
  }

  const handleAsideLgCloseClick = (e: React.MouseEvent) => {
    e.preventDefault()
    props.onAsideLgCloseClick()
  }

  const router = useRouter()

  const handleSubmit = () => {
    localStorage.clear()
    router.push('/login')
  }

  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalActionLogout = () => {
    handleSubmit()
    setIsModalTrashActive(false)
  }

  const handleModalLogoutCancel = () => {
    setIsModalTrashActive(false)
  }

  return (
    <>
      <CardBoxModal
        title="Confirm logout"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalActionLogout}
        onCancel={handleModalLogoutCancel}
      >
        <p>Are you sure you want to logout ?</p>
      </CardBoxModal>
      <aside
        className={`${className} zzz lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
      >
        <div
          className={`lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900 ${asideStyle}`}
        >
          <div
            className={`flex flex-row h-14 items-center justify-between dark:bg-slate-900 ${asideBrandStyle}`}
          >
            <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0 flex justify-center">
              {/* <b className="font-black">Oneeeeeeeeeee</b> */}
              <Image src={pairmeLogo} width={128} height={720} alt="One" />
            </div>
            <button
              className="hidden lg:inline-block xl:hidden p-3"
              onClick={handleAsideLgCloseClick}
            >
              <Icon path={mdiClose} />
            </button>
          </div>
          <div
            className={`flex-1 overflow-y-auto overflow-x-hidden ${
              darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
            }`}
          >
            <AsideMenuList menu={menu} />
          </div>
          <ul onClick={() => setIsModalTrashActive(true)} color="danger">
            <AsideMenuItem item={logoutItem} />
          </ul>
        </div>
      </aside>
    </>
  )
}
