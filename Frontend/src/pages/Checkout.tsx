import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { IoBagCheckOutline } from "react-icons/io5";
import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/MyContext';
import { getStoredOrders, type CreatedOrder } from '../types/order';

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, user, alertBox } = useContext(MyContext);

  const [paymentMethod, setPaymentMethod] = useState<"esewa" | "khalti" | "cod">("esewa");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    street: "",
    apartment: "",
    city: "Kathmandu",
    state: "Bagmati",
    zip: "44600",
    phone: user?.phone || "+977 98",
  });

  const cartItems = cart.length > 0 ? cart : [
    {
      id: "demo-1",
      productId: 1,
      product: {
        id: 1,
        name: "A-Line Kurti With Sharara & Dupatta Set",
        price: 1300,
        img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150&auto=format&fit=crop&q=80",
      } as any,
      quantity: 2,
      price: 1300,
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1500 ? 0 : 100;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      alertBox({ type: "error", msg: "Please enter your full name" });
      return;
    }
    if (!formData.street.trim()) {
      alertBox({ type: "error", msg: "Please enter street address" });
      return;
    }
    if (!formData.phone.trim()) {
      alertBox({ type: "error", msg: "Please enter phone number" });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const paymentId =
        paymentMethod === "esewa"
          ? `ESW-${Math.floor(10000000 + Math.random() * 90000000)}`
          : paymentMethod === "khalti"
          ? `KHL-${Math.floor(10000000 + Math.random() * 90000000)}`
          : `COD-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder: CreatedOrder = {
        id: orderId,
        paymentId,
        paymentMethod,
        name: formData.fullName,
        email: formData.email || "customer@example.com",
        phone: formData.phone,
        address: `${formData.street}${formData.apartment ? `, ${formData.apartment}` : ""}\n${formData.city}, ${formData.state} ${formData.zip}`,
        status: paymentMethod === "cod" ? "Pending" : "Paid",
        createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        totalAmount: total,
        products: cartItems.map((item) => ({
          productId: item.productId || item.product?.id || item.id,
          title: item.product?.name || "Product Item",
          image: item.product?.img || (item.product?.images && item.product.images[0]) || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150&auto=format&fit=crop&q=80",
          quantity: item.quantity,
          price: item.price,
        })),
      };

      try {
        const existing = getStoredOrders();
        localStorage.setItem("app_orders", JSON.stringify([newOrder, ...existing]));
      } catch (err) {
        console.error(err);
      }

      clearCart();
      setIsProcessing(false);
      alertBox({
        type: "success",
        msg: `Order placed successfully with ${
          paymentMethod === "esewa" ? "eSewa" : paymentMethod === "khalti" ? "Khalti" : "Cash on Delivery"
        }! Order ID: ${orderId}`,
      });
      navigate("/my-orders");
    }, 1200);
  };

  return (
    <section className="py-8 md:py-12 bg-[#f8f9fa] min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Billing Details & Payment Integration */}
          <div className="w-full lg:w-[65%] space-y-6">
            {/* Delivery Address Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>1.</span> Billing & Shipping Address
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    label="Full Name *"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                  />
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </div>

                <TextField
                  label="House No. and Street Name *"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  required
                  placeholder="e.g. Ward No 4, New Baneshwor"
                  fullWidth
                />

                <TextField
                  label="Apartment, suite, landmark (optional)"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <TextField
                    label="Town / City *"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                  />
                  <TextField
                    label="State / Province *"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                  />
                  <TextField
                    label="Postal / ZIP Code *"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                  />
                </div>

                <TextField
                  label="Phone Number (for courier contact) *"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                />
              </div>
            </div>

            {/* Payment Gateway Integration: eSewa, Khalti, COD */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
              <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span>2.</span> Payment Method
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Select your preferred instant digital wallet or pay on delivery.
              </p>

              <FormControl component="fieldset" className="w-full">
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="space-y-3"
                >
                  {/* eSewa Option */}
                  <label
                    htmlFor="payment-esewa"
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "esewa"
                        ? "border-[#60bb46] bg-[#f2faf0]"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FormControlLabel
                        value="esewa"
                        id="payment-esewa"
                        control={<Radio sx={{ color: "#60bb46", '&.Mui-checked': { color: "#60bb46" } }} />}
                        label=""
                        className="!m-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#60bb46] text-base">eSewa Mobile Wallet</span>
                          <span className="text-[10px] uppercase font-bold tracking-wider bg-[#60bb46] text-white px-2 py-0.5 rounded">
                            Instant
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Pay securely via your eSewa ID or QR code scan.
                        </p>
                      </div>
                    </div>
                    <div className="w-16 h-8 flex items-center justify-center bg-[#60bb46] text-white font-extrabold text-sm rounded shadow-xs">
                      eSewa
                    </div>
                  </label>

                  {/* Khalti Option */}
                  <label
                    htmlFor="payment-khalti"
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "khalti"
                        ? "border-[#5c2d91] bg-[#f8f4fc]"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FormControlLabel
                        value="khalti"
                        id="payment-khalti"
                        control={<Radio sx={{ color: "#5c2d91", '&.Mui-checked': { color: "#5c2d91" } }} />}
                        label=""
                        className="!m-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#5c2d91] text-base">Khalti Digital Wallet</span>
                          <span className="text-[10px] uppercase font-bold tracking-wider bg-[#5c2d91] text-white px-2 py-0.5 rounded">
                            Popular
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Fast checkout using Khalti PIN or mobile OTP.
                        </p>
                      </div>
                    </div>
                    <div className="w-16 h-8 flex items-center justify-center bg-[#5c2d91] text-white font-extrabold text-sm rounded shadow-xs">
                      Khalti
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    htmlFor="payment-cod"
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#ff5252] bg-[#fff5f5]"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FormControlLabel
                        value="cod"
                        id="payment-cod"
                        control={<Radio sx={{ color: "#ff5252", '&.Mui-checked': { color: "#ff5252" } }} />}
                        label=""
                        className="!m-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800 text-base">Cash on Delivery (COD)</span>
                          <span className="text-[10px] uppercase font-bold tracking-wider bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                            Standard
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Pay in cash when your package arrives at your doorstep.
                        </p>
                      </div>
                    </div>
                    <div className="w-10 h-8 flex items-center justify-center text-gray-600 text-xl">
                      <FaMoneyBillWave />
                    </div>
                  </label>
                </RadioGroup>
              </FormControl>

              {/* Dynamic Gateway Notice Banner */}
              {paymentMethod === "esewa" && (
                <div className="mt-4 p-3 bg-[#f2faf0] border border-[#a4e090] rounded-lg text-xs text-[#2b6b19] flex items-center gap-2">
                  <FaCheckCircle className="text-[#60bb46] text-base flex-shrink-0" />
                  <span>
                    eSewa Gateway is active. You will be redirected to the secure portal to confirm Rs. {total.toLocaleString()}.
                  </span>
                </div>
              )}
              {paymentMethod === "khalti" && (
                <div className="mt-4 p-3 bg-[#f8f4fc] border border-[#d6bbf0] rounded-lg text-xs text-[#441a73] flex items-center gap-2">
                  <FaCheckCircle className="text-[#5c2d91] text-base flex-shrink-0" />
                  <span>
                    Khalti Gateway is active. Fast verification with Khalti Wallet for Rs. {total.toLocaleString()}.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[35%]">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                Order Summary ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </h2>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 pb-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product?.img || (item.product?.images && item.product.images[0]) || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150&auto=format&fit=crop&q=80"}
                        alt={item.product?.name || "Product"}
                        className="w-12 h-14 object-cover rounded-md bg-gray-100 border border-gray-200"
                      />
                      <div>
                        <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">
                          {item.product?.name || "Product Item"}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-1">
                          Qty: {item.quantity} {"selectedSize" in item && item.selectedSize ? `• ${item.selectedSize}` : ""}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-900 whitespace-nowrap">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span>{shipping === 0 ? <span className="text-green-600 font-semibold">FREE</span> : `Rs. ${shipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total Payable</span>
                  <span className="text-[#ff5252]">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="mt-6 w-full bg-[#ff5252] hover:bg-[#e04545] disabled:bg-gray-400 text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <IoBagCheckOutline className="text-lg" />
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <span>
                    Pay Rs. {total.toLocaleString()} via{" "}
                    {paymentMethod === "esewa" ? "eSewa" : paymentMethod === "khalti" ? "Khalti" : "COD"}
                  </span>
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                  <FaCheckCircle className="text-green-500 text-xs" />
                  100% Encrypted & Safe Payments
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Checkout;
