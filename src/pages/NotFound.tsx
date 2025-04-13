
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-trading-dark">
      <div className="text-center">
        <div className="text-6xl font-bold mb-4 text-trading-primary">404</div>
        <p className="text-2xl text-gray-300 mb-6">Oops! Page not found</p>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <a 
          href="/" 
          className="px-6 py-3 bg-trading-primary hover:bg-trading-secondary text-white rounded-lg transition-colors"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
