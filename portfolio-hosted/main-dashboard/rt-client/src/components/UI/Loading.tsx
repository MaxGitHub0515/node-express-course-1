export const Spinner = () => (
  <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
    <div className="relative">
      {/* Outer ring */}
      <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
      
      {/* Inner pulse ring */}
      <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-blue-600 opacity-20 animate-ping"></div>
    </div>
    
    <h3 className="mt-6 text-xl font-semibold text-gray-700 tracking-wide">
      Curating Projects
    </h3>
    <p className="text-gray-500 text-sm mt-1">
      Optimizing your view...
    </p>
  </div>
);