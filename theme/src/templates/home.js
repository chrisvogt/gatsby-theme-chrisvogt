/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

import Panel from "../components/panel"
import GitHub from "../components/github"
import Jumbotron from "../components/jumbotron"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <Jumbotron>
      <Styled.div
        sx={{
          display: ["block", "grid"],
          gridGap: 0,
          gridTemplateColumns: ["", "1fr 60%"],
          width: "100%"
        }}
      >
        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: ["center", "flex-end"]
          }}
        >
          <img
            sx={{
              borderColor: "white",
              borderRadius: "50%",
              borderStyle: "solid",
              borderWidth: 3,
              mr: [0, 3]
            }}
            alt="Chris Vogt Avatar"
            src="https://www.chrisvogt.me/assets/images/avatar-512px.jpg"
            height="128"
            width="128"
          />
        </div>
        <Styled.div
          sx={{
            textAlign: ["center", "left"]
          }}
        >
          <Styled.h1>Home Page</Styled.h1>
          <Styled.h2>Cool subheader about site</Styled.h2>
        </Styled.div>
      </Styled.div>
    </Jumbotron>
    Home layout test
    <Panel />
    <GitHub />
  </Layout>
)
