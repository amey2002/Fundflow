import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBankingSystem } from "../Context/UserContext";
import SyncLoader from "react-spinners/SyncLoader";

/**
 * Ensures admin pages wait for user profile load before role checks.
 * Prevents blank screen when userDetails is still undefined.
 */
const AdminProtected = ({ children }) => {
  const navigateTo = useNavigate();
  const { userDetails, gettingAUser } = useBankingSystem();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const boot = async () => {
      if (!sessionStorage.getItem("jwtToken")) {
        navigateTo("/login");
        return;
      }
      try {
        await gettingAUser();
      } catch (e) {
        console.log(e);
      }
      setReady(true);
    };
    boot();
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!userDetails) return;
    if (userDetails.role !== "ADMIN") {
      navigateTo("/dashboard");
    }
  }, [ready, userDetails, navigateTo]);

  if (!ready || !userDetails) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <SyncLoader color="#1d4ed8" size={14} />
      </div>
    );
  }

  if (userDetails.role !== "ADMIN") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-700">
        Redirecting...
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtected;
