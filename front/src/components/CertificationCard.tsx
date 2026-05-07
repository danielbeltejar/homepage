import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { HTMLMotionProps } from 'framer-motion';

interface CertificationProps extends Omit<HTMLMotionProps<"div">, "children"> {
  icon: IconDefinition;
  vendor: string;
  name: string;
}

const CertificationCard = ({ icon, vendor, name, ...props }: CertificationProps) => {
  return (
    <motion.div
      className="flex flex-row items-center bg-background dark:bg-dark-background px-5 py-5 rounded-2xl shadow-card hover:shadow-card-hover border border-white/30 h-16 w-full lg:w-80 transition-shadow duration-300"
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      <FontAwesomeIcon icon={icon} className="text-3xl mr-4 text-accent dark:text-dark-accent" />
      <p className="text-sm flex-1">{name}</p>
      <span hidden>{vendor}</span>
    </motion.div>
  );
};

export default CertificationCard;