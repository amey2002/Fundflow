import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useBankingSystem } from "../Context/UserContext"

const DashboardMain = () => {
  const { userDetails } = useBankingSystem();
  const [adminname, setAdminname] = useState("");

  useEffect(() => {
    if (userDetails?.firstname) {
      setAdminname(`${userDetails.firstname} ${userDetails.lastname || ""}`.trim());
    }
  }, [userDetails]);

  return (
    <section className='min-h-[84vh] bg-blue-300 border pt-[2rem] pb-[2rem]'>
      <h2 className='text-[1.5rem] text-gray-900 font-semibold text-center'>Admin DashBoard</h2>
      <div className='flex flex-row flex-wrap justify-around gap-8 mt-8 px-4'>

        <div className='flex flex-col justify-center items-center gap-4'>
          <h3 className='text-[1.2rem] font-semibold text-gray-900'>Menu</h3>
          <NavLink to={"/admin/dashboard/requests"}>
            <button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] duration-300'>
              Requests
            </button>
          </NavLink>
          <NavLink to={"/admin/dashboard/accounts"}>
            <button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] duration-300'>
              Accounts
            </button>
          </NavLink>
          <NavLink to={"/admin/dashboard/transactions"}>
            <button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] duration-300'>
              Transactions
            </button>
          </NavLink>
        </div>

        <div className='flex flex-col items-start md:items-end bg-white/70 rounded-xl p-6 shadow min-w-[16rem]'>
          <h1 className='text-[1.2rem] text-gray-900'>Hello</h1>
          <h2 className="text-3xl font-semibold text-gray-900">{adminname || "Admin"}</h2>
          <p className="mt-3 text-sm text-gray-700">Manage account requests, accounts, and transactions.</p>
        </div>
      </div>
    </section>
  )
}

export default DashboardMain
