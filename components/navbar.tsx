import { BoxIcon } from "lucide-react";
import Button from "./ui/button";
import { useOutletContext } from "react-router";

const Navbar = () => {
  const { signIn, signOut, username, isSignedIn } =
    useOutletContext<AuthContext>();

  const handleAuthClick = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (e) {
        console.log(`Puter sign out failed: ${e}`);
      }
      return;
    }

    try {
      await signIn();
    } catch (e) {
      console.log(`Puter sign in failed: ${e}`);
    }
  };

  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <a href="/" className="brand">
            <BoxIcon className="logo" />
            <span className="name">Roomify</span>
          </a>

          <ul className="links">
            <li>
              <a href="#product">Product</a>
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
