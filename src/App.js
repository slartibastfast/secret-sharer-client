// import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
// import { useHistory } from "react-router-dom";
import { onError } from "./libs/errorLib";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  //const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  // async function handleLogout() {
  //   await Auth.signOut();

  //   userHasAuthenticated(false);

  //   history.push("/login");
  // }

  return (
    !isAuthenticating && (
    <div className="app-frame">
      <header>
        <h1>Shhh</h1>
        <p>Share confidential information securely with expiring links.</p>
      </header>
      <div className="app-body">
        <ErrorBoundary>
          <AppContext.Provider
            value={{ isAuthenticated, userHasAuthenticated }}
          >
            <Routes />
          </AppContext.Provider>
        </ErrorBoundary>
      </div>
      <footer>
        <p>
          By using Shhh, you agree to our <a href="terms">Terms</a> and{" "}
          <a href="privacy">Privacy Policy</a>.
        </p>
      </footer>
    </div>
    )
  );

  // return (
  //   !isAuthenticating && (
  //     <div className="App container">
  //       <Navbar fluid collapseOnSelect>
  //         <Navbar.Header>
  //           <Navbar.Brand>
  //             <Link to="/">Shhh</Link>
  //           </Navbar.Brand>
  //           <Navbar.Toggle />
  //         </Navbar.Header>
  //         <Navbar.Collapse>
  //           <Nav pullRight>
  //             {isAuthenticated ? (
  //               <NavItem onClick={handleLogout}>Logout</NavItem>
  //             ) : (
  //               <>
  //                 <LinkContainer to="/signup">
  //                   <NavItem>Signup</NavItem>
  //                 </LinkContainer>
  //                 <LinkContainer to="/login">
  //                   <NavItem>Login</NavItem>
  //                 </LinkContainer>
  //               </>
  //             )}
  //           </Nav>
  //         </Navbar.Collapse>
  //       </Navbar>
  //       <ErrorBoundary>
  //         <AppContext.Provider
  //           value={{ isAuthenticated, userHasAuthenticated }}
  //         >
  //           <Routes />
  //         </AppContext.Provider>
  //       </ErrorBoundary>
  //     </div>
  //   )
  // );
}
export default App;
