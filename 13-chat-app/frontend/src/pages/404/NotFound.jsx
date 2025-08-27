import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const NotFound = () => {
  return (
    <div className="flex items-center justify-between min-w-96 mx-auto">
        <div className="flex flex-col items-center w-full p-6 rounded-lg shadow-md bg-gray-400 bg-opacity-0 bg-clip-padding backdrop-blur-lg ">
            <DotLottieReact
            src="../public/emj-NotFound.lottie"
            className='sm:w-96 sm:h-48'
            loop
            autoplay
            />     
            <h2 className="text-base sm:text-3xl font-semibold text-center">
             Page does not exist
            <span className="ml-2 text-blue-500">Messera</span>
            </h2>
          
        </div>
      </div>
    
  )
}

export default NotFound