import React, { useEffect } from 'react'
import DashboardMain from './DashboardMain'
import { useBankingSystem } from "../Context/UserContext"
import NavbarDashboardAdmin from './NavbarDashboardAdmin'
import AdminProtected from './AdminProtected'

const DashboardAdmin = () => {
  const { gettingAUser } = useBankingSystem();

  useEffect(() => {
    gettingAUser();
  }, []);

  return (
    <AdminProtected>
      <div className="min-h-screen bg-slate-100">
        <NavbarDashboardAdmin />
        <DashboardMain />
      </div>
    </AdminProtected>
  )
}

export default DashboardAdmin
