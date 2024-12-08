import { usePathname } from "next/navigation";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";

const CartComponent = () => {
  const pathname = usePathname();

  // Check if the current route is one of the specified pages
  const isCartOrCheckoutOrPaymentOrReviewPage =
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname === "/payment" ||
    pathname === "/review";

  return (
    !isCartOrCheckoutOrPaymentOrReviewPage && (
      <div className="flex items-center space-x-2 cursor-pointer border border-Grey300 p-2 rounded-[12px]">
        <BsCart2 className="text-3xl text-Green50" />
        <Link href="/cart" className="relative text-Green50 font-nunitoSans">
          <h1 className="text-[13px] mt-3 text-Green50 font-nunitoSans">
            Cart
          </h1>
          <span className="absolute top-0 right-1 bg-red-600 text-white rounded-full px-2 text-xs">
            4
          </span>
        </Link>
      </div>
    )
  );
};

export default CartComponent;
