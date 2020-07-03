import { React, Navbar, Container } from "../../common";

function Header(props) {
  const { url, title } = props;
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href={url}>{title}</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
