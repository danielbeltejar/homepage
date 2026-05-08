import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import Button from './Button';
import SectionHeader from './SectionHeader';

const Footer = () => {
  return (
    <footer id="contact"
      className="text-text dark:text-dark-text text-11 p-10 lg:pb-24 shadow-elevated rounded-t-2xl inner-glow lg:w-[740px] mb-0">
      <SectionHeader title="Contact" link="#contact" />
      <p className="mt-4 mb-10">
        Thank you for visiting my personal web page. If you have any questions or would like to get in touch,
        please feel free to to write to one of the next options. I look forward to hearing from you!
      </p>

      <div className="flex flex-row gap-x-6 h-12">
        <Button icon={faLinkedin} text="LinkedIn" url="https://www.linkedin.com/in/daniel-beltejar-sancho/" />
        <div className="group flex flex-row gap-2 relative">
          <Button text="@" url="mailto:contacto@danielbeltejar.es" />
          <a href="mailto:contacto@danielbeltejar.es"
            className="absolute lg:group-hover:left-[35px] pl-6 h-12 -left-40 flex rounded-xl text-accent border-gray-200 border-2 min-w-12 transition-all duration-300 flex-row gap-2 text-11 px-[10px] py-1 justify-center items-center bg-background opacity-0 lg:group-hover:opacity-100 pointer-events-none lg:group-hover:pointer-events-auto">
            <p>hi@danielbeltejar.es</p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;