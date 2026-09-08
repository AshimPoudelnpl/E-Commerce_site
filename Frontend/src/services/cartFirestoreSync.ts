import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import type { FirebaseError } from "firebase/app";
import { db } from "../firebase/config";
import type { CartItem, UserType } from "../context/MyContext";

// Clean cart item for Firestore serialization (removes any undefined properties)
export const sanitizeCartForFirestore = (cart: CartItem[]): CartItem[] => {
  return cart.map((item) => ({
    id: item.id,
    productId: Number(item.productId),
    quantity: Number(item.quantity) || 1,
    price: Number(item.price) || 0,
    selectedSize: item.selectedSize || "Standard",
    selectedColor: item.selectedColor || "Default",
    product: {
      id: Number(item.product?.id || item.productId),
      name: item.product?.name || "Product",
      price: Number(item.product?.price || item.price),
      oldPrice: Number(
        item.product?.oldPrice || item.product?.price || item.price,
      ),
      category: item.product?.category || "General",
      categorySlug: item.product?.categorySlug || "general",
      rating: item.product?.rating ? Number(item.product.rating) : 5,
      reviewsCount: item.product?.reviewsCount
        ? Number(item.product.reviewsCount)
        : 0,
      countInStock: Number(item.product?.countInStock ?? 1),
      description: item.product?.description || "",
      brand: item.product?.brand || "Brand",
      img: item.product?.img || "",
      images: Array.isArray(item.product?.images) ? item.product.images : [],
    },
  }));
};

/**
 * Merges local cart with remote Firestore cart so no items are lost across devices
 */
export const mergeCarts = (
  localCart: CartItem[],
  remoteCart: CartItem[],
): CartItem[] => {
  if (!remoteCart || remoteCart.length === 0) return localCart;
  if (!localCart || localCart.length === 0) return remoteCart;

  const mergedMap = new Map<string, CartItem>();

  // Add remote items first
  remoteCart.forEach((item) => {
    mergedMap.set(item.id, { ...item });
  });

  // Merge or add local items
  localCart.forEach((localItem) => {
    if (mergedMap.has(localItem.id)) {
      const existing = mergedMap.get(localItem.id)!;
      // Merge with max or cumulative quantity
      mergedMap.set(localItem.id, {
        ...existing,
        quantity: Math.max(existing.quantity, localItem.quantity),
      });
    } else {
      mergedMap.set(localItem.id, { ...localItem });
    }
  });

  return Array.from(mergedMap.values());
};

/**
 * Saves cart array directly to user's profile document in Firestore
 */
export const saveCartToFirestore = async (
  userId: string,
  cart: CartItem[],
  userProfile?: Partial<UserType>,
): Promise<void> => {
  if (!userId) return;

  try {
    const userDocRef = doc(db, "users", userId);
    const sanitizedCart = sanitizeCartForFirestore(cart);

    await setDoc(
      userDocRef,
      {
        uid: userId,
        email: userProfile?.email || "",
        name: userProfile?.name || "",
        avatar: userProfile?.avatar || "",
        cart: sanitizedCart,
        cartCount: sanitizedCart.reduce((sum, item) => sum + item.quantity, 0),
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );
  } catch (error) {
    console.warn("Failed to sync cart to Firestore:", error);
  }
};

/**
 * Loads the cart from the user profile document in Firestore
 */
export const fetchUserCartFromFirestore = async (
  userId: string,
): Promise<CartItem[] | null> => {
  if (!userId) return null;

  try {
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (Array.isArray(data?.cart)) {
        return data.cart as CartItem[];
      }
    }
    return null;
  } catch (error) {
    console.warn("Failed to fetch cart from Firestore:", error);
    return null;
  }
};

/**
 * Subscribes to real-time cart updates from Firestore for cross-device sync.
 * Returns an unsubscribe callback.
 */
export const listenToUserCart = (
  userId: string,
  onRemoteUpdate: (cart: CartItem[]) => void,
): (() => void) => {
  if (!userId) return () => {};

  try {
    const userDocRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(
      userDocRef,
      (snapshot) => {
        // Skip changes originating from this local client session to avoid echo loops
        if (snapshot.metadata.hasPendingWrites) {
          return;
        }

        if (snapshot.exists()) {
          const data = snapshot.data();
          if (Array.isArray(data?.cart)) {
            onRemoteUpdate(data.cart as CartItem[]);
          }
        }
      },
      (error: FirebaseError) => {
        console.warn("Real-time cart listener error:", error);
      },
    );

    return unsubscribe;
  } catch (error) {
    console.warn("Failed to attach cart listener:", error);
    return () => {};
  }
};
