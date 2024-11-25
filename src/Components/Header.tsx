import TextButton from "./TextButton";

function Header() {
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
                <TextButton>About</TextButton>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
