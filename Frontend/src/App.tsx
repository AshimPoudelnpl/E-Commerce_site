import React, { useState, useEffect, useRef } from "react";
import { MyContext, type CartItem, type MyContextType, type UserType } from "./context/MyContext";
import { getData } from "./utils/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import {
  saveCartToFirestore,
  fetchUserCartFromFirestore,
  mergeCarts,
  listenToUserCart,
} from "./services/cartFirestoreSync";
import Header from "./components/Header/Index";
import Footer from "./components/Footer/index";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Productlisting from "./pages/Productlisting";
import ProductDetails from "./pages/ProductDetails";
import Button from "@mui/material/Button";
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ProductZoom from "./components/ProductZoom";
import { IoCloseSharp } from "react-icons/io5";
import ProductDetails1 from "./components/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPanel from "./components/cartPanel";
import Cart from "./pages/Cart";
import Verify from "./components/verify";
import ForgotPassword from "./pages/Forgot-passwprd";
import ResetPassword from "./pages/ResetPassword";
import toast, { Toaster } from "react-hot-toast";
import Checkout from "./pages/Checkout";
import Myaccount from "./pages/Myaccount";
import Mylist from "./pages/Mylist";
import Order from "./pages/Order";

import { initialProducts, getStoredProducts, saveStoredProducts, type Product } from "./types/product";
import { initialCategories, type Category } from "./types/category";

