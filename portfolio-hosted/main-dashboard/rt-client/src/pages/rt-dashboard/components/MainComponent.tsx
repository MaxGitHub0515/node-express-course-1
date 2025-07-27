


export default function MainComponent() {
 
    const handleClick = () => {
     
    }
    return(
/*
schema:
    img-url
    stack:
    title:
    brief-description
    features
*/
        
        <div className="mx-auto mt-3 md:gap-8  max-w-[1280px] bg-[#E5E5E5] drop-shadow-lg drop-shadow-blue-500/50 p-3">
            <main className="flex flex-col sm:flex-row  mx-auto flex-wrap gap-4  h-full">
                <header className="my-3 w-full ">
                    <div className="text-xl uppercase tracking-wide font-semibold">Mern Stack Projects</div>
                </header>
                <div className="flex-grow flex-[1_1_0%] max-w-sm sm:mx-auto space-y-8">
                    <img
                    src="https://res.cloudinary.com/dixiuoxw2/image/upload/v1753631592/MESSERA-BG_uvuf8s.png"
                    alt="Mountains"
                    onClick={handleClick}
                    className="
                        w-full h-auto rounded-xl
                        bg-gradient-to-br from-gray-800 to-gray-700
                        border-2 border-indigo-700
                        transition-transform duration-300 ease-in-out
                        hover:scale-110 block"                       
                    />
                    <div className="space-y-3 border border-[#addbff] rounded-lg p-2 ">
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
                    <img src="https://res.cloudinary.com/dixiuoxw2/image/upload/v1753630347/MODAILY_BG_yqbhgx.png" 
                    alt="Northern Lights"
                        className="
                        w-full h-auto rounded-xl
                        bg-gradient-to-br from-gray-800 to-gray-700
                        border-2 border-indigo-700
                        transition-transform duration-300 ease-in-out
                        hover:scale-110"
                    />
                      <div className="space-y-3 border border-[#addbff] rounded-lg p-2">
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
                    <img src="https://res.cloudinary.com/dixiuoxw2/image/upload/v1753631930/RANDOM-BG_hlyaiy.png" 
                    alt="Northern Lights"
                        className="
                        w-full h-auto rounded-xl
                        bg-gradient-to-br from-gray-800 to-gray-700
                        border-2 border-indigo-700
                        transition-transform duration-300 ease-in-out
                        hover:scale-110"
                    />
                        <div className="space-y-3 border border-[#addbff] rounded-lg p-2">
                    <section>
                        <div className="text-lg text-medium uppercase text-center my-4 
                        underline underline-offset-4 tracking-widest
                        
                         ">random</div>
                        <ul className="list-disc pl-5 tracking-wider text-sm">
                            <li className="">
                                <span className="uppercase font-medium decoration-2 drop-shadow-xs">random </span>
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
                
            </main>
        </div>
        
    )
}