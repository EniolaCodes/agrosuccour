import Image from "next/image";
import Link from "next/link";

import {
	FaInstagram,
	FaTwitter,
	FaWhatsapp,
} from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FiPhone, FiMail } from 'react-icons/fi';




const Footer = () => {
    return (
      <footer
			className="w-full relative h-auto bg-cover bg-center bg-no-repeat mt-16 py-8 px-20"
			style={{ backgroundImage: "url('/images/Footer.svg')" }}
		>
      <div className="container mx-auto grid md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center space-x-2 col-span-1">
            <Image
              src="/images/logo.svg"
              alt="Agrosuccour Logo"
              width={50}
              height={50}
              className=""
            />
            <h2 className="text-2xl font-semibold text-agroLightGreen">Agrosuccour</h2>
          </div>
          <p className="mt-4 text-sm text-agroText">
            Your trusted source for fresh produce, essentials, bulk purchasing, and farming
            support—delivering quality, convenience, and customer satisfaction.
          </p>
        </div>
        {/* Useful Links */}
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-agroHeading">Useful links</h3>
            <ul className="space-y-2 text-agroText">
            <li className="text-inherit">
						<Link href="/">Home</Link>
					</li>

					<li className="text-inherit">
						<Link href="/#about">About</Link>
					</li>
					<li className="text-inherit">
						<Link href="/#products">Products</Link>
					</li>
					<li className="text-inherit">
						<Link href="/#carts">Carts</Link>
					</li>
            </ul>
        </div>
        


         {/* Reach Out */}
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb- text-agroHeading mb-4">Reach out to us</h3>
          <div className="flex items-center space-x-2 mb-2 text-agroText">
            <FiPhone />
            <span>+234 7066375930</span>
          </div>
          <div className="flex items-center space-x-2 text-agroText">
            <FiMail />
            <span className="">agrosuccour@gmail.com</span>
          </div>
        </div>
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-agroHeading">Newsletter</h3>
          <p className="text-sm mb-4 text-agroText">
            Subscribe to our Newsletter for latest trends and information
          </p>
        <form className="flex ">
      <div className="relative flex-1">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 rounded-lg border-none focus:outline-none "
        />
        <button className="absolute right-0 top-0 bottom-0 bg-agroGreen hover:bg-green-500 text-black text-center px-4 py-2 rounded-lg m-0.5">
          Subscribe
        </button>
      </div>
      </form>
      </div>
 </div>
 
      <div className="container mx-auto mt-8 flex justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-agroHeading text-lg">Connect with us:</span>
          <div className="flex space-x-4">
            <a href="#" className="text-agroGreen">
              <Image src="/images/Vector.svg" width={20} height={20} className="text-agroGreen" alt="" />
            </a>
            <a href="#" className="text-agroGreen">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-agroGreen">
              <FaWhatsapp size={20} />
            </a>
            <a href="#" className="text-agroGreen">
              <CiFacebook size={20} />
            </a>
          </div>
        </div>  
        <div className="flex items-center space-x-4">
          <span className="text-agroHeading text-lg">Pay with ease:</span>
          <Image src="/images/mastercard.svg" alt="Mastercard" width={30} height={30} className="" />   
          <Image src="/images/visa.svg" alt="Visa" width={30} height={30} className=""/> 
        </div> 
      </div>
      <div className="border-t border-gray-600 my-2"/>
      <div className="container mx-auto text-agroText text-sm flex flex-col md:flex-row justify-between items-center">
        <p className="">&copy; 2024. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:underline">Terms and Conditions</a>
        </div>
      </div>
 </footer>
    );
  };
  
  export default Footer;