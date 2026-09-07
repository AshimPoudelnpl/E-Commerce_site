import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { MdPerson, MdLock, MdOutlineLocationOn, MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { putData, uploadData, getData, postData, deleteData } from "../../utils/api";
import { MyContext } from "../../App";
import toast, { Toaster } from "react-hot-toast";

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

const Profile = () => {
  const { setAvatar: setContextAvatar } = useContext(MyContext);
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [activeTab, setActiveTab] = useState<"profile" | "password" | "address">("profile");
  const [avatar, setAvatar] = useState<string>(storedUser?.avatar || "");
  const [name, setName] = useState(storedUser?.name || "");
  const [email, setEmail] = useState(storedUser?.email || "");
  const [mobile, setMobile] = useState(storedUser?.mobile || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAddr, setEditingAddr] = useState<Address | null>(null);
  const [addrForm, setAddrForm] = useState(emptyAddr);
  const [addrLoading, setAddrLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "address") fetchAddresses();
  }, [activeTab]);

  const fetchAddresses = async () => {
    try {
      const res = await getData("/api/address");
      if (res?.success) setAddresses(res.data);
    } catch { /* silent */ }
  };

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setAvatar(localUrl);
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const res = await uploadData("/api/user/upload-avatar", formData);
      const url = res?.avatar || res?.data?.avatar;
      if (url) {
        setAvatar(url);
        setContextAvatar(url);
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...user, avatar: url }));
        localStorage.setItem("adminAvatar", url);
      }
    } catch {
      toast.error("Avatar upload failed");
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await putData("/api/user/update-user", { name, email, mobile });
      if (res?.success) {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...user, name, email, mobile }));
        toast.success("Profile updated successfully");
      } else toast.error(res?.message || "Update failed");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setIsLoading(true);
    try {
      const res = await putData("/api/user/reset-password", { email, newPassword, confirmPassword });
      if (res?.success) {
        toast.success("Password changed successfully");
        setOldPassword(""); setNewPassword(""); setConfirmPassword("");
      } else toast.error(res?.message || "Failed to change password");
    } catch {
      toast.error("Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => { setEditingAddr(null); setAddrForm(emptyAddr); setShowModal(true); };
  const openEditModal = (addr: Address) => {
    setEditingAddr(addr);
    setAddrForm({ fullName: addr.fullName, phone: addr.phone, addressLine: addr.addressLine, city: addr.city, state: addr.state, pincode: addr.pincode, country: addr.country, isDefault: addr.isDefault });
    setShowModal(true);
  };

  const handleAddrChange = (e: React.ChangeEvent<HTMLInputElement>) => setAddrForm({ ...addrForm, [e.target.name]: e.target.value });

  const handleAddrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddrLoading(true);
    try {
      const res = editingAddr
        ? await putData(`/api/address/${editingAddr._id}`, addrForm as unknown as Record<string, unknown>)
        : await postData("/api/address/add", addrForm as unknown as Record<string, unknown>);
      if (res?.success) {
        toast.success(editingAddr ? "Address updated!" : "Address added!");
        setShowModal(false);
        fetchAddresses();
      } else toast.error(res?.message || "Failed to save address");
    } catch {
      toast.error("Failed to save address");
    } finally {
      setAddrLoading(false);
    }
  };

  const handleDeleteAddr = async (id: string) => {
    if (!confirm("Delete this address?")) return;
    try {
      const res = await deleteData(`/api/address/${id}`);
      if (res?.success) { toast.success("Address deleted!"); fetchAddresses(); }
    } catch { toast.error("Failed to delete address"); }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const res = await putData(`/api/address/${id}/set-default`);
      if (res?.success) fetchAddresses();
    } catch { /* silent */ }
  };

  const tabs: { key: "profile" | "password" | "address"; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "Profile", icon: <MdPerson className="text-lg" /> },
    { key: "address", label: "Addresses", icon: <MdOutlineLocationOn className="text-lg" /> },
    { key: "password", label: "Change Password", icon: <MdLock className="text-lg" /> },
  ];

  return (
    <Box className="max-w-3xl mx-auto">
      <Toaster position="top-right" />

      {/* Avatar + name header */}
      <div className="bg-white rounded-md border border-[rgba(0,0,0,0.1)] p-6 mb-5 flex items-center gap-5">
        <div className="relative group cursor-pointer" onClick={() => fileRef.current?.click()}>
          <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center flex-shrink-0">
            {avatar ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" /> : <span className="text-white text-3xl font-bold">A</span>}
          </div>
          <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <FaCloudUploadAlt className="text-white text-xl" />
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onChangeFile} />
        </div>
        <div>
          <Typography className="!text-[20px] !font-bold !text-gray-800">{name || "Admin"}</Typography>
          <Typography className="!text-[13px] !text-gray-500">{email}</Typography>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-md border border-[rgba(0,0,0,0.1)] overflow-hidden">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition ${activeTab === tab.key ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Box component="form" onSubmit={handleProfileSave} className="flex flex-col gap-4">
              <div>
                <Typography className="!text-[13px] !font-medium !text-gray-700 !mb-1.5">Full Name</Typography>
                <TextField fullWidth size="small" value={name} onChange={(e) => setName(e.target.value)} slotProps={{ input: { className: "!rounded-md" } }} />
              </div>
              <div>
                <Typography className="!text-[13px] !font-medium !text-gray-700 !mb-1.5">Email</Typography>
                <TextField fullWidth size="small" type="email" value={email} onChange={(e) => setEmail(e.target.value)} slotProps={{ input: { className: "!rounded-md" } }} />
              </div>
              <div>
                <Typography className="!text-[13px] !font-medium !text-gray-700 !mb-1.5">Mobile</Typography>
                <PhoneInput defaultCountry="us" value={mobile} onChange={(phone) => setMobile(phone)} style={{ width: "100%" }} inputStyle={{ width: "100%", height: "40px", fontSize: "14px", borderRadius: "6px" }} />
              </div>
              <Button type="submit" variant="contained" disabled={isLoading} className="!bg-blue-600 !capitalize !text-[14px] !font-semibold !py-2.5 !rounded-md !shadow-none hover:!bg-blue-700 !w-fit !px-8">
                {isLoading ? <CircularProgress size={20} color="inherit" /> : "Save Changes"}
              </Button>
            </Box>
          )}

          {/* Address Tab */}
          {activeTab === "address" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <Typography className="!text-[15px] !font-semibold !text-gray-700">My Addresses</Typography>
                <Button onClick={openAddModal} variant="contained" className="!bg-blue-600 !capitalize !text-[13px] !shadow-none hover:!bg-blue-700 !rounded-md">
                  <MdAdd className="mr-1 text-[16px]" /> Add Address
                </Button>
              </div>

              {addresses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-14 text-gray-400">
                  <MdOutlineLocationOn className="text-[50px] mb-2" />
                  <p className="text-[13px]">No addresses saved yet.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {addresses.map((addr) => (
                    <div key={addr._id} className={`border rounded-md p-4 relative ${addr.isDefault ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
                      {addr.isDefault && <span className="absolute top-3 right-3 text-[11px] bg-blue-600 text-white px-2 py-0.5 rounded-full">Default</span>}
                      <p className="font-semibold text-gray-800 text-[14px]">{addr.fullName} &nbsp;|&nbsp; {addr.phone}</p>
                      <p className="text-gray-600 text-[13px] mt-1">{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-gray-500 text-[13px]">{addr.country}</p>
                      <div className="flex items-center gap-2 mt-3">
                        {!addr.isDefault && (
                          <button onClick={() => handleSetDefault(addr._id)} className="text-[12px] text-blue-600 border border-blue-300 px-3 py-1 rounded-md hover:bg-blue-50 transition">Set as Default</button>
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

          {/* Password Tab */}
          {activeTab === "password" && (
            <Box component="form" onSubmit={handlePasswordSave} className="flex flex-col gap-4">
              {[
                { label: "Old Password", value: oldPassword, set: setOldPassword, show: showOld, toggle: () => setShowOld(p => !p) },
                { label: "New Password", value: newPassword, set: setNewPassword, show: showNew, toggle: () => setShowNew(p => !p) },
                { label: "Confirm Password", value: confirmPassword, set: setConfirmPassword, show: showConfirm, toggle: () => setShowConfirm(p => !p) },
              ].map(({ label, value, set, show, toggle }) => (
                <div key={label}>
                  <Typography className="!text-[13px] !font-medium !text-gray-700 !mb-1.5">{label}</Typography>
                  <TextField fullWidth size="small" type={show ? "text" : "password"} value={value} onChange={(e) => set(e.target.value)}
                    slotProps={{ input: { className: "!rounded-md", endAdornment: (<InputAdornment position="end"><IconButton onClick={toggle} edge="end" size="small">{show ? <IoEyeOffOutline className="text-gray-500" /> : <IoEyeOutline className="text-gray-500" />}</IconButton></InputAdornment>) } }} />
                </div>
              ))}
              <Button type="submit" variant="contained" disabled={isLoading} className="!bg-blue-600 !capitalize !text-[14px] !font-semibold !py-2.5 !rounded-md !shadow-none hover:!bg-blue-700 !w-fit !px-8">
                {isLoading ? <CircularProgress size={20} color="inherit" /> : "Update Password"}
              </Button>
            </Box>
          )}
        </div>
      </div>

      {/* Address Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6">
            <h3 className="text-[17px] font-semibold text-gray-800 mb-5">{editingAddr ? "Edit Address" : "Add New Address"}</h3>
            <form onSubmit={handleAddrSubmit} className="grid grid-cols-2 gap-3">
              <input name="fullName" placeholder="Full Name *" value={addrForm.fullName} onChange={handleAddrChange} required className="col-span-2 border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-blue-500" />
              <input name="phone" placeholder="Phone *" value={addrForm.phone} onChange={handleAddrChange} required className="col-span-2 border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-blue-500" />
              <input name="addressLine" placeholder="Address Line *" value={addrForm.addressLine} onChange={handleAddrChange} required className="col-span-2 border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-blue-500" />
              <input name="city" placeholder="City *" value={addrForm.city} onChange={handleAddrChange} required className="border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-blue-500" />
              <input name="state" placeholder="State *" value={addrForm.state} onChange={handleAddrChange} required className="border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-blue-500" />
              <input name="pincode" placeholder="Pincode *" value={addrForm.pincode} onChange={handleAddrChange} required className="border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-blue-500" />
              <input name="country" placeholder="Country" value={addrForm.country} onChange={handleAddrChange} className="border border-gray-300 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-blue-500" />
              <label className="col-span-2 flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer">
                <input type="checkbox" checked={addrForm.isDefault} onChange={(e) => setAddrForm({ ...addrForm, isDefault: e.target.checked })} className="accent-blue-600" />
                Set as default address
              </label>
              <div className="col-span-2 flex gap-3 mt-2">
                <button type="submit" disabled={addrLoading} className="bg-blue-600 text-white px-7 py-2.5 rounded-md text-[13px] font-medium hover:bg-blue-700 transition disabled:opacity-60">
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
    </Box>
  );
};

export default Profile;
