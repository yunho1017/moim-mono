import * as React from "react";
import Layout from "app/modules/layout";
import HomeRedirector from "./redirector";
import { Container, WelcomeText } from "./styledComponents";

function Home() {
  return (
    <>
      <HomeRedirector />
      <Layout>
        <Container>
          <WelcomeText>
            🎉
            <br />
            Welcome!
          </WelcomeText>
        </Container>
      </Layout>
    </>
  );
}

export default Home;
