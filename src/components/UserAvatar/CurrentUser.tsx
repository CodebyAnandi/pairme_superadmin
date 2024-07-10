import React, { ReactNode, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserAvatar from '.'
import { fetchLoggedUserInfo } from '../../stores/adminSlice'

type Props = {
  className?: string
  children?: ReactNode
}

export default function UserAvatarCurrentUser({ className = '', children }: Props) {
  const userInfo = useSelector((state) => state.loggedUser.userInfo)
  console.log("userInfo-->",userInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLoggedUserInfo())
  }, [dispatch])

  const defaultImage =
    'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'

  // Assuming you want to extract username and image from userInfo
  const username = userInfo && userInfo[0]?.name // Replace 'username' with actual field name
  const image = userInfo && userInfo[0]?.profileImage
  console.log("---->",image)

  return (
    <UserAvatar
      username={username}
      avatar={image ? `${process.env.NEXT_PUBLIC_BASE_URL}${image}` : defaultImage}
      className={className}
    >
      {children}
    </UserAvatar>
  )
}
