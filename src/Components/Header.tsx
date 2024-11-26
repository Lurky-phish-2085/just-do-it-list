import TextButton from "./TextButton";

type HeaderProps = {
  onAbout: () => void;
};

function Header({ onAbout }: HeaderProps) {
  return (
    <>
      <header style={{ marginBottom: "42px" }}>
        <nav>
          <hgroup>
            <a href="/" style={{ textDecoration: "none" }}>
              <h1 style={{ margin: 0 }}>Just Do It</h1>
            </a>
            <p>just another to do list</p>
          </hgroup>
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
