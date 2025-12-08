

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface RouteLoaderProps {
  disabled?: boolean;
}

const RouteLoader: React.FC<RouteLoaderProps> = ({ disabled = false }) => {

    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (disabled) {
            setLoading(false);
            return;
        }
    setLoading(true);
    const timeout = setTimeout(() => {
        setLoading(false)
    }, 1500);

        return () => clearTimeout(timeout);

    }, [location.pathname, disabled])

    // Added - nothing rendered at all if disabled
    // trying to fix issue - dont display spinner if the page is not found
    // if (disabled) return null;
    return loading ? (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-white/60 flex items-center justify-center">
        <div className="loader w-10 sm:w-14 md:w-20 lg:w-24 "></div>
    </div>
    ) : null;
};   
 
export default RouteLoader;


