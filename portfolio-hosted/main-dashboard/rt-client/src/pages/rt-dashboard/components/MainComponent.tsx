

import PaginationComponent from "./PaginationComponent"
import SearchBarAndFilteringComponent from "./SearchBarAndFilteringComponent";
import ProjectsUrl from "../mockData/index";


import { useState } from "react";
export default function MainComponent() {
    // Urls extraction
    const urls = ProjectsUrl.flatMap(project =>
    Object.values(project).filter(url => typeof url === "string"));

    // paginatiion handle
    const [currentPage, setCurrentPage] = useState<number>(1);
    // const handleClick = () => {
    //     alert("Pressed")

    // }
    return(
/*
What if i have hundreds of projects? Make project adding automatic not hardcoded
schema that should be both on the UI and for db:
    img-url
    stack:
    title:
    brief-description
    features
*/          
        /* The data is hardcoded just for demo and testing purpose */
        /* The projects will be added dynamically via admin console later */
        
        <div className="mx-auto md:gap-8 max-w-[1280px] md:mt-3 mt-29 bg-[#E5E5E5] drop-shadow-lg drop-shadow-blue-500/50 p-3">
            <SearchBarAndFilteringComponent />
            <main className="flex flex-col sm:flex-row  mx-auto sm:items-start items-center flex-wrap gap-4 h-full">
                <header className=" w-full ">
                    <div className="text-xl uppercase tracking-wide font-semibold px-1 mt-4 sm:text-start text-center">Mern Stack Projects</div>
                </header>
                <div className="flex-grow flex-[1_1_0%] max-w-sm sm:mx-auto space-y-8">
                    <div className="relative aniamte-gradient-border">
                    <a
                    href={urls[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <img
                    src="https://res.cloudinary.com/dixiuoxw2/image/upload/v1765215528/Ellipse_21_6_xf9sv5.svg"
                    alt="Messera Logo"
                    className="
                        cursor-pointer
                        w-full h-auto rounded-xl
                        bg-gradient-to-br from-gray-800 to-gray-700
                        border-2 border-indigo-700
                        transition-transform duration-300 ease-in-out
                        hover:scale-110 block
                        animate-gradient-border
                        "                       
                    />
                    </a> 
                    </div>
                    <div className="space-y-3 border border-[#addbff] rounded-lg p-2 mb-4 ">
                    <section>
                        <div className="text-lg text-medium uppercase text-center my-4 
                        underline underline-offset-4 tracking-widest
                        
                         ">Messera</div>
                        <ul className="list-disc pl-5 tracking-wider text-sm">
                            <li className="">
                                <span className="uppercase font-medium decoration-2 drop-shadow-xs">Messera </span>
                                is a real-time chat application that lets you connect with friends, 
                                family, or colleagues instantly — no matter where they are. With a focus on speed and privacy, 
                                We bring modern communication to your fingertips.
                            </li>
                        </ul>
                    </section>
                    <section>
                        <ul className="text-sm list-disc pl-5 space-y-3 tracking-wider pl-12">
                            <li className="-ml-6">Key Features</li>
                            <li>📱 1-on-1 & Group Chats</li>
                            <li>🔒 End-to-End Encryption – Your messages stay private, always.</li>
                            <li>🚀 Real-Time Messaging – Instant delivery using WebSockets.</li>
                            <li>🌓 Dark Mode Support – Chat comfortably day or night.</li>
                            <li>🖼️ Media Sharing – Send images, videos, and documents with a tap.</li>
                        
                        </ul>
                    </section>
                    </div>
                </div>
                <div className="flex-grow flex-[1_1_0%] shrink max-w-sm sm:mx-auto space-y-8">
                     <div className="relative animate-gradient-border">
                    <a 
                     href={urls[1]}
                     target="_blank"
                     rel="noopener noreferrer"
                    >
                    <img src="https://res.cloudinary.com/dixiuoxw2/image/upload/v1753630347/MODAILY_BG_yqbhgx.png" 
                    alt="Medaily Logo"
                        className="
                        cursor-pointer
                        w-full h-auto rounded-xl
                        bg-gradient-to-br from-gray-800 to-gray-700
                        border-2 border-indigo-700
                        transition-transform duration-300 ease-in-out
                        hover:scale-110"
                    />
                    </a>
                    </div>
                      <div className="space-y-3 border border-[#addbff] rounded-lg p-2 mb-4">
                    <section>
                        <div className="text-lg text-medium uppercase text-center my-4 
                        underline underline-offset-4 tracking-widest
                        
                         ">Modaily</div>
                        <ul className="list-disc pl-5 tracking-wider text-sm">
                            <li className="">
                                <span className="uppercase font-medium decoration-2 drop-shadow-xs">Modaily </span>
                               is a modern eCommerce app that brings the latest fashion right to your fingertips. Shop trendy clothes effortlessly, explore real-time deals, and stay updated with the newest styles — all in one place. With a focus on convenience and a seamless shopping experience, 
                               Modaily makes fashion shopping fast, fun, and personalized just for you.
                            </li>
                        </ul>
                    </section> 
                    <section>
                        <ul className="text-sm list-disc pl-5 space-y-3 tracking-wider pl-12">
                            <li className="-ml-6">Key Features</li>
                            <li>🛍️ Wide Range of Styles – Discover the latest trends and timeless classics.</li>
                            <li>🔒 Secure Checkout – Shop safely with encrypted payment options.</li>
                            <li>🚚 Fast Shipping – Get your orders delivered quickly and reliably.</li>
                            <li>🎨 Easy Returns – Hassle-free returns for a perfect fit every time.</li>
                            <li>👗 High-Quality Materials – Clothes designed for comfort and durability.</li>
                        
                        </ul>
                    </section>
                    </div>
                     
                </div>
                <div className="flex-grow flex-[1_1_0%] max-w-sm sm:mx-auto space-y-8">
                    <div className="relative animate-gradient-border">
                    <a 
                    href={urls[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <img src="https://res.cloudinary.com/dixiuoxw2/image/upload/v1753815881/Bookstore-BG_ztvpmd.png" 
                    alt="BooklyStore Logo"
                        className="
                        cursor-pointer
                        w-full h-auto rounded-xl
                        bg-gradient-to-br from-gray-800 to-gray-700
                        border-2 border-indigo-700
                        transition-transform duration-300 ease-in-out
                        hover:scale-110"
                    />
                    </a>
                    </div>
                    <div className="space-y-3 border border-[#addbff] rounded-lg p-2 mb-4">
                    <section>
                        <div className="text-lg text-medium uppercase text-center my-4 
                        underline underline-offset-4 tracking-widest
                        
                         ">booklystore</div>
                        <ul className="list-disc pl-5 tracking-wider text-sm">
                            <li className="">
                                <span className="uppercase font-medium decoration-2 drop-shadow-xs">booklystore </span>
                                    a modern bookstore app that puts your next great read just a click away. Browse bestsellers,
                                     explore personalized recommendations, and manage your orders effortlessly — all in one place.
                                     With a focus on simplicity and seamless experience,
                                     BooklyStore makes discovering and buying books fast, easy, and enjoyable.
                            </li>
                        </ul>
                    </section>
                    <section>
                        <ul className="text-sm list-disc pl-5 space-y-3 tracking-wider pl-12">
                            <li className="-ml-6">Key Features</li>
                            <li>📚 Wide Selection of Books – Easily browse by category, genre, and top sellers.</li>
                            <li>🔍 Smart Search & Filters – Quickly find exactly what you’re looking for.</li>
                            <li>🛒 Easy Cart Management – Add, update, or remove books anytime.</li>
                            <li>🚚 Cash on Delivery – Enjoy a hassle-free and secure checkout experience.</li>
                            <li>📦 Order Tracking – Stay updated from purchase to delivery.</li>
                            <li>💡 Personalized Recommendations – Discover books tailored just for you.</li>
                            <li>🌓 Dark Mode – Browse comfortably any time of day or night.</li>
                            <li>🗂 Digital Library Access – Instantly enjoy your purchased eBooks.</li>

                    </ul>
                    </section>
                    </div>
                </div>
            </main>
             <PaginationComponent
                currentPage={currentPage}
                totalPages={4}
                onPageChange={(page: number) => setCurrentPage(page)}
            />
   

        </div>
        
    )
}