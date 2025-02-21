import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface SectionHeaderProps {
    title: string;
    link: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, link }) => {
    const handleClick = () => {
        window.location.href = link;
        navigator.clipboard.writeText(window.location.href);
    };

    return (
        <div className="flex flex-row align-middle items-center mt-xs group w-full">
            <a href={link}
                className="text-accent dark:text-dark-accent opacity-0 absolute group-hover:opacity-100 transition-opacity duration-300"
                onClick={handleClick}>
                <FontAwesomeIcon icon={faLink} />
            </a>
            <h2 className="text-accent dark:text-dark-accent font-bold text-2xl group-hover:cursor-pointer group-hover:pl-7 group-hover:underline underline-offset-4 transition-all duration-300"
                onClick={handleClick}>{title}</h2>
        </div>
    );
};

export default SectionHeader;
