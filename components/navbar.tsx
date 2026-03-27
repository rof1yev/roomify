import { BoxIcon } from "lucide-react";
import Button from "./ui/button";

const Navbar = () => {
  const isSignedIn = false;
  const username = "rof1yev";

  const handleAuthClick = async () => {};

  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand">
            <BoxIcon className="logo" />
            <span className="name">Roomify</span>
          </div>

          <ul className="links">
            <li>
              <a href="#">Product</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <a href="#">Enterprise</a>
            </li>
          </ul>
        </div>
        <div className="actions">
          {isSignedIn ? (
            <>
              <span className="greeting">
                {username ? `Hi, ${username}` : "Signed In"}
              </span>
              <Button size="sm" onClick={handleAuthClick} className="btn">
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={handleAuthClick}>
                Log In
              </Button>

              <a href="#upload" className="cta">
                Get started
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
