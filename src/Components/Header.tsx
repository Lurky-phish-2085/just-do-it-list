import Logo from "./Logo";
import TextButton from "./TextButton";

type HeaderProps = {
  onAbout: () => void;
};

function Header({ onAbout }: HeaderProps) {
  return (
    <>
      <header style={{ marginBottom: "42px" }}>
        <nav>
          <Logo />
          <div>
            <ul>
              <li>
                <TextButton onClick={onAbout}>About</TextButton>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
