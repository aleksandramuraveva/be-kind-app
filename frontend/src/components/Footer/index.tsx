import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-white py-4">
      <div className="container mx-auto flex justify-center items-center">
        <a
          href="https://github.com/aleksandramuraveva"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          AM 
        </a>
        <span className="ml-1"> © 2024 All rights reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