const alertBox = ({ msg, type }: { msg: string; type: string }) => {
  if (type === "success") {
    toast.success(msg);
  } else {
    toast.error(msg);
  }
};

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(initialProducts[0]);
  const [maxWidth] = useState<DialogProps["maxWidth"]>("lg");
  const [fullWidth] = useState(true);
  const [openCartPanel, setCartOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [userData, setUserData] = useState<unknown>(null);
  const [catData, setCatData] = useState<unknown[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Product list state initialized from stored products
  const [productList, setProductList] = useState<Product[]>(() => getStoredProducts());

  // Category list state initialized from initial categories
  const [categoriesList, setCategoriesList] = useState<Category[]>(() => {
    try {
      const stored = localStorage.getItem("app_categories");
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return initialCategories;
  });

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("app_cart");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default initial cart with first product for great immediate UX
    const first = initialProducts[0];
    return [
      {
        id: `${first.id}-M-default`,
        productId: first.id,
        product: first,
        quantity: 1,
        selectedSize: first.sizes?.[0] || "M",
        selectedColor: first.colors?.[0] || "Default",
        price: first.price,
      },
    ];
  });

  const isRemoteUpdateRef = useRef(false);
  const [isCartSyncing, setIsCartSyncing] = useState(false);
  const activeUserId = user?.uid || auth.currentUser?.uid || localStorage.getItem("userUid") || null;

  // Firebase Auth real-time session tracking
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        localStorage.setItem("token", "firebase-token");
        localStorage.setItem("userEmail", firebaseUser.email || "");
        localStorage.setItem("userName", firebaseUser.displayName || "Google User");
        localStorage.setItem("userUid", firebaseUser.uid);
        if (firebaseUser.photoURL) {
          localStorage.setItem("userAvatar", firebaseUser.photoURL);
        }
        setUser((prev) => ({
          ...prev,
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || prev?.name || "Google User",
          email: firebaseUser.email || prev?.email || "",
          avatar: firebaseUser.photoURL || prev?.avatar || "",
        }));
        setIsLogin(true);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Cross-device Cart Synchronization with User Profile in Firestore
  useEffect(() => {
    if (!activeUserId) return;

    let isMounted = true;
    setIsCartSyncing(true);

    // Fetch user profile cart from Firestore and merge with local cart
    fetchUserCartFromFirestore(activeUserId)
      .then((remoteCart) => {
        if (!isMounted) return;

        if (remoteCart && remoteCart.length > 0) {
          setCart((currentLocal) => {
            const merged = mergeCarts(currentLocal, remoteCart);
            isRemoteUpdateRef.current = true;
            // Write merged cart back to Firestore so all user devices receive complete list
            saveCartToFirestore(activeUserId, merged, user || undefined);
            return merged;
          });
        } else {
          // If remote is empty, save local items to user profile in Firestore
          setCart((currentLocal) => {
            if (currentLocal.length > 0) {
              saveCartToFirestore(activeUserId, currentLocal, user || undefined);
            }
            return currentLocal;
          });
        }
      })
      .catch((err) => {
        console.warn("Firestore cart fetch error:", err);
      })
      .finally(() => {
        if (isMounted) setIsCartSyncing(false);
      });

    // Real-time listener for cross-device updates
    const unsubscribeCart = listenToUserCart(activeUserId, (remoteCart) => {
      if (!isMounted) return;
      isRemoteUpdateRef.current = true;
      setCart(remoteCart);
    });

    return () => {
      isMounted = false;
      unsubscribeCart();
    };
  }, [activeUserId]);

  // Save cart to localStorage & sync local cart changes to Firestore user profile
  useEffect(() => {
    try {
      localStorage.setItem("app_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }

    if (isRemoteUpdateRef.current) {
      isRemoteUpdateRef.current = false;
      return;
    }

    if (activeUserId) {
      setIsCartSyncing(true);
      const syncTimeout = setTimeout(() => {
        saveCartToFirestore(activeUserId, cart, user || undefined)
          .catch((err) => console.warn("Firestore cart save error:", err))
          .finally(() => setIsCartSyncing(false));
      }, 300);

      return () => clearTimeout(syncTimeout);
    }
  }, [cart, activeUserId]);

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem("app_wishlist");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [initialProducts[0], initialProducts[4]];
  });

  useEffect(() => {
    try {
      localStorage.setItem("app_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Compare state persisted to localStorage
  const [compareList, setCompareList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem("app_compare");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("app_compare", JSON.stringify(compareList));
    } catch (e) {
      console.error(e);
    }
  }, [compareList]);

  // Cart helpers
  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    const chosenSize = size || product.sizes?.[0] || "Standard";
    const chosenColor = color || product.colors?.[0] || "Standard";
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          quantity,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          price: product.price,
        },
      ];
    });

    toast.success(`Added "${product.name}" to cart!`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    toast.success("Item removed from cart");
  };

  const updateCartQty = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist helpers
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        toast.success(`Removed "${product.name}" from wishlist`);
        return prev.filter((p) => p.id !== product.id);
      }
      toast.success(`Added "${product.name}" to wishlist`);
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Compare helpers
  const toggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        toast.success(`Removed from comparison`);
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        toast.error("Can only compare up to 4 products");
        return prev;
      }
      toast.success(`Added "${product.name}" to comparison`);
      return [...prev, product];
    });
  };

  const isInCompare = (productId: number) => {
    return compareList.some((p) => p.id === productId);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");
    const storedAvatar = localStorage.getItem("userAvatar");
    const storedUid = localStorage.getItem("userUid");

    if (token) {
      if (storedEmail) {
        setUser({
          uid: storedUid || undefined,
          name: storedName || storedEmail.split("@")[0],
          email: storedEmail,
          avatar: storedAvatar || "",
        });
        setIsLogin(true);
      }
      getData("/api/user/user-details").then((res) => {
        if (res?.success && res?.data) {
          setUser((prev) => ({
            ...res.data,
            uid: prev?.uid || storedUid || res.data._id || undefined,
          }));
          setIsLogin(true);
        }
      }).catch(() => {
        // Keeps the local user intact if backend API is not responding
      });
    }

    // Try to fetch categories from backend if available
    getData("/api/category")
      .then((res) => {
        if (res?.categoryList && Array.isArray(res.categoryList) && res.categoryList.length > 0) {
          setCatData(res.categoryList);
        }
      })
      .catch(() => {
        // graceful offline fallback
      });
  }, [isLogin]);

  const apiUrl = import.meta.env.VITE_API_URL || "";

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal(false);
  };

  const toggleCartPannel = (newOpen: boolean) => {
    setCartOpen(newOpen);
  };

  const success = (msg: string) => {
    toast.success(msg);
  };

  const error = (msg: string) => {
    toast.error(msg);
  };

  const values: MyContextType = {
    products: productList,
    setProducts: setProductList,
    categories: categoriesList,
    setCategories: setCategoriesList,
    cart,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    wishlist,
    toggleWishlist,
    isInWishlist,
    compareList,
    toggleCompare,
    isInCompare,
    activeModalProduct,
    setActiveModalProduct,
    searchQuery,
    setSearchQuery,
    openProductDetailsModal,
    setOpenProductDetailsModal,
    openCartPanel,
    setCartOpen,
    toggleCartPannel,
    success,
    error,
    isLogin,
    setIsLogin,
    alertBox,
    apiUrl,
    user,
    setUser,
    userData,
    setUserData,
    catData,
  };

  return (
    <>
      <Toaster position="top-right" />
      <MyContext.Provider value={values}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Productlisting />} />
          <Route path="/search" element={<Productlisting />} />
          <Route path="/productlisting" element={<Productlisting />} />
          <Route path="/productDetails" element={<Productlisting />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/category/:categorySlug" element={<Productlisting />} />
          <Route path="/category/:categorySlug/:subCategorySlug" element={<Productlisting />} />

          {/* Direct Category Route Aliases */}
          <Route path="/fashion" element={<Productlisting />} />
          <Route path="/fashion/:subCategory" element={<Productlisting />} />
          <Route path="/electronics" element={<Productlisting />} />
          <Route path="/electronics/:subCategory" element={<Productlisting />} />
          <Route path="/home-kitchen" element={<Productlisting />} />
          <Route path="/home-kitchen/:subCategory" element={<Productlisting />} />
          <Route path="/beauty" element={<Productlisting />} />
          <Route path="/beauty/:subCategory" element={<Productlisting />} />
          <Route path="/bags" element={<Productlisting />} />
          <Route path="/bags/:subCategory" element={<Productlisting />} />
          <Route path="/shoes" element={<Productlisting />} />
          <Route path="/shoes/:subCategory" element={<Productlisting />} />
          <Route path="/footwear" element={<Productlisting />} />
          <Route path="/sandals" element={<Productlisting />} />
          <Route path="/jewellery" element={<Productlisting />} />
          <Route path="/groceries" element={<Productlisting />} />
          <Route path="/wellness" element={<Productlisting />} />

          {/* User & Commerce Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-account" element={<Myaccount />} />
          <Route path="/my-list" element={<Mylist />} />
          <Route path="/my-orders" element={<Order />} />
        </Routes>
        <Footer />
        <CartPanel />
      </MyContext.Provider>

      {/* Quick View Product Details Modal */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openProductDetailsModal}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogContent className="!p-4 sm:!p-6 relative">
          <Button
            onClick={handleCloseProductDetailsModal}
            className="!w-[36px] !h-[36px] !min-w-[36px] !rounded-full !text-gray-700 hover:!bg-gray-100 !absolute top-3 right-3 z-20"
          >
            <IoCloseSharp size={20} />
          </Button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full productDetailsModalContainer pt-2">
            <div className="w-full md:w-[42%] flex-shrink-0">
              <ProductZoom
                images={
                  activeModalProduct?.images && activeModalProduct.images.length > 0
                    ? activeModalProduct.images
                    : activeModalProduct?.img
                    ? [activeModalProduct.img]
                    : undefined
                }
              />
            </div>
            <div className="w-full md:w-[58%]">
              <ProductDetails1 product={activeModalProduct ?? undefined} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
