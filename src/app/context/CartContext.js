"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

const fetchUserIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json")
    const data = await response.json()
    return data.ip
  } catch (error) {
    console.error("Failed to fetch IP:", error)
    return "unknown_ip"
  }
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    cart_group_id: null,
    items: [],
    createdAt: null,
    total_amount: 0,
  })

  const isCartExpired = (cart) => {
    const oneDay = 24 * 60 * 60 * 1000
    return Date.now() - cart.createdAt > oneDay
  }

  const calculateTotalAmount = (items = []) => {
    if (items.length === 0) {
      console.log("No items in cart, total is 0")
      return 0
    }

    const total = items.reduce((sum, item, index) => {
      // Handle null or undefined values by using default values
      const price = typeof item.price === "string" ? Number.parseFloat(item.price) : Number(item.price || 0)

      // IMPORTANT: Handle null quantity by defaulting to 1
      let quantity = 1
      if (item.quantity !== null && item.quantity !== undefined) {
        quantity = typeof item.quantity === "string" ? Number.parseInt(item.quantity) : Number(item.quantity)
      } else {
        console.warn(`Item ${item.product_id} has null/undefined quantity, defaulting to 1`)
      }

      const itemTotal = price * quantity

      if (isNaN(itemTotal)) {
        console.warn("Invalid calculation - NaN detected for this item")
        return sum
      }

      return sum + itemTotal
    }, 0)

    const formattedTotal = Number(total.toFixed(2))
    return formattedTotal
  }

  // Function to fix null quantities in existing cart items
  const fixNullQuantities = (cartItems) => {
    return cartItems.map((item) => {
      if (item.quantity === null || item.quantity === undefined) {
        return { ...item, quantity: 1 }
      }
      return item
    })
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      console.log("Running on server, skipping localStorage operations")
      return
    }

    async function initializeCart() {
      let savedCart = null

      try {
        const savedCartString = localStorage.getItem("cart")

        if (savedCartString) {
          savedCart = JSON.parse(savedCartString)

          // Fix any null quantities in the saved cart
          if (savedCart.items && savedCart.items.length > 0) {
            savedCart.items = fixNullQuantities(savedCart.items)
          }
        } else {
          console.log("No cart found in localStorage")
        }
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
      }

      if (savedCart && isCartExpired(savedCart)) {
        console.log("Cart is expired, removing from localStorage")
        localStorage.removeItem("cart")
        savedCart = null
      }

      if (!savedCart) {
        const ip = await fetchUserIP()

        const timestamp = Date.now()
        const newCart = {
          cart_group_id: `${ip}_${timestamp}`,
          createdAt: timestamp,
          items: [],
          total_amount: 0,
        }
        setCart(newCart)
        localStorage.setItem("cart", JSON.stringify(newCart))
      } else {
        // Calculate total amount from saved items
        const calculatedTotal = calculateTotalAmount(savedCart.items)

        const updatedCart = {
          ...savedCart,
          total_amount: calculatedTotal,
        }
        setCart(updatedCart)

        // Update localStorage with the recalculated total
        localStorage.setItem("cart", JSON.stringify(updatedCart))
      }
    }

    initializeCart()
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && cart.cart_group_id) {
      localStorage.setItem("cart", JSON.stringify(cart))

      // Verify what was saved
      try {
        const savedCart = JSON.parse(localStorage.getItem("cart"))
        console.log("Verified saved cart:", savedCart)
        console.log("Total amount in localStorage:", savedCart.total_amount)
      } catch (error) {
        console.error("Error verifying saved cart:", error)
      }
    }
  }, [cart])

  const addItemToCart = (productId, quantity, price) => {
    setCart((prevCart) => {

      const existingItem = prevCart.items.find((item) => item.product_id === productId)

      // IMPORTANT: Ensure quantity is never null - default to 1 if null/undefined
      const numQuantity = quantity === null || quantity === undefined ? 1 : Number(quantity)
      const numPrice = Number(price)

      let updatedItems
      if (existingItem) {
        updatedItems = prevCart.items.map((item) =>
          item.product_id === productId
            ? {
                ...item,
                // If existing item has null quantity, treat as 0
                quantity: (Number(item.quantity) || 0) + numQuantity,
                price: numPrice,
              }
            : item,
        )
      } else {
        updatedItems = [
          ...prevCart.items,
          {
            product_id: productId,
            quantity: numQuantity,
            price: numPrice,
          },
        ]
      }

      // Calculate total amount immediately
      const total_amount = calculateTotalAmount(updatedItems)
      // Create updated cart
      const updatedCart = {
        ...prevCart,
        items: updatedItems,
        total_amount,
      }

      return updatedCart
    })
  }

  const removeItemFromCart = (productId) => {
    console.group(`Removing Item from Cart: ${productId}`)

    setCart((prevCart) => {
      const itemToRemove = prevCart.items.find((item) => item.product_id === productId)

      const updatedItems = prevCart.items.filter((item) => item.product_id !== productId)

      // Calculate total amount immediately
      const total_amount = calculateTotalAmount(updatedItems)

      const updatedCart = {
        ...prevCart,
        items: updatedItems,
        total_amount,
      }

      return updatedCart
    })
  }

  const incrementQuantity = (productId) => {
    setCart((prevCart) => {

      const itemToUpdate = prevCart.items.find((item) => item.product_id === productId)

      const updatedItems = prevCart.items.map((item) =>
        item.product_id === productId
          ? {
              ...item,
              // Handle null quantity by treating as 0
              quantity: (Number(item.quantity) || 0) + 1,
            }
          : item,
      )

      // Calculate total amount immediately
      const total_amount = calculateTotalAmount(updatedItems)
      const updatedCart = {
        ...prevCart,
        items: updatedItems,
        total_amount,
      }

      return updatedCart
    })
  }

  const decrementQuantity = (productId) => {
    setCart((prevCart) => {

      const itemToUpdate = prevCart.items.find((item) => item.product_id === productId)

      const updatedItems = prevCart.items
        .map((item) => {
          if (item.product_id === productId) {
            // Handle null quantity by treating as 1 (which will then be decremented to 0 and removed)
            const currentQuantity = Number(item.quantity) || 1
            return currentQuantity > 1 ? { ...item, quantity: currentQuantity - 1 } : item
          }
          return item
        })
        .filter((item) => {
          // Handle null quantity by treating as 1
          const quantity = Number(item.quantity) || 1
          return quantity > 0
        }) // Remove items with quantity 0

      // Calculate total amount immediately
      const total_amount = calculateTotalAmount(updatedItems)
      const updatedCart = {
        ...prevCart,
        items: updatedItems,
        total_amount,
      }

      return updatedCart
    })
  }

  // Fix existing cart on first render
  useEffect(() => {
    if (cart.items && cart.items.length > 0) {
      const hasNullQuantities = cart.items.some((item) => item.quantity === null || item.quantity === undefined)

      if (hasNullQuantities) {
        setCart((prevCart) => {
          const fixedItems = fixNullQuantities(prevCart.items)
          const total_amount = calculateTotalAmount(fixedItems)

          return {
            ...prevCart,
            items: fixedItems,
            total_amount,
          }
        })
      }
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
