import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Deck from "./Deck";
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
import Study from "./Study";
import EditCard from "./EditCard";
import AddCard from "./AddCard";

function Layout() {
  return (
    <>
      <Header />

      <div className="container">
        {/* TODO: Implement the screen starting here */}
				<Switch>

					<Route exact path="/decks/new">
						<CreateDeck />
					</Route>

					<Route path='/decks/:deckId/edit' exact>
						<EditDeck />
					</Route>

					<Route path='/decks/:deckId/study' exact>
						<Study />
					</Route>

					<Route exact path="/decks/:deckId">
						<Deck />
					</Route>

					<Route exact path='/decks/:deckId/cards/:cardId/edit'>
						<EditCard />
					</Route>

					<Route exact path="/decks/:deckId/cards/new">
						<AddCard />
					</Route>

					<Route path="/" exact>
						<Home />
					</Route>

					<Route>
						<NotFound />
					</Route>
				</Switch>
        {/* <NotFound /> */}
      </div>
    </>
  );
}

export default Layout;
