import React from 'react'
import Navbar from '../REA/navbar'
import {Link} from 'react-router-dom';


const Landing = () => {
  return (
    <div className='h-screen'>
        <div>
        <Navbar/>
        </div>
        <div className='flex justify-center w-full'>
        <div className="container mx-[19rem] w-[113rem]  bg-slate-50 shadow-lg rounded-lg mt-8 pb-10 px-20 bg-gradient-to-b from-blue-50 to-gray-100">
        
          <div className="grid gap-14 md:grid-cols-2 md:gap-7">
            {/* Card 1 */}
         <Link to='/prd'>
          <div className="ml-[2rem] rounded-xl bg-white mt-[8rem] px-[4rem] p-10 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
              <div className="mx-auto flex h-[6.5rem] w-[6.5rem] -translate-y-20 transform items-center justify-center rounded-full bg-sky-500 shadow-lg shadow-sky-400/40 print-bg-color print-shadow">
                <svg
                  viewBox="0 0 33 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white print-svg-color"
                >
                  <path
                    d="M24.75 23H8.25V28.75H24.75V23ZM32.3984 9.43359L23.9852 0.628906C23.5984 0.224609 23.0742 0 22.5242 0H22V11.5H33V10.952C33 10.3859 32.7852 9.83789 32.3984 9.43359ZM19.25 12.2188V0H2.0625C0.919531 0 0 0.961328 0 2.15625V43.8438C0 45.0387 0.919531 46 2.0625 46H30.9375C32.0805 46 33 45.0387 33 43.8438V14.375H21.3125C20.1781 14.375 19.25 13.4047 19.25 12.2188ZM5.5 6.46875C5.5 6.07164 5.80766 5.75 6.1875 5.75H13.0625C13.4423 5.75 13.75 6.07164 13.75 6.46875V7.90625C13.75 8.30336 13.4423 8.625 13.0625 8.625H6.1875C5.80766 8.625 5.5 8.30336 5.5 7.90625V6.46875ZM5.5 12.2188C5.5 11.8216 5.80766 11.5 6.1875 11.5H13.0625C13.4423 11.5 13.75 11.8216 13.75 12.2188V13.6562C13.75 14.0534 13.4423 14.375 13.0625 14.375H6.1875C5.80766 14.375 5.5 14.0534 5.5 13.6562V12.2188ZM27.5 39.5312C27.5 39.9284 27.1923 40.25 26.8125 40.25H19.9375C19.5577 40.25 19.25 39.9284 19.25 39.5312V38.0938C19.25 37.6966 19.5577 37.375 19.9375 37.375H26.8125C27.1923 37.375 27.5 37.6966 27.5 38.0938V39.5312ZM27.5 21.5625V30.1875C27.5 30.9817 26.8847 31.625 26.125 31.625H6.875C6.11531 31.625 5.5 30.9817 5.5 30.1875V21.5625C5.5 20.7683 6.11531 20.125 6.875 20.125H26.125C26.8847 20.125 27.5 20.7683 27.5 21.5625Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h1 className="text-gray-800 mb-3 text-[1.65rem] font-semibold lg:px-18">
                    PRD Tools
              </h1>
              <p className="px-4 text-[1.5rem] text-gray-600">
              Create professional Articles, LORs, LOAs, and Company Bios effortlessly with our AI-powered writing tools. Simplify your content creation today!
              </p>
            </div>
            </Link>
            {/* Card 2 */}
            <Link to='/rea-form'>
          <div className="mr-[2rem] rounded-xl bg-white mt-[8rem] px-[4rem] p-10 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
              <div className="mx-auto flex h-[6.5rem] w-[6.5rem] -translate-y-20 transform items-center justify-center rounded-full bg-sky-500 shadow-lg shadow-sky-400/40 print-bg-color print-shadow">
                <svg
                  viewBox="0 0 33 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white print-svg-color"
                >
                  <path
                    d="M24.75 23H8.25V28.75H24.75V23ZM32.3984 9.43359L23.9852 0.628906C23.5984 0.224609 23.0742 0 22.5242 0H22V11.5H33V10.952C33 10.3859 32.7852 9.83789 32.3984 9.43359ZM19.25 12.2188V0H2.0625C0.919531 0 0 0.961328 0 2.15625V43.8438C0 45.0387 0.919531 46 2.0625 46H30.9375C32.0805 46 33 45.0387 33 43.8438V14.375H21.3125C20.1781 14.375 19.25 13.4047 19.25 12.2188ZM5.5 6.46875C5.5 6.07164 5.80766 5.75 6.1875 5.75H13.0625C13.4423 5.75 13.75 6.07164 13.75 6.46875V7.90625C13.75 8.30336 13.4423 8.625 13.0625 8.625H6.1875C5.80766 8.625 5.5 8.30336 5.5 7.90625V6.46875ZM5.5 12.2188C5.5 11.8216 5.80766 11.5 6.1875 11.5H13.0625C13.4423 11.5 13.75 11.8216 13.75 12.2188V13.6562C13.75 14.0534 13.4423 14.375 13.0625 14.375H6.1875C5.80766 14.375 5.5 14.0534 5.5 13.6562V12.2188ZM27.5 39.5312C27.5 39.9284 27.1923 40.25 26.8125 40.25H19.9375C19.5577 40.25 19.25 39.9284 19.25 39.5312V38.0938C19.25 37.6966 19.5577 37.375 19.9375 37.375H26.8125C27.1923 37.375 27.5 37.6966 27.5 38.0938V39.5312ZM27.5 21.5625V30.1875C27.5 30.9817 26.8847 31.625 26.125 31.625H6.875C6.11531 31.625 5.5 30.9817 5.5 30.1875V21.5625C5.5 20.7683 6.11531 20.125 6.875 20.125H26.125C26.8847 20.125 27.5 20.7683 27.5 21.5625Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h1 className="text-gray-800 mb-3 text-[1.65rem] font-semibold lg:px-18">
                    Remuneration Analysis
              </h1>
              <p className="px-4 text-[1.5rem] text-gray-600">
              Analyze and compare salaries, bonuses, and total compensation. Get insights into your earning potential with our detailed remuneration analysis.
              </p> 
            </div>
          </Link>

          </div>

          <div className="grid gap-14 md:grid-cols-2 md:gap-7">
            {/* Card 3 */}
            <Link to='/chatbot'>
          <div className="ml-[2rem] rounded-xl bg-white mt-[8rem] px-[4rem] p-10 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
              <div className="mx-auto flex h-[6.5rem] w-[6.5rem] -translate-y-20 transform items-center justify-center rounded-full bg-sky-500 shadow-lg shadow-sky-400/40 print-bg-color print-shadow">
                <svg
                  viewBox="0 0 33 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white print-svg-color"
                >
                  <path
                    d="M24.75 23H8.25V28.75H24.75V23ZM32.3984 9.43359L23.9852 0.628906C23.5984 0.224609 23.0742 0 22.5242 0H22V11.5H33V10.952C33 10.3859 32.7852 9.83789 32.3984 9.43359ZM19.25 12.2188V0H2.0625C0.919531 0 0 0.961328 0 2.15625V43.8438C0 45.0387 0.919531 46 2.0625 46H30.9375C32.0805 46 33 45.0387 33 43.8438V14.375H21.3125C20.1781 14.375 19.25 13.4047 19.25 12.2188ZM5.5 6.46875C5.5 6.07164 5.80766 5.75 6.1875 5.75H13.0625C13.4423 5.75 13.75 6.07164 13.75 6.46875V7.90625C13.75 8.30336 13.4423 8.625 13.0625 8.625H6.1875C5.80766 8.625 5.5 8.30336 5.5 7.90625V6.46875ZM5.5 12.2188C5.5 11.8216 5.80766 11.5 6.1875 11.5H13.0625C13.4423 11.5 13.75 11.8216 13.75 12.2188V13.6562C13.75 14.0534 13.4423 14.375 13.0625 14.375H6.1875C5.80766 14.375 5.5 14.0534 5.5 13.6562V12.2188ZM27.5 39.5312C27.5 39.9284 27.1923 40.25 26.8125 40.25H19.9375C19.5577 40.25 19.25 39.9284 19.25 39.5312V38.0938C19.25 37.6966 19.5577 37.375 19.9375 37.375H26.8125C27.1923 37.375 27.5 37.6966 27.5 38.0938V39.5312ZM27.5 21.5625V30.1875C27.5 30.9817 26.8847 31.625 26.125 31.625H6.875C6.11531 31.625 5.5 30.9817 5.5 30.1875V21.5625C5.5 20.7683 6.11531 20.125 6.875 20.125H26.125C26.8847 20.125 27.5 20.7683 27.5 21.5625Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h1 className="text-gray-800 mb-3 text-[1.65rem] font-semibold lg:px-18">
                    ChatBots
              </h1>
              <p className="px-4 text-[1.5rem] text-gray-600">
              Access a variety of chatbots tailored for different needs. From customer support to personal assistance, find the perfect AI solution.
              </p>
            </div>
            </Link>
            {/* Card 2 */}
            <Link to='/niche'>
          <div className="mr-[2rem] rounded-xl bg-white mt-[8rem] px-[4rem] p-10 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
              <div className="mx-auto flex h-[6.5rem] w-[6.5rem] -translate-y-20 transform items-center justify-center rounded-full bg-sky-500 shadow-lg shadow-sky-400/40 print-bg-color print-shadow">
                <svg
                  viewBox="0 0 33 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white print-svg-color"
                >
                  <path
                    d="M24.75 23H8.25V28.75H24.75V23ZM32.3984 9.43359L23.9852 0.628906C23.5984 0.224609 23.0742 0 22.5242 0H22V11.5H33V10.952C33 10.3859 32.7852 9.83789 32.3984 9.43359ZM19.25 12.2188V0H2.0625C0.919531 0 0 0.961328 0 2.15625V43.8438C0 45.0387 0.919531 46 2.0625 46H30.9375C32.0805 46 33 45.0387 33 43.8438V14.375H21.3125C20.1781 14.375 19.25 13.4047 19.25 12.2188ZM5.5 6.46875C5.5 6.07164 5.80766 5.75 6.1875 5.75H13.0625C13.4423 5.75 13.75 6.07164 13.75 6.46875V7.90625C13.75 8.30336 13.4423 8.625 13.0625 8.625H6.1875C5.80766 8.625 5.5 8.30336 5.5 7.90625V6.46875ZM5.5 12.2188C5.5 11.8216 5.80766 11.5 6.1875 11.5H13.0625C13.4423 11.5 13.75 11.8216 13.75 12.2188V13.6562C13.75 14.0534 13.4423 14.375 13.0625 14.375H6.1875C5.80766 14.375 5.5 14.0534 5.5 13.6562V12.2188ZM27.5 39.5312C27.5 39.9284 27.1923 40.25 26.8125 40.25H19.9375C19.5577 40.25 19.25 39.9284 19.25 39.5312V38.0938C19.25 37.6966 19.5577 37.375 19.9375 37.375H26.8125C27.1923 37.375 27.5 37.6966 27.5 38.0938V39.5312ZM27.5 21.5625V30.1875C27.5 30.9817 26.8847 31.625 26.125 31.625H6.875C6.11531 31.625 5.5 30.9817 5.5 30.1875V21.5625C5.5 20.7683 6.11531 20.125 6.875 20.125H26.125C26.8847 20.125 27.5 20.7683 27.5 21.5625Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h1 className="text-gray-800 mb-3 text-[1.65rem] font-semibold lg:px-18">
                    Niche AI
              </h1>
              <p className="px-4 text-[1.5rem] text-gray-600">
              Uncover your unique strengths and interests with AI. Identify your ideal niche and unlock new opportunities.
              </p> 
            </div>
            </Link>
          </div>
            
        </div>
        </div>
        
    </div>
  )
}

export default Landing