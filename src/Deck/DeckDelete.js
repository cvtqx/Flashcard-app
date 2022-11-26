import React from "react";
import {useHistory} from "react-router-dom";
import { deleteDeck } from "../utils/api/index";


function DeckDelete({deckId}){

    const history = useHistory();

    
    const handleDelete = async () =>{
      //display warning message
      const warningMessage = window.confirm(
        "Delete this deck? You will not be able to recover it."
      );
      //delete deck if ok was clicked in warning message
      if (warningMessage) {
        await deleteDeck(deckId);
        history.push("/"); //move to home page
        window.location.reload(); //reloads page
      }
    };

    return (
      <button
        className="btn btn-danger float-right"
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    );
}

export default DeckDelete;