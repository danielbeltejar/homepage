import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
    icon?: IconProp;
    text?: string;
    url?: string;
    onClick?: () => void;
    newTab?: boolean;
    primary?: boolean; // true => primary button, false => secondary
}

const PredefinedButton: React.FC<ButtonProps> = ({ icon, text, url, onClick, newTab = true, primary = false }) => {
    const navigate = useNavigate();
    const themeClass = primary ? "bg-primary-button" : "bg-secondary-button";

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!newTab) {
            event.preventDefault();
            if (url) {
                navigate(url);
            }
        }
        if (onClick) onClick();
    };

    return (
        <a 
            target={newTab ? "_blank" : "_self"} 
            rel={newTab ? "noreferrer" : ""} 
            href={url} 
            onClick={handleClick}
            className={`flex flex-row z-10 min-h-12 ${themeClass} drop-shadow-lg shadow-lg rounded-xl text-accent hover:text-gray-500 hover:border-white hover:shadow-inner border-gray-200 border-2 min-w-12 gap-2 transition-colors duration-300 text-11 px-[10px] py-1 justify-center items-center hover:bg-white`}
        >
            {icon && <FontAwesomeIcon icon={icon} />}
            {text && <p>{text}</p>}
        </a>
    );
};

export default PredefinedButton;
