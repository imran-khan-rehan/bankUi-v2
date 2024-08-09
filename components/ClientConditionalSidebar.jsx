
import HomeNavBar from './HomeNavBar';
export default function ClientConditionalSidebar({ children }) {
  return (
    <>
      <main className="flex flex-col w-full">
        {/* <HomeNavBar/> */}
        {children}
      </main>
    </>
  );
}
