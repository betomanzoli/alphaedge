
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  showText?: boolean;
  className?: string;
}

export function NavLink({ 
  href, 
  children, 
  icon, 
  showText = true,
  className 
}: NavLinkProps) {
  // In a real implementation we would use something like useLocation
  // to determine the active state based on the current route
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center py-2 px-3 text-sm font-medium rounded-md transition-colors",
        isActive 
          ? "bg-trading-primary text-white" 
          : "text-gray-300 hover:bg-gray-800 hover:text-white",
        className
      )}
    >
      {icon && (
        <span className="mr-2">{icon}</span>
      )}
      {showText && <span>{children}</span>}
    </Link>
  );
}
