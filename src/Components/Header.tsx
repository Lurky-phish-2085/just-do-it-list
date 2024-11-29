import { useRef, useState } from "react";
import AboutDialog from "./AboutDialog";
import Logo from "./Logo";
import TextButton from "./TextButton";

function Header() {
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);
  const headerRef = useRef<HTMLHeadElement | null>(null);

  const handleOnAboutOpen = () => {
    setAboutDialogOpen(true);
  };
  const handleOnAboutClose = () => {
    setAboutDialogOpen(false);
  };

  return (
    <>
      <header ref={headerRef} style={{ marginBottom: "42px" }}>
        <nav>
          <Logo />
          <div>
            <ul>
              <li>
                <TextButton onClick={handleOnAboutOpen}>About</TextButton>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <AboutDialog open={aboutDialogOpen} onAccept={handleOnAboutClose} />
    </>
  );
}

export default Header;
