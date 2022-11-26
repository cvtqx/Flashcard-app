import {readDeck} from "../utils/api/index.js";
import DeckDelete from "./DeckDelete.js";
import CardDelete from "../Card/CardDelete.js";
import React, {useEffect, useState} from "react";
import {useParams, useHistory, Link} from "react-router-dom";


function Deck(){
    const {deckId} = useParams();
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const history = useHistory();


//fetch deck info from api
    useEffect(() =>{
        console.log("useEffect");
        async function loadDeck(){
            if(deckId){
                const loadedDeck = await readDeck(deckId);
                console.log(loadedDeck);
                setDeck(loadedDeck);//load deck info
                setCards(loadedDeck.cards)//load this deck's cards
            };
        };
        loadDeck();

    }, [deckId]);

//if deck has cards, display each of them
let cardsDisplay;

 if(cards){
   cardsDisplay = cards.map((card) =>{
     return (
       <div className="card w-100 container text-center" key={card.id}>
         <div className="card-body">
           <div className="row">
             <div className="col">
               <p className="card-text">{card.front}</p>
             </div>
             <div className="col order-1">
               <p className="card-text">{card.back}</p>

            
               <button
                 type="button"
                 className="btn btn-secondary"
                 onClick={() =>
                   history.push(`/decks/${deck.id}/cards/${card.id}/edit`)
                 }
               >
                 Edit
               </button>

               <CardDelete cardId={card.id} deckId={deck.id} />

             </div>
           </div>
         </div>
       </div>
     );
   })
 }
    return (
      <div className="deck">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.push(`/decks/${deck.id}/edit`)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-primary ml-3"
              mx-3
              onClick={() => history.push(`/decks/${deck.id}/study`)}
            >
              Study
            </button>
            <button
              type="button"
              className="btn btn-primary ml-3"
              mx-3
              onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
            >
              +Add cards
            </button>
            <DeckDelete deckId={deck.id} />
            <h4>Cards</h4>
            <section className ="cardsDisplay">{cardsDisplay}</section>
          </div>
        </div>
      </div>
    );

    
}

export default Deck;
