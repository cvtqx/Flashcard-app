import React, {useState, useEffect} from "react";
import {listDecks} from "../utils/api/index";
import {useHistory} from "react-router-dom";
import DeckDelete from "../Deck/DeckDelete";


function DeckList() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  // load decks using listDecks async fn 
  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        const list = await listDecks(abortController.signal);
        setDecks(list);
        console.log(list);
      } catch (error) {
        console.log("error creating deck list");
      }
      return () => {
        abortController.abort();
      };
    }
    loadDecks();
  }, []);

  //map decks to create a deck view for each deck

  const deckViews = decks.map((deck) => {
    return (
      <div className="card w-100 mb-3" key={deck.id}>
        <div className="card-body">
          <h5 className="card-title">
            {deck.name}
            <p className="card-text">
              <small className="text-muted float-right">
                {deck.cards.length} cards
              </small>
            </p>
          </h5>
          <p className="card-text">{deck.description}</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${deck.id}`)}
          >
            View
          </button>
          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={() => history.push(`/decks/${deck.id}/study`)}
          >
            Study
          </button>
          <DeckDelete deckId={deck.id} /> {/*red delete button */}
        </div>
      </div>
    );
  });

  //return a list of decks
  return <div className="decks">{deckViews}</div>;
}

export default DeckList;
