
import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  // Use the useLocation hook to determine if the link is active
  const location = useLocation();
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
        <span className={cn("flex-shrink-0", !showText && "mx-auto")}>{icon}</span>
      )}
      {showText && <span className="ml-2">{children}</span>}
    </Link>
  );
}
