import { usePathname } from "next/navigation";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { useCart } from "@/app/context/CartContext";

const CartComponent = () => {
  const pathname = usePathname();
  const { cart } = useCart();

  console.log("Cart in CartComponent:", cart);
  console.log("Cart items in CartComponent:", cart?.items);

  const cartCount = (cart.items || []).reduce((count, item) => count + 1, 0);

  const isCartOrCheckoutOrPaymentOrReviewPage =
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname === "/payment" ||
    pathname === "/review" ||
    pathname === "/ordercompleted";

  return (
    !isCartOrCheckoutOrPaymentOrReviewPage && (
      <div className="flex items-center space-x-2 cursor-pointer border border-Grey300 p-2 rounded-[12px]">
        <BsCart2 className="text-3xl text-Green50" />
        <Link href="/cart" className="relative text-Green50 font-nunitoSans">
          <h1 className="text-[13px] mt-3 text-Green50 font-nunitoSans">
            Cart
          </h1>
          <span className="absolute top-0 right-1 bg-red-600 text-white rounded-full px-2 text-xs">
            {cartCount}
          </span>
        </Link>
      </div>
    )
  );
};

export default CartComponent;
