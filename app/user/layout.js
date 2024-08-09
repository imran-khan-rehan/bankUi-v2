'use client';
// components/ClientConditionalSidebar.js
import Sidebar from '@/components/sidebar';
import NavBar from '@/components/NavBar';
export default function ClientConditionalSidebar({ children }) {
function openmenu(arg)
{
  console.log(arg);
}

  return (
    <>
        <Sidebar openMenu={openmenu} />
      
      <main className="flex flex-col w-full">
        <NavBar />
        {children}
      </main>
    </>
  );
}
