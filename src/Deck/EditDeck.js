import React, {useState, useEffect} from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { updateDeck, readDeck } from "../utils/api/index.js";

function EditDeck(){
    const {deckId} = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState([]);

    //load deck from api
    useEffect(() =>{ 
            async function loadDeck(){
                try{
                const loadedDeck = await readDeck(deckId);
                console.log(loadedDeck);
                setDeck(loadedDeck);
                }catch(error){
                    console.log("Error loading deck")
                }    
            }
            loadDeck();
        }, [deckId]);

//create content change handler
    const handleContentChange =({target}) =>{
        setDeck({
            ...deck,
            [target.name]: target.value
        })
    }

//create submit handler
const handleSubmitButton = (event)=>{
        event.preventDefault();

        //save updates in api by calling update deck
        async function deckUpdate(){
            try{
                await updateDeck(deck);
                history.push(`/decks/${deckId}`);//moce to the deck page
        }catch(error){
            console.log("Deck update failed")
                }       
            }
            deckUpdate();
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
              Edit Deck
            </li>
          </ol>
        </nav>

        <h4>Edit Deck</h4>
        <form onSubmit ={handleSubmitButton}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Deck Name"
              onChange = {handleContentChange}
              value = {deck.name}
              name ="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              placeholder="Brief description of the deck"
              onChange ={handleContentChange}
              value = {deck.description}
              name = "description"
            ></textarea> 
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary mx-2"
          >
            Save
          </button>
        </form>
      </div>
    );
     
}

export default EditDeck;