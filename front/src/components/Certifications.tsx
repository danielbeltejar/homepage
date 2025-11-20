import CertificationCard from "./CertificationCard";
import SectionHeader from './SectionHeader';
import FilterPills from './FilterPills';
import { useFilter } from '../hooks/useFilter';
import { faMicrosoft, faLinux } from '@fortawesome/free-brands-svg-icons';
import { faNetworkWired, faCertificate } from '@fortawesome/free-solid-svg-icons';

const certifications = [
  {
    icon: faMicrosoft,
    vendor: "Microsoft",
    name: "AZ305 - Microsoft Azure Solutions Architect Expert"
  },
  {
    icon: faMicrosoft,
    vendor: "Microsoft",
    name: "AZ104 - Microsoft Azure Administrator"
  },
  {
    icon: faLinux,
    vendor: "Kubernetes",
    name: "CKAD - Certified Kubernetes Application Developer"
  },
  {
    icon: faLinux,
    vendor: "Kubernetes",
    name: "CKA - Certified Kubernetes Administrator"
  },
  {
    icon: faCertificate,
    vendor: "Databricks",
    name: "Databricks Fundamentals"
  },
  {
    icon: faNetworkWired,
    vendor: "Cisco",
    name: "CCNA: Introduction to Networks"
  },
  {
    icon: faNetworkWired,
    vendor: "Cisco",
    name: "Cybersecurity Essentials"
  },
  {
    icon: faNetworkWired,
    vendor: "Cisco",
    name: "Introduction to Cybersecurity"
  }
];

const Certifications = () => {
  const { activeFilter, setActiveFilter, filteredItems, availableFilters } = useFilter(
    certifications,
    'vendor'
  );

  const displayItems = activeFilter === 'all' ? filteredItems.slice(0, 4) : filteredItems;

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
        <div className="min-h-[148px] flex flex-col lg:flex-row lg:flex-wrap lg:content-start gap-5 lg:justify-start w-full">
          {displayItems.map((cert, index) => (
            <CertificationCard key={index} {...cert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;