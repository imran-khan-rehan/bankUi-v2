'use client'
// components/ClientConditionalSidebar.js

import NavBar from '@/components/NavBar';
import AdminSidebar from '@/components/AdminSidebar';
export default function ClientConditionalSidebar({ children }) {
function openmenu(arg)
{
  console.log(arg);
}

  return (
    <>
        <AdminSidebar openMenu={openmenu} />
      <main className="flex flex-col w-full">
        <NavBar />
        {children}
      </main>
    </>
  );
}
