import React from 'react'
import amey from "../../assets/images/AmeyBaishwar.jpeg"

const AboutUs = () => {
    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About Us</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">FundFlow is an online banking management system built to make everyday banking simple — from account opening and transfers to statements and admin approvals.</p>
                </div>
                <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src="https://i.ibb.co/FhgPJt8/Rectangle-116.png" alt="Banking" />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Developer</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">FundFlow was designed and developed by Amey Baishwar.</p>
                </div>
                <div className="w-full lg:w-8/12 lg:pt-8">
                    <div className="flex justify-center shadow-lg rounded-md p-8">
                        <div className="flex flex-col items-center gap-3">
                            <img className="w-40 h-40 object-cover rounded-full" src={amey} alt="Amey Baishwar" />
                            <p className="font-semibold text-lg text-gray-800">Amey Baishwar</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
