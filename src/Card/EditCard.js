import React, {useState, useEffect} from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import {readDeck, readCard, updateCard} from "../utils/api/index.js";

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
           <form onSubmit={handleSaveClick}>
             <div className="card w-100">
               <div className="card-body">
                 <h5 className="card-title">Edit Card</h5>
                 <div className="mb-3">
                   <label htmlFor="front" className="form-label">
                     Front
                   </label>
                   <textarea
                     type="text"
                     rows="3"
                     className="form-control"
                     id="front"
                     name="front"
                     placeholder="Front side of the card"
                     value={card.front}
                     onChange={handleContentChange}
                   ></textarea>
                 </div>

                 <div className="mb-3">
                   <label htmlFor="back" className="form-label">
                     Back
                   </label>
                   <textarea
                     type="text"
                     rows="3"
                     className="form-control"
                     id="back"
                     name="back"
                     placeholder="Back side of the card"
                     value={card.back}
                     onChange={handleContentChange}
                   ></textarea>
                 </div>
               </div>
               <div className="btn-group" role="group">
                 <button
                   type="button"
                   className="btn btn-secondary"
                   onClick={() => history.push(`/decks/${deckId}`)}
                 >
                   Cancel
                 </button>
                 <button type="submit" className="btn btn-primary mx-3">
                   Save
                 </button>
               </div>
             </div>
           </form>
         </div>
       );
}

export default EditCard;