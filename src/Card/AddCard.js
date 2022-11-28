import React, {useState, useEffect} from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index.js";
import CardForm from "./CardForm.js";

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
    <h5 className="card-title">{deck.name}: Add Card</h5>

    <CardForm
      card={formData}
      deckId={deckId}
      handleContentChange={handleContentChange}
      handleSaveClick={handleSaveClick}
    />
  </div>
);
}

export default AddCard;