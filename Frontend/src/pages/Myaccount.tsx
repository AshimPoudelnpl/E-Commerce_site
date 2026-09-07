import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import AcccountSideaBar from "../components/AccountSideBar/index.tsx";
import { putData, getData, postData, deleteData } from "../utils/api";
import { MdOutlineLocationOn, MdEdit, MdDelete, MdAdd } from "react-icons/md";

type Address = {
  _id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
};

const emptyAddr = { fullName: "", phone: "", addressLine: "", city: "", state: "", pincode: "", country: "India", isDefault: false };

function MyAccount() {
  const context = useContext(MyContext);
  const history = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<"profile" | "password" | "address">("profile");
  const [formFields, setFormFields] = useState({ name: "", email: "", mobile: "" });
  const [pwdFields, setPwdFields] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAddr, setEditingAddr] = useState<Address | null>(null);
  const [addrForm, setAddrForm] = useState(emptyAddr);
  const [addrLoading, setAddrLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) history("/login");
  }, [context?.isLogin]);

  useEffect(() => {
    if (context?.user) {
      setFormFields({ name: context.user.name || "", email: context.user.email || "", mobile: context.user.mobile || "" });
    }
  }, [context?.user]);

  useEffect(() => {
    if (activeSection === "address") fetchAddresses();
  }, [activeSection]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await getData("/api/address");
      if (res?.success) setAddresses(res.data);
    } catch { /* silent */ }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormFields({ ...formFields, [e.target.name]: e.target.value });
  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => setPwdFields({ ...pwdFields, [e.target.name]: e.target.value });
  const handleAddrChange = (e: React.ChangeEvent<HTMLInputElement>) => setAddrForm({ ...addrForm, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await putData("/api/user/update-user", { name: formFields.name, email: formFields.email, mobile: formFields.mobile });
      if (res?.success) {
        context.alertBox({ type: "success", msg: "Profile updated successfully!" });
        context.setUser(res.data);
      } else context.alertBox({ type: "error", msg: res?.message || "Failed to update profile" });
    } catch { context.alertBox({ type: "error", msg: "Failed to update profile" }); }
    setIsLoading(false);
  };

  const handleCancel = () => {
    if (context?.user) setFormFields({ name: context.user.name || "", email: context.user.email || "", mobile: context.user.mobile || "" });
  };

  const handleChangePassword = async () => {
    if (!pwdFields.oldPassword || !pwdFields.newPassword || !pwdFields.confirmPassword) {
      context.alertBox({ type: "error", msg: "Please fill in all password fields!" }); return;
    }
    if (pwdFields.newPassword !== pwdFields.confirmPassword) {
      context.alertBox({ type: "error", msg: "New passwords do not match!" }); return;
    }
    if (pwdFields.newPassword.length < 6) {
      context.alertBox({ type: "error", msg: "Password must be at least 6 characters!" }); return;
    }
    setPwdLoading(true);
    try {
      const res = await putData("/api/user/reset-password", { email: context?.user?.email, newPassword: pwdFields.newPassword, confirmPassword: pwdFields.confirmPassword });
      if (res?.success) {
        context.alertBox({ type: "success", msg: "Password changed successfully!" });
        setPwdFields({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else context.alertBox({ type: "error", msg: res?.message || "Failed to change password" });
    } catch { context.alertBox({ type: "error", msg: "Failed to change password" }); }
    setPwdLoading(false);
  };

  const openAddModal = () => { setEditingAddr(null); setAddrForm(emptyAddr); setShowModal(true); };
  const openEditModal = (addr: Address) => { setEditingAddr(addr); setAddrForm({ fullName: addr.fullName, phone: addr.phone, addressLine: addr.addressLine, city: addr.city, state: addr.state, pincode: addr.pincode, country: addr.country, isDefault: addr.isDefault }); setShowModal(true); };

  const handleAddrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddrLoading(true);
    try {
      const res = editingAddr
        ? await putData(`/api/address/${editingAddr._id}`, addrForm as unknown as Record<string, unknown>)
        : await postData("/api/address/add", addrForm as unknown as Record<string, unknown>);
      if (res?.success) {
        context.alertBox({ type: "success", msg: editingAddr ? "Address updated!" : "Address added!" });
        setShowModal(false);
        fetchAddresses();
      } else context.alertBox({ type: "error", msg: res?.message || "Failed to save address" });
    } catch { context.alertBox({ type: "error", msg: "Failed to save address" }); }
    setAddrLoading(false);
  };

  const handleDeleteAddr = async (id: string) => {
    if (!confirm("Delete this address?")) return;
    try {
      const res = await deleteData(`/api/address/${id}`);
      if (res?.success) { context.alertBox({ type: "success", msg: "Address deleted!" }); fetchAddresses(); }
    } catch { context.alertBox({ type: "error", msg: "Failed to delete address" }); }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const res = await putData(`/api/address/${id}/set-default`);
      if (res?.success) fetchAddresses();
    } catch { /* silent */ }
  };

  return (
    <section className="bg-[#f3f1ee] min-h-screen py-10">
      <div className="container w-[80%] max-w-[80%] flex gap-3">
        <AcccountSideaBar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="rightContent w-[75%]">

          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="bg-white rounded-md shadow-sm p-5">
              <h3 className="text-[18px] font-semibold text-gray-700 pb-4 border-b border-gray-300">My Profile</h3>
              <div className="grid grid-cols-2 gap-4 mt-5">
                <input type="text" name="name" placeholder="Full Name" value={formFields.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-3 text-[14px] outline-none focus:border-[#e8623d]" />
                <input type="email" name="email" placeholder="Email" value={formFields.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-3 text-[14px] outline-none focus:border-[#e8623d]" />
                <input type="text" name="mobile" placeholder="Phone Number" value={formFields.mobile} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-3 text-[14px] outline-none focus:border-[#e8623d]" />
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={handleSave} disabled={isLoading} className="bg-[#e8623d] text-white px-8 py-3 rounded-md text-[14px] font-medium hover:bg-[#d95734] transition disabled:opacity-60">
                  {isLoading ? "SAVING..." : "SAVE"}
                </button>
                <button onClick={handleCancel} className="border border-[#e8623d] text-[#e8623d] px-7 py-3 rounded-md text-[14px] font-medium hover:bg-[#fdf1ee] transition">CANCEL</button>
              </div>

              {/* Address inside profile */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[16px] font-semibold text-gray-700">My Addresses</h4>
                  <button onClick={() => { fetchAddresses(); openAddModal(); }} className="flex items-center gap-1 bg-[#e8623d] text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-[#d95734] transition">
                    <MdAdd className="text-[16px]" /> Add Address
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                    <MdOutlineLocationOn className="text-[40px] mb-2" />
                    <p className="text-[13px]">No addresses saved yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {addresses.map((addr) => (
                      <div key={addr._id} className={`border rounded-md p-4 relative ${addr.isDefault ? "border-[#e8623d] bg-[#fdf9f8]" : "border-gray-200"}`}>
                        {addr.isDefault && <span className="absolute top-3 right-3 text-[11px] bg-[#e8623d] text-white px-2 py-0.5 rounded-full">Default</span>}
                        <p className="font-semibold text-gray-800 text-[14px]">{addr.fullName} &nbsp;|&nbsp; {addr.phone}</p>
                        <p className="text-gray-600 text-[13px] mt-1">{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-gray-500 text-[13px]">{addr.country}</p>
                        <div className="flex items-center gap-3 mt-3">
                          {!addr.isDefault && (
                            <button onClick={() => handleSetDefault(addr._id)} className="text-[12px] text-[#e8623d] border border-[#e8623d] px-3 py-1 rounded-md hover:bg-[#fdf1ee] transition">Set as Default</button>
                          )}
                          <button onClick={() => openEditModal(addr)} className="flex items-center gap-1 text-[12px] text-gray-600 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-50 transition">
                            <MdEdit className="text-[14px]" /> Edit
                          </button>
                          <button onClick={() => handleDeleteAddr(addr._id)} className="flex items-center gap-1 text-[12px] text-red-500 border border-red-200 px-3 py-1 rounded-md hover:bg-red-50 transition">
                            <MdDelete className="text-[14px]" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Password Section */}
          {activeSection === "password" && (
            <div className="bg-white rounded-md shadow-sm p-5">
              <h3 className="text-[18px] font-semibold text-gray-700 pb-4 border-b border-gray-300">Change Password</h3>
              <div className="grid grid-cols-2 gap-4 mt-5">
                <input type="password" name="oldPassword" placeholder="Old Password" value={pwdFields.oldPassword} onChange={handlePwdChange} className="w-full border border-gray-300 rounded-md px-3 py-3 text-[14px] outline-none focus:border-[#e8623d]" />
                <input type="password" name="newPassword" placeholder="New Password" value={pwdFields.newPassword} onChange={handlePwdChange} className="w-full border border-gray-300 rounded-md px-3 py-3 text-[14px] outline-none focus:border-[#e8623d]" />
                <input type="password" name="confirmPassword" placeholder="Confirm New Password" value={pwdFields.confirmPassword} onChange={handlePwdChange} className="w-full border border-gray-300 rounded-md px-3 py-3 text-[14px] outline-none focus:border-[#e8623d]" />
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={handleChangePassword} disabled={pwdLoading} className="bg-[#e8623d] text-white px-8 py-3 rounded-md text-[14px] font-medium hover:bg-[#d95734] transition disabled:opacity-60">
                  {pwdLoading ? "SAVING..." : "CHANGE PASSWORD"}
                </button>
                <button onClick={() => setPwdFields({ oldPassword: "", newPassword: "", confirmPassword: "" })} className="border border-[#e8623d] text-[#e8623d] px-7 py-3 rounded-md text-[14px] font-medium hover:bg-[#fdf1ee] transition">CANCEL</button>
              </div>
            </div>
          )}

          {/* Address Section */}
          {activeSection === "address" && (
            <div className="bg-white rounded-md shadow-sm p-5">
              <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h3 className="text-[18px] font-semibold text-gray-700">My Addresses</h3>
                <button onClick={openAddModal} className="flex items-center gap-1 bg-[#e8623d] text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-[#d95734] transition">
                  <MdAdd className="text-[16px]" /> Add Address
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-14 text-gray-400">
                  <MdOutlineLocationOn className="text-[50px] mb-2" />
                  <p className="text-[14px]">No addresses saved yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 mt-5">
                  {addresses.map((addr) => (
                    <div key={addr._id} className={`border rounded-md p-4 relative ${addr.isDefault ? "border-[#e8623d] bg-[#fdf9f8]" : "border-gray-200"}`}>
                      {addr.isDefault && <span className="absolute top-3 right-3 text-[11px] bg-[#e8623d] text-white px-2 py-0.5 rounded-full">Default</span>}
                      <p className="font-semibold text-gray-800 text-[14px]">{addr.fullName} &nbsp;|&nbsp; {addr.phone}</p>
                      <p className="text-gray-600 text-[13px] mt-1">{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-gray-500 text-[13px]">{addr.country}</p>
                      <div className="flex items-center gap-3 mt-3">
                        {!addr.isDefault && (
                          <button onClick={() => handleSetDefault(addr._id)} className="text-[12px] text-[#e8623d] border border-[#e8623d] px-3 py-1 rounded-md hover:bg-[#fdf1ee] transition">
                            Set as Default
                          </button>
                        )}
                        <button onClick={() => openEditModal(addr)} className="flex items-center gap-1 text-[12px] text-gray-600 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-50 transition">
                          <MdEdit className="text-[14px]" /> Edit
                        </button>
                        <button onClick={() => handleDeleteAddr(addr._id)} className="flex items-center gap-1 text-[12px] text-red-500 border border-red-200 px-3 py-1 rounded-md hover:bg-red-50 transition">
                          <MdDelete className="text-[14px]" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Address Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6">
            <h3 className="text-[17px] font-semibold text-gray-800 mb-5">{editingAddr ? "Edit Address" : "Add New Address"}</h3>
            <form onSubmit={handleAddrSubmit} className="grid grid-cols-2 gap-3">
              <input name="fullName" placeholder="Full Name *" value={addrForm.fullName} onChange={handleAddrChange} required className="col-span-2 border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-[#e8623d]" />
              <input name="phone" placeholder="Phone *" value={addrForm.phone} onChange={handleAddrChange} required className="col-span-2 border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-[#e8623d]" />
              <input name="addressLine" placeholder="Address Line *" value={addrForm.addressLine} onChange={handleAddrChange} required className="col-span-2 border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-[#e8623d]" />
              <input name="city" placeholder="City *" value={addrForm.city} onChange={handleAddrChange} required className="border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-[#e8623d]" />
              <input name="state" placeholder="State *" value={addrForm.state} onChange={handleAddrChange} required className="border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-[#e8623d]" />
              <input name="pincode" placeholder="Pincode *" value={addrForm.pincode} onChange={handleAddrChange} required className="border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-[#e8623d]" />
              <input name="country" placeholder="Country" value={addrForm.country} onChange={handleAddrChange} className="border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-[#e8623d]" />
              <label className="col-span-2 flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer">
                <input type="checkbox" checked={addrForm.isDefault} onChange={(e) => setAddrForm({ ...addrForm, isDefault: e.target.checked })} className="accent-[#e8623d]" />
                Set as default address
              </label>
              <div className="col-span-2 flex gap-3 mt-2">
                <button type="submit" disabled={addrLoading} className="bg-[#e8623d] text-white px-7 py-2.5 rounded-md text-[13px] font-medium hover:bg-[#d95734] transition disabled:opacity-60">
                  {addrLoading ? "Saving..." : editingAddr ? "Update" : "Add Address"}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="border border-gray-300 text-gray-600 px-7 py-2.5 rounded-md text-[13px] font-medium hover:bg-gray-50 transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default MyAccount;
