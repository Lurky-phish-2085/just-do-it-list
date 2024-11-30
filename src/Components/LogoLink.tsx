function LogoLink() {
  return (
    <>
      <a
        href={`${import.meta.env.BASE_URL}`}
        style={{ textDecoration: "none" }}
      >
        <h1 style={{ margin: 0 }}>Just Do It</h1>
      </a>
    </>
  );
}

export default LogoLink;
