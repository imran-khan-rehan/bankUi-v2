'use client';
import React, { useEffect, useState } from 'react';
import HomeNavBar from '@/components/HomeNavBar';
const Home2 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardImages = ['/icons/SENDMONEY/add.jpeg', '/icons/SENDMONEY/fast.jpeg', '/icons/SENDMONEY/secure.jpeg', '/icons/SENDMONEY/security.jpeg'];
  const carousalImages = ['/bank3.jpeg', '/bankImage.jpeg', '/b5.jpeg'];

  const cardData = [
    {
      image: cardImages[0],
      title: "Secure Banking",
      description: "Experience peace of mind with our advanced security features protecting your financial assets.",
      alt: "Banking Services"
    },
    {
      image: cardImages[1],
      title: "Personalized Financial Solutions",
      description: "Tailored financial solutions to meet your unique banking needs and goals.",
      alt: "Financial Services"
    },
    {
      image: cardImages[2],
      title: "Exceptional Customer Service",
      description: "Our dedicated team is here to assist you with all your banking needs, anytime.",
      alt: "Customer Service"
    },
    {
      image: cardImages[3],
      title: "Secure Banking",
      description: "Experience peace of mind with our advanced security features protecting your financial assets.",
      alt: "Banking Services"
    }
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carousalImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carousalImages.length]);


  return (
    <section>
      <HomeNavBar />
      <section className="carousel-section flex justify-center text-center bg-cover bg-center bg-no-repeat h-screen"
        style={{
          backgroundImage: `url(${carousalImages[currentImageIndex]})`
        }}>
        <div className='text-center mt-8'>
          <h1 className="font-extrabold text-[#fefeff] text-[32px] mt-12">Welcome to REDMATH Bank</h1>
          <p className="mt-2 text-center text-[#666e75] text-[14px]">Your trusted partner for secure and efficient banking solutions.</p>
          <div className='home-btn mt-2'>
            <a href="/login">
              <button className="bg-blue-500 border-blue-600 hover:bg-blue-600 font-semibold mb-2 items-center justify-center rounded-full border-2 text-white py-2 px-8 text-center transition-all hover:border-transparent uppercase cursor-pointer">
                Join Us
              </button>
            </a>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col sm:flex-row justify-evenly mt-6">
          {cardData.map((card, index) => (
            <div key={index} className="card mt-6 sm:mt-0">
              <div className="max-w-xs mx-auto overflow-hidden shadow-lg rounded-lg bg-white text-black">
                <div className="relative overflow-hidden">
                  <img
                    className="w-full h-52 transition-transform duration-500 transform hover:scale-105"
                    src={card.image}
                    alt={card.alt}
                  />
                </div>
                <div className="px-4 py-2">
                  <h3 className="text-black font-semibold text-lg mb-2">{card.title}</h3>
                  <p className="text-black text-sm">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='article-ai mt-4'>
        <div className='prompt-img flex flex-col sm:flex-row justify-between justify-evenly gap-6  bg-black p-6  mt-6'>
          <div className='text-part bg-black rounded-lg shadow-lg p-6 border-sky-100 text-white ml-6 mr-3'>
            <h1 className="font-serif text-3xl font-bold mb-4">Banking with REDMATH</h1>
            <p className="font-sans text-lg">
              At REDMATH Bank, we provide a comprehensive suite of banking services designed to make your financial life easier and more secure. From everyday transactions to complex financial planning, our goal is to be your trusted partner in managing your money. Discover the innovative solutions we offer and how they can benefit you.

            </p>
            <br />
            <br />
            <p className='font-sans text-lg'>
              Our banking services offer a wide range of facilities designed to help you save money effectively. With high-interest savings accounts, you can grow your wealth steadily while keeping your funds easily accessible. We provide various types of accounts tailored to meet your unique saving goals, whether youre planning for retirement, education, or simply building an emergency fund.            </p>
          </div>
          <div className='image-prompt-part bg-gray-800 rounded-lg shadow-lg p-6 text-white mr-6'>
            <h1 className="font-serif text-3xl font-bold mb-4">Safe your money</h1>
            <p className="font-sans text-lg">Comprehensive Saving Solutions to Help You Achieve Your Financial Goals
            </p>
            <div className="relative overflow-hidden mt-4">
              <img
                className="w-full transition-transform duration-500 transform hover:scale-105"
                src='/icons/SENDMONEY/addmoney.jpeg'
                alt="Image"
              />

            </div>
          </div>
        </div>
      </section>


      <section className='services-section bg-blue-100 mt-12'>
        <h1 className='text-4xl font-bold text-center pt-4 text-black'>Our Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-20 pl-6 pr-6 pb-20">
          <div className="grid-item bg-white text-black transition-colors duration-300 hover:bg-blue-200 rounded-lg p-4 shadow-lg">
            {/* <FontAwesomeIcon icon={faBank} size="2x" /> */}
            <h3 className='text-2xl font-bold mt-2'>Personal Banking</h3>
            <p>Manage your daily banking needs with ease and convenience through our comprehensive personal banking services.</p>
          </div>
          <div className="grid-item bg-white text-black transition-colors duration-300 hover:bg-blue-200 rounded-lg p-4 shadow-lg">
            {/* <FontAwesomeIcon icon={faCreditCard} size="2x" /> */}
            <h3 className='text-2xl font-bold mt-2'>Credit Cards</h3>
            <p>Explore a range of credit card options tailored to your spending habits and financial goals.</p>
          </div>
          <div className="grid-item bg-white text-black transition-colors duration-300 hover:bg-blue-200 rounded-lg p-4 shadow-lg">
            {/* <FontAwesomeIcon icon={faDollarSign} size="2x" /> */}
            <h3 className='text-2xl font-bold mt-2'>Loans & Mortgages</h3>
            <p>Access flexible and competitive loan and mortgage options to achieve your financial objectives.</p>
          </div>
          <div className="grid-item bg-white text-black transition-colors duration-300 hover:bg-blue-200 rounded-lg p-4 shadow-lg">
            {/* <FontAwesomeIcon icon={faChartLine} size="2x" /> */}
            <h3 className='text-2xl font-bold mt-2'>Investment Services</h3>
            <p>Grow your wealth with our expert investment services and financial planning solutions.</p>
          </div>
          <div className="grid-item bg-white text-black transition-colors duration-300 hover:bg-blue-200 rounded-lg p-4 shadow-lg">
            {/* <FontAwesomeIcon icon={faUserShield} size="2x" /> */}
            <h3 className='text-2xl font-bold mt-2'>Insurance</h3>
            <p>Protect yourself and your family with our wide range of insurance products.</p>
          </div>
          <div className="grid-item bg-white text-black transition-colors duration-300 hover:bg-blue-200 rounded-lg p-4 shadow-lg">
            {/* <FontAwesomeIcon icon={faLock} size="2x" /> */}
            <h3 className='text-2xl font-bold mt-2'>Secure Banking</h3>
            <p>Experience the highest level of security with our advanced banking technologies.</p>
          </div>
        </div>
      </section>

      <div className='bg-white mt-4'>
        <div className='curve'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000" fill-opacity="1" d="M0,64L480,160L960,224L1440,192L1440,320L960,320L480,320L0,320Z"></path></svg>
        </div>
      </div>
    </section>
  );
};
export default Home2;

