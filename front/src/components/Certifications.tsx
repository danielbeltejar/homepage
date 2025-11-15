import CertificationCard from "./CertificationCard";
import SectionHeader from './SectionHeader';
import { faMicrosoft , faLinux} from '@fortawesome/free-brands-svg-icons';

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
  }
];

const Certifications = () => {
  return (
    <div className='bg-window dark:bg-dark-window mb-16 p-10 shadow-lg'>
      <SectionHeader title="Certifications" link="#certifications" />

      <p className="mt-4 mb-10 text-12">
        The following certifications demonstrate my expertise and proficiency in various technologies.
      </p>
      <div className="h-full flex justify-center w-full">
        <div className="h-full flex flex-col lg:flex-row lg:flex-wrap lg:content-start gap-5 lg:justify-center w-full">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} {...cert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;