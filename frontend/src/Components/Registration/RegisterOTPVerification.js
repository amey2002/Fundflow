import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useBankingSystem } from '../Context/UserContext'
import { toast } from 'react-hot-toast'
import  SyncLoader from "react-spinners/SyncLoader"


const RegisterOTPVerification = () => {

    const navigateTo =useNavigate();
     const [otp, setOtp] = useState(() => sessionStorage.getItem("signupOtp") || "");
     const [otpCount, setOtpCount] = useState(0);
     const [isLoading, setIsLoading] = useState(false);
     const [displayOtp, setDisplayOtp] = useState(() => sessionStorage.getItem("signupOtp") || "");
      const maxOtpCount = 3;
        const {BASE_URL} =useBankingSystem();

        const handleOtpVerificationRegister= async (e)=>{
            e.preventDefault();

            if (!otp || !String(otp).trim()) {
              toast.error("Please enter the OTP");
              return;
            }

            try {
              setIsLoading(true);
              const resp =  await axios.post(`${BASE_URL}/api/v1/otp`,{ otp: String(otp).trim() });
              if (resp.status === 200) {
                  sessionStorage.removeItem("signupOtp");
                  toast.success("Email verified successfully! Please login!");
                  navigateTo("/login");
              }
            } catch (error) {
              const message = error?.response?.data?.message || "Invalid OTP. Please try again.";
              toast.error(message);
            } finally {
              setIsLoading(false);
            }

        }

        const userId = sessionStorage.getItem("userId");

        
        const handleResendOTP = async (e) =>{
          e.preventDefault();

          if (!userId) {
            toast.error("Session expired. Please register again.");
            navigateTo("/signup");
            return;
          }

          if (otpCount >= maxOtpCount) {
            toast.error("You have reached the maximum number of OTPs that can be sent.");
            return;
          }

          try {
            setIsLoading(true)
            const resp = await axios.post(`${BASE_URL}/api/v1/resend-otp/${userId}`)
            if (resp.status === 200) {
              if (resp.data.otp) {
                sessionStorage.setItem("signupOtp", resp.data.otp);
                setDisplayOtp(resp.data.otp);
                setOtp(resp.data.otp);
              }
              if (resp.data.emailSent) {
                toast.success("OTP sent to your email");
              } else {
                toast.success(`New OTP: ${resp.data.otp}`);
              }
              setOtpCount(otpCount+1);
            }
          } catch (error) {
            toast.error(error?.response?.data?.message || "Could not resend OTP");
          } finally {
            setIsLoading(false)
          }
        }
              

    

  return (
    <>
        {isLoading ? (
        <div className='flex flex-row justify-center items-center  h-[100vh]'>
           <SyncLoader
          margin={10}
          size={20}
          speedMultiplier={1}
           color={"#5145CD"}
           loading={isLoading}
           aria-label="Loading Spinner"
           data-testid="loader"
         />
         </div>
    ) : (
<div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
  <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-col text-sm font-medium text-gray-500 gap-2">
          <p>Enter the 6-digit verification code.</p>
          {displayOtp ? (
            <p className="text-blue-700 font-semibold text-base">
              Your OTP: <span className="tracking-widest text-xl">{displayOtp}</span>
            </p>
          ) : (
            <p className="text-amber-600">If email did not arrive, click Resend to get a new OTP on this screen.</p>
          )}
        </div>
      </div>
      <div>
        <form  onSubmit={handleOtpVerificationRegister}  >
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div className="w-[20rem] h-16 ">
                <input value={otp} onChange={(e)=>{setOtp(e.target.value)}} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="otp" id="otp" inputMode="numeric" maxLength={6} placeholder="000000"/>
              </div>

            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                  Verify Account
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't receive code?</p>
                <button type="button" onClick={handleResendOTP} className="text-blue-600 underline bg-transparent border-0 cursor-pointer p-0">
                  Resend
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
    )
}
    </>
  )
}

export default RegisterOTPVerification
