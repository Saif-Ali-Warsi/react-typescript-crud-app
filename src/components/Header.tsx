type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return (
    <>
      <header>
        <h3>{title}</h3>
      </header>
    </>
  );
}

export default Header;
