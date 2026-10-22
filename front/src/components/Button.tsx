import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
    icon?: IconProp;
    text?: string;
    url?: string;
    onClick?: () => void;
    newTab?: boolean;
    primary?: boolean;
    className?: string;
}

const PredefinedButton: React.FC<ButtonProps> = ({ icon, text, url, onClick, newTab = true, primary = false, className }) => {
    const themeClass = primary ? "bg-primary-button" : "bg-secondary-button";

    const handleClick = () => {
        if (onClick) onClick();
    };

    return (
        <a
            target={newTab ? "_blank" : "_self"}
            rel={newTab ? "noreferrer" : ""}
            href={url}
            onClick={handleClick}
            className={`flex flex-row z-10 min-h-12 ${themeClass} cursor-pointer rounded-xl text-accent hover:text-accent-light hover:border-accent-light/30 hover:shadow-md border border-accent/10 min-w-12 gap-2 transition-all duration-300 text-11 px-[10px] py-1 justify-center items-center hover:bg-white/80 active:scale-[0.97] ${className ?? ''}`}
        >
            {icon && <FontAwesomeIcon icon={icon} className="h-4 w-auto shrink-0" />}
            {text && <p>{text}</p>}
        </a>
    );
};

export default PredefinedButton;
