function LogoLink() {
  // @ts-ignore
  const indexUrl = __MY_CONFIG__.INDEX_URL;

  return (
    <>
      <a href={indexUrl} style={{ textDecoration: "none" }}>
        <h1 style={{ margin: 0 }}>Just Do It</h1>
      </a>
    </>
  );
}

export default LogoLink;
