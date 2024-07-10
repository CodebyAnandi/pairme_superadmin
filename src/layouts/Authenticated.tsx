import React, { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js';
import menuAside from '../menuAside';
import menuNavBar from '../menuNavBar';
import Icon from '../components/Icon';
import NavBar from '../components/NavBar';
import NavBarItemPlain from '../components/NavBar/Item/Plain';
import AsideMenu from '../components/AsideMenu';
import { setUser } from '../stores/mainSlice';
import { fetchLoggedUserInfo } from '../stores/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
};

export default function LayoutAuthenticated({ children }: Props) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.loggedUser.userInfo);
  const darkMode = useSelector((state) => state.style.darkMode);
  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false);
  const [isAsideLgActive, setIsAsideLgActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchLoggedUserInfo());
  }, [dispatch]);

  // Check if userInfo exists and is not null before accessing properties
  const userData = userInfo && userInfo[0];
  // console.log('=====-99>>>>',userData)
  const defaultImage = 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'

  useEffect(() => {
    // Only dispatch setUser when userData is defined
    if (userData) {
      dispatch(
        setUser({
          name:userData.name + ` (${userData.role})` || "admin",
          email: userData.email || "admin@gmail.com",
          avatar: `${process.env.NEXT_PUBLIC_BASE_URL}${userData.profileImage || defaultImage}`,
          // avatar: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'
        })
      );
    }
  }, [userData, dispatch]);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsAsideMobileExpanded(false);
      setIsAsideLgActive(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router.events]);

  const layoutAsidePadding = 'xl:pl-60';

  return (
    <div className={`${darkMode ? 'dark' : ''} overflow-hidden lg:overflow-visible`}>
      <div
        className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''} pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100`}
      >
        <NavBar
          menu={menuNavBar}
          className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''}`}
        >
          <NavBarItemPlain
            display="flex lg:hidden"
            onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
          >
            <Icon path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger} size="24" />
          </NavBarItemPlain>
          <NavBarItemPlain
            display="hidden lg:flex xl:hidden"
            onClick={() => setIsAsideLgActive(true)}
          >
            <Icon path={mdiMenu} size="24" />
          </NavBarItemPlain>
        </NavBar>
        <AsideMenu
          isAsideMobileExpanded={isAsideMobileExpanded}
          isAsideLgActive={isAsideLgActive}
          menu={menuAside}
          onAsideLgClose={() => setIsAsideLgActive(false)}
        />
        {children}
      </div>
    </div>
  );
}
