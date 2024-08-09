
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import homeIcon from '@/public/icons/home.svg';
import accountsIcon from '@/public/icons/accounts.svg';
import transactionsIcon from '@/public/icons/transactions.svg';
import crossIcon from '@/public/icons/cross.svg';
import menuIcon from '@/public/icons/menu.svg';
import { usePathname } from 'next/navigation';
const Sidebar = () => {
  const [selected, setSelected] = useState('/');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const closeSidebar = () => setSidebarOpen(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeSidebar();
    }
  };

  useEffect(() => {
    setSelected(pathname);
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    { name: 'Home', icon: homeIcon, path: '/user' },
    { name: 'Money Transfer', icon: homeIcon, path: '/user/send-money' },
    { name: 'Transactions', icon: transactionsIcon, path: '/user/transactions' },
    { name: 'Logout', icon: homeIcon, path: '/logout', action: handleLogout }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4">
        <button onClick={() => setSidebarOpen(true)} className="text-black">
          <Image src={menuIcon} width={30} height={30} alt="Menu" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={dropdownRef}
        className={`top-0 max-md:fixed left-0 h-full w-[250px] md:w-[20%] flex flex-col gap-4 shadow-custom bg-white pt-[30px] pb-[100px] overflow-y-auto transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 max-md:z-10`}
      >
        <div className='flex flex-row gap-3 px-5 py-5'>
          <div onClick={closeSidebar} className='md:hidden cursor-pointer'>
            <Image src={crossIcon} width={25} height={25} alt='Close' />
          </div>
          <p className='font-bold text-3xl max-md:text-lg'>Bank App</p>
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

export default Sidebar;
