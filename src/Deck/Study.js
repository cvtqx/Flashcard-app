import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

import { readDeck } from "../utils/api/index.js";
import CardsStudyDisplay from "../Card/CardsStudyDisplay.js";


function Study(){
    const {deckId} = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState([]);

    //load current deck data

    useEffect(() =>{
        console.log("study useEffect");
        async function loadDeck(){
            try{
                const loadedDeck = await readDeck(deckId);
                setDeck(loadedDeck);
            }catch(error){
                console.log(error)
            }     
        }
        loadDeck();
        console.log(deck.cards);
    }, [deckId]);


    return (
      <div className="deck">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>Study: {deck.name}</h1>
        {/* if deck has less than 3 cards */}
        {deck.id && deck.cards.length < 3 && (
          <>
            <h3>Not enough cards.</h3>
            <p>
              {" "}
              You need at least 3 cards to study.{" "}
              {deck.cards.length === 1
                ? "There is 1 card in this deck."
                : `There are ${deck.cards.length} cards in this deck.`}
            </p>
            <button
              type="button"
              className="btn btn-primary"
              mx-3
              onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
            >
              +Add cards
            </button>
          </>
        )}
        {/* if dekc has more than 2 cards */}
         {deck.id && deck.cards.length > 2 &&(
            <CardsStudyDisplay cards = {deck.cards} />
        )
        } 
      </div>
    );
}

export default Study;