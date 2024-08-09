'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter,usePathname } from 'next/navigation';
import usersIcon from '@/public/icons/admin/users.svg';
import transactionsIcon from '@/public/icons/admin/transaction.svg';
import balancesIcon from '@/public/icons/admin/balance.svg';
import crossIcon from '@/public/icons/cross.svg';
import menuIcon from '@/public/icons/menu.svg'; // Add your menu icon here

const AdminSidebar = ({ openMenu }) => {
  const [selected, setSelected] = useState('/');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeSidebar();
    }
  };

  useEffect(() => {
    setSelected(pathname);
    setSelected(window.location.pathname);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        alert('Failed to log out');
      }
    } catch {
      alert('Failed to log out');
    }
  };

  const menuItems = [
    { name: 'Users', icon: usersIcon, path: '/admin/users' },
    { name: 'Transactions', icon: transactionsIcon, path: '/admin/transactions' },
    { name: 'Balances', icon: balancesIcon, path: '/admin/balances' },
    { name: 'Logout', icon: crossIcon, action: handleLogout }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <button onClick={() => setSidebarOpen(true)} className="text-black">
          <Image src={menuIcon} width={30} height={30} alt="Menu" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={dropdownRef}
        className={`max-md:fixed top-0 left-0 h-full w-[250px] md:w-[20%] flex flex-col gap-4 shadow-custom bg-white pt-[30px] pb-[100px] overflow-y-auto transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 max-md:z-20`}
      >
        <div className='flex flex-row gap-3 px-5 py-5'>
          <div onClick={closeSidebar} className='md:hidden cursor-pointer'>
            <Image src={crossIcon} width={20} height={20} alt='Close' />
          </div>
          <p className='font-bold text-3xl max-md:text-lg'>Admin Panel</p>
        </div>
        {menuItems.map(item => (
          item.action ? (
            <div
              key={item.name}
              className={`ml-3 py-3 cursor-pointer hover:bg-slate-200 shadow-custom w-[90%] flex flex-row rounded-md ${selected === item.path ? 'bg-yellow-500 text-white hover:bg-yellow-500' : 'bg-white text-black'}`}
              onClick={item.action}
            >
              <div className={`px-4 ${selected === item.path ? 'invert' : ''}`}>
                <Image src={item.icon} width={25} height={25} alt={item.name} />
              </div>
              <div className='text-lg font-medium flex flex-row justify-between'>
                {item.name}
              </div>
            </div>
          ) : (
            <Link key={item.name} href={item.path} passHref>
              <div
                className={`ml-3 py-3 cursor-pointer hover:bg-slate-200 shadow-custom w-[90%] flex flex-row rounded-md ${selected === item.path ? 'bg-yellow-500 text-white hover:bg-yellow-500' : 'bg-white text-black'}`}
                onClick={() => setSelected(item.path)}
              >
                <div className={`px-4 ${selected === item.path ? 'invert' : ''}`}>
                  <Image src={item.icon} width={25} height={25} alt={item.name} />
                </div>
                <div className='text-lg font-medium flex flex-row justify-between'>
                  {item.name}
                </div>
              </div>
            </Link>
          )
        ))}
      </div>
    </>
  );
};

export default AdminSidebar;
