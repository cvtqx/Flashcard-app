import React, {useState, useEffect} from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index.js";

function AddCard(){

  const {deckId} = useParams();
  const [deck, setDeck] = useState([]);
  const history = useHistory();
  
  const initialFormState = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  

  //load data from api

  useEffect(() =>{
    async function loadDeck(){
        if(deckId){
            const loadedDeck = await readDeck(deckId);
            setDeck(loadedDeck);
        }
    }
    loadDeck();
  }, [deckId]);

  //create content change handler
  const handleContentChange = ({target}) =>{
            setFormData({
                ...formData,
                [target.name]: target.value
            });
        };


//create click handler

  const handleSaveClick = async (event)=>{
    event.preventDefault();

    //call createCard fn from api
        const newCard = await createCard(deckId, formData);
        console.log(newCard); 
        history.push(`/decks/${deckId}`);
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
          Add Card
        </li>
      </ol>
    </nav>
    <form onSubmit ={handleSaveClick}>
    <div className="card w-100">
      <div className="card-body">
        <h5 className="card-title">{deck.name}: Add Card</h5>
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
            value={formData.front}
            onChange ={handleContentChange}
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
            value={formData.back}
            onChange ={handleContentChange}
          ></textarea>
        </div>
      </div>
      <div className="btn-group" role="group">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Done
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

export default AddCard;