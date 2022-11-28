import React, {useState, useEffect} from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import {readDeck, readCard, updateCard} from '../utils/api/index.js';
import CardForm from './CardForm.js';

function EditCard(){
        
        const {deckId, cardId} = useParams();
        const history = useHistory();
        const [card, setCard] = useState([]);
        const [deck, setDeck] = useState([]);

        //upload deck and card from api

        useEffect(() =>{
            console.log("useEffect");
            async function loadDeck(){
                const loadedDeck = await readDeck(deckId);
                setDeck(loadedDeck);
            }
            loadDeck();

            async function loadCard(){
                const loadedCard = await readCard(cardId);
                setCard(loadedCard);
            }
            loadCard();
        }, [deckId, cardId]);

      
    // handle content change
        const handleContentChange =({target}) =>{
            setCard({
                ...card,
                [target.name]: target.value
            })
        };

    //handle submit by calling updateCard to save updated in api

       const handleSaveClick =(event) =>{
        event.preventDefault();
        async function saveCard(){
            try{
                await updateCard(card);
                history.push(`/decks/${deckId}`);
            }catch(error){
                console.log("Update failed")
            }
        }
        saveCard();
       }

       return (
         <div>
           <nav aria-label="breadcrumb">
             <ol className="breadcrumb">
               <li className="breadcrumb-item">
                 <Link to="/">Home</Link>
               </li>
               <li className="breadcrumb-item">
                 <Link to={`/decks/${deckId}`}>{deck.name}</Link>
               </li>
               <li className="breadcrumb-item active" aria-current="page">
                 Edit Card {cardId}
               </li>
             </ol>
           </nav>
           <h5 className="card-title">Edit Card</h5>
           <CardForm
             card={card}
             deckId={deckId}
             handleContentChange={handleContentChange}
             handleSaveClick={handleSaveClick}
           />
         </div>
       );
}

export default EditCard;