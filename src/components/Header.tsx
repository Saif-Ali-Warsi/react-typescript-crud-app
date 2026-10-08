type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return (
    <>
      <header>
        <h3>{title}</h3>
        <h3>TCRUD Application</h3>
      </header>
    </>
  );
}

export default Header;
