import axios from "axios";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  // all state
  const [userCartBoolean, setUserCartBoolean] = useState(false);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [allProducts, setAllProducts] = useState(null);
  const [cartId, setCartId] = useState(null);
  const { token } = useContext(authContext);

  async function addProductToCart(id) {
    const boleenFlag = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log("conte..", res.data);
        // setAllProducts(res.data.data.products);
        // setNumOfCartItems(res.data.numOfCartItems);
        // setTotalCartPrice(res.data.data.totalCartPrice);
        getUserCart();
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return boleenFlag;
  }

  // !Save Data Cart User's in State If logout  ==> Save State CartId
  function getUserCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        console.log("res getUserData", res.data);
        setAllProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartId(res.data.data._id);
        localStorage.setItem('cartOwner' , res.data.data.cartOwner )
      })
      .catch((err) => {
        console.log("error getUserData", err.response.statusText);
      });
  }

  useEffect(() => {
    getUserCart();
  }, [token]);

  async function updateToData(id, newCount) {
    const boolenFlag = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setAllProducts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setNumOfCartItems(res.data.numOfCartItems);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return boolenFlag;
  }

  async function removeProductToData(id) {
    const booleanFlag = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setAllProducts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setNumOfCartItems(res.data.numOfCartItems);

        return true;
      })
      .catch((err) => {
        console.log("err update", err);
        return false;
      });
    return booleanFlag;
  }

  function clearData() {
    axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setAllProducts([]);
        setTotalCartPrice(0);
        setNumOfCartItems(0);
      })
      .catch((err) => {
        console.log("error clearData", err);
      });
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        numOfCartItems,
        totalCartPrice,
        allProducts,
        updateToData,
        removeProductToData,
        clearData,
        cartId,
        getUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
