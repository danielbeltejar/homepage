import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import Button from './Button';
import SectionHeader from './SectionHeader';

const Footer = () => {
  return (
    <footer id="contact"
      className="text-text dark:text-dark-text bg-window dark:bg-dark-window text-11 p-10 lg:pb-24 shadow-lg lg:w-[740px] mb-0">
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
            className="absolute lg:group-hover:left-[35px] pl-6 h-12 -left-40 flex  rounded-xl text-accent  border-gray-200 border-2 min-w-12 transition-all duration-300 flex-row gap-2    text-11 px-[10px] py-1 justify-center items-center  bg-background ">
            <p>hi@danielbeltejar.es</p>
          </a>
          <p
            className="absolute left-[-160px] flex flex-row h-12  gap-2 text-window dark:text-dark-window text-11 px-[10px] py-1 justify-center items-center cursor-default bg-window dark:bg-dark-window">
            hi@danielbeltejar.ess
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;