import { React, Container } from "../common";

import { Header, Footer } from "../components";

function Page (props) {
  const rootUrl = "/";
  const appTitle = "Ontrack Test";

  return (
    <>
      <Header url={rootUrl} title={appTitle} />
        <Container fluid>
          {props.children}
        </Container>
      <Footer />
    </>
  );
}
export default Page;
