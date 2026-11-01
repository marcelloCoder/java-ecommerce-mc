import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { resolveProductImage } from '../../lib/pinAssets'
import type { ProductDTO } from '../../types/api'

export type CartItem = {
  productId: number
  name: string
  price: number
  quantity: number
  imgUrl: string
}

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  addItem: (product: ProductDTO, quantity?: number) => void
  setQuantity: (productId: number, quantity: number) => void
  removeItem: (productId: number) => void
  clear: () => void
}

const STORAGE_KEY = 'mshop_cart'
const CartContext = createContext<CartContextValue | null>(null)

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as CartItem[]
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart)

  const persist = useCallback((next: CartItem[]) => {
    setItems(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const addItem = useCallback(
    (product: ProductDTO, quantity = 1) => {
      const current = readCart()
      const existing = current.find((i) => i.productId === product.id)
      let next: CartItem[]
      if (existing) {
        next = current.map((i) =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + quantity, price: product.price }
            : i,
        )
      } else {
        next = [
          ...current,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            imgUrl: resolveProductImage(product),
          },
        ]
      }
      persist(next)
    },
    [persist],
  )

  const setQuantity = useCallback(
    (productId: number, quantity: number) => {
      const current = readCart()
      if (quantity <= 0) {
        persist(current.filter((i) => i.productId !== productId))
        return
      }
      persist(
        current.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
      )
    },
    [persist],
  )

  const removeItem = useCallback(
    (productId: number) => {
      persist(readCart().filter((i) => i.productId !== productId))
    },
    [persist],
  )

  const clear = useCallback(() => persist([]), [persist])

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return { items, count, subtotal, addItem, setQuantity, removeItem, clear }
  }, [items, addItem, setQuantity, removeItem, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
