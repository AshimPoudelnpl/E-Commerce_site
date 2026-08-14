import AcccountSideaBar from "../components/AccountSideBar/index.tsx";



function MyAccount() {


    return (
        <section className="bg-[#f3f1ee] min-h-screen py-10">
            <div className="container w-[80%] max-w-[80%] flex gap-3">

                {/* Sidebar */}

                <AcccountSideaBar />
                {/* Right Content */}
                <div className="rightContent w-[75%]">

                    {/* My Profile Header */}
                    <div className="bg-white rounded-md shadow-sm p-5">

                        <h3 className="text-[18px] font-semibold text-gray-700 pb-4 border-b border-gray-300">
                            My Profile
                        </h3>

                        <div className="grid grid-cols-2 gap-4 mt-5">

                            {/* Full Name */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full border border-gray-300 rounded-md px-3 py-3 text-[14px] outline-none focus:border-[#e8623d]"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border border-gray-300 rounded-md px-3 py-3 text-[14px] outline-none focus:border-[#e8623d]"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    className="w-full border border-gray-300 rounded-md px-3 py-3 text-[14px] outline-none focus:border-[#e8623d]"
                                />
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-5">

                            <button
                                type="button"
                                className="bg-[#e8623d] text-white px-8 py-3 rounded-md text-[14px] font-medium hover:bg-[#d95734] transition"
                            >
                                SAVE
                            </button>

                            <button
                                type="button"
                                className="border border-[#e8623d] text-[#e8623d] px-7 py-3 rounded-md text-[14px] font-medium hover:bg-[#fdf1ee] transition"
                            >
                                CANCEL
                            </button>

                        </div>
                    </div>



                </div>
            </div>
        </section>
    );
}

export default MyAccount;