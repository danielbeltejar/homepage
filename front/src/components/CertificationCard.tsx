import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface CertificationProps {
  icon: IconDefinition;
  vendor: string;
  name: string;
}

const CertificationCard = ({ icon, vendor, name }: CertificationProps) => {
  return (
    <div className="flex flex-row items-center bg-background dark:bg-dark-background px-5 py-5 rounded-3xl shadow-inner-lg h-16 w-80">
      <FontAwesomeIcon icon={icon} className="text-3xl mr-4 text-accent dark:text-dark-accent" />
      <p className="text-sm font-semibold flex-1">{name}</p>
      <span hidden>{vendor}</span>
    </div>
  );
};

export default CertificationCard;