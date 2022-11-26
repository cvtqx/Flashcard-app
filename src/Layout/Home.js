import React from "react";
import {useHistory} from "react-router-dom";
import DeckList from "./DeckList";

function Home() {
    const history = useHistory();

  return (
    <div>
      <button 
      type="button" 
      className ="btn btn-secondary"
      onClick={() => {history.push("/decks/new")}}>
        + Create Deck
      </button>
     <br />
     <br />
     <DeckList />
    </div>
  );
}

export default Home;
