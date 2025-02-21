import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
    icon?: IconProp;
    text?: string;
    url: string;
}

const PredefinedButton: React.FC<ButtonProps> = ({ icon, text, url }) => {

    return (
        <a target="_blank" rel="noreferrer" href={url} className="flex flex-row z-10 bg-secondary-button drop-shadow-lg shadow-lg rounded-xl text-accent hover:text-gray-500 hover:border-white hover:shadow-inner border-gray-200 border-2 min-w-12  gap-2 transition-colors duration-300 text-11 px-[10px] py-1 justify-center items-center hover:bg-white">
            {icon && <FontAwesomeIcon icon={icon} />}
            {text && <p>{text}</p>}
        </a>
    );
};

export default PredefinedButton;
