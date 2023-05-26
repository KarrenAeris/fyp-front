import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../store/slices/userSlice';

export const TheHeader = () => {
  const router = useRouter()
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('tokens');
    dispatch(setToken(null))
    router.push('/')
  };

  return (
    <header className="w-full h-16 fixed top-0 bg-black py-5 z-10">
      <div className="container center mx-auto flex justify-between items-center px-10">
        <div className="logo">
          <Link href="/">
            <Image
              src="/img/header/logo.svg"
              alt="logo"
              width={130}
              height={24}
            />
          </Link>
        </div>
        {
          token ?
          <div className="text-white space-x-5">
            <Link href="/quotes">Quotes</Link>
            <Link href="/orders">Orders</Link>
          </div>
          :
          null
        }
        <div>
          {
            token ?
            <Image
              src="/img/header/user.svg"
              alt="user"
              width={27}
              height={27}
              onClick={handleLogout}
            />
            :
            <div className="text-white space-x-5">
              <Link href={'login'}>Login</Link>
              <span>
                |
              </span>
              <Link href="register">Sign up</Link>
            </div>
          }
        </div>
      </div>
    </header>
  )
}
