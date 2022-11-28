import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {createDeck} from "../utils/api/index.js"

function CreateDeck(){
    
  const history = useHistory();
  const initialFormState ={
        name: "",
        description: "",
    };
  const [formData, setFormData] = useState({...initialFormState});


//create content change handler
        const handleContentChange = ({target}) =>{
            setFormData({
                ...formData,
                [target.name]: target.value
            });
        }

//submits the form when submit button is clicked, the user is then taken to the deck screen
    const handleSubmitButton = (event) =>{
        event.preventDefault();

    //calling createDeck fn from 'api/index'
        createDeck(formData)
        .then((newDeck) =>{
            console.log(newDeck);
            history.push(`/decks/${newDeck.id}`);//move to new deck page
        })
        .catch((error) =>
        console.log(error));
    }


    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>

        <h4>Create Deck</h4>
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
              value = {formData.name}
              name ="name"
              required
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
              value = {formData.description}
              name = "description"
              required
            ></textarea> 
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary mx-2"
          >
            Submit
          </button>
        </form>
      </div>
    );
}
export default CreateDeck;
