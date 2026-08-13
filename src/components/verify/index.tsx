import React, { useState } from 'react'
import verify from '../../assets/verify.png'
import OTPBox from '../OTPBox';

function Verify() {
    const [otp, setOtp] = useState<string>('');
    const handleOtpChange = (value: string) => {
        setOtp(value)
    }
    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10">
                    <img src={verify} alt="verify" className='w-[125px] mx-auto' />
                    <h3 className="text-center text-[18px] p-4">
                        Verify OTP
                    </h3>
                    <OTPBox length={6} onChange={handleOtpChange} />
                </div>
            </div>
        </section>
    )
}

export default Verify;