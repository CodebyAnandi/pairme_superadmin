import React, { ReactNode } from 'react'
import { useAppSelector } from '../../stores/hooks'
import UserAvatar from '.'

type Props = {
  className?: string
  children?: ReactNode
}

export default function UserAvatarCurrentUser({ className = '', children,data }: Props) {
  const userName = useAppSelector((state) => state.main.userName)
  // const userAvatar = useAppSelector((state) => state.main.userAvatar)\
  const image = data && data[0].profileImage
  console.log(image)
  const defaultImage = 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'

  return (
    <UserAvatar 
      username={userName} 
      avatar={`http://192.168.29.113:3334/${image || defaultImage}`}
      className={className}
    >
      {children}
    </UserAvatar>
  )
}
