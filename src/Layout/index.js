import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Deck from "./Deck";
import CreateDeck from "./CreateDeck";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
				<Switch>

					<Route path="/">
						<Home />
					</Route>

					<Route exact path="/decks/new">
						<CreateDeck />
					</Route>

					<Route exact path="/decks/:deckId">
						<Deck />
					</Route>

				</Switch>
        {/* <NotFound /> */}
      </div>
    </>
  );
}

export default Layout;
