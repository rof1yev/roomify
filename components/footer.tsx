import { BoxIcon, ExternalLinkIcon } from "lucide-react";

const Footer = () => {
  const startYear = 2026;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <a href="/" className="brand">
        <BoxIcon className="logo" />
        <span className="name">Roomify</span>
      </a>
      <div className="flex">
        <p>
          {startYear === currentYear
            ? startYear
            : `${startYear}-${currentYear}`}{" "}
          All Rights Reserved.
        </p>
      </div>

      <a href="https://github.com/rof1yev">
        <ExternalLinkIcon size={16} />
        <span>Github</span>
      </a>
    </footer>
  );
};

export default Footer;
