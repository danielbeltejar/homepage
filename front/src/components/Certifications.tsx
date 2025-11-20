import CertificationCard from "./CertificationCard";
import SectionHeader from './SectionHeader';
import FilterPills from './FilterPills';
import { useFilter } from '../hooks/useFilter';
import { faMicrosoft, faLinux } from '@fortawesome/free-brands-svg-icons';
import { faNetworkWired, faCertificate, faBridge } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const certifications = [
  {
    icon: faMicrosoft,
    vendor: "Microsoft",
    name: "AZ305 - Microsoft Azure Solutions Architect Expert",
    highlight: true
  },
  {
    icon: faMicrosoft,
    vendor: "Microsoft",
    name: "AZ104 - Microsoft Azure Administrator",
        highlight: true
  },
  {
    icon: faLinux,
    vendor: "Kubernetes",
    name: "CKAD - Certified Kubernetes Application Developer",
        highlight: true

  },
  {
    icon: faLinux,
    vendor: "Kubernetes",
    name: "CKA - Certified Kubernetes Administrator",
        highlight: true

  },
  {
    icon: faCertificate,
    vendor: "Databricks",
    name: "Databricks Fundamentals"
  },
  {
    icon: faBridge,
    vendor: "Cisco",
    name: "CCNA - Introduction to Networks"
  },
  {
    icon: faBridge,
    vendor: "Cisco",
    name: "Cybersecurity Essentials"
  },
  {
    icon: faBridge,
    vendor: "Cisco",
    name: "Introduction to Cybersecurity"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const Certifications = () => {
  const { activeFilter, setActiveFilter, filteredItems, availableFilters } = useFilter(
    certifications,
    'vendor'
  );

  const displayItems = activeFilter === 'all' ? filteredItems.filter(cert => cert.highlight) : filteredItems;

  return (
    <div className='bg-window dark:bg-dark-window mb-16 p-10 shadow-lg'>
      <SectionHeader title="Certifications" link="#certifications" />

      <p className="mt-4 mb-10 text-12">
        The following certifications demonstrate my expertise and proficiency in various technologies.
      </p>

      <FilterPills
        filters={availableFilters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="h-full flex justify-center w-full">
        <motion.div
          className="min-h-[148px] flex flex-col lg:flex-row lg:flex-wrap lg:content-start gap-5 lg:justify-start w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {displayItems.map((cert) => (
              <CertificationCard
                key={cert.name}
                {...cert}
                variants={itemVariants}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Certifications;