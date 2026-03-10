import React from "react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
    className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-10 h-10", className)}
        >
            {/* Monogram TS Geometric Style */}
            <path
                d="M20 30 H80 V45 H55 V80 H40 V45 H20 V30Z"
                fill="currentColor"
            />
            <path
                d="M65 55 H85 V65 H70 V75 H85 V85 H65 V55Z"
                fill="currentColor"
                className="opacity-80"
            />
            {/* Accent dot */}
            <circle cx="85" cy="45" r="5" fill="#3b82f6" fillOpacity="0.8" />
        </svg>
    );
};
