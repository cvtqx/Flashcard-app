import React from 'react';
import {deleteCard} from "../utils/api/index.js";



function CardDelete({cardId}){

  //create deleter handler
    const handleDelete = async () => {
      //display warning message
      const warningMessage = window.confirm(
        "Delete this card? You will not be able to recover it."
      );
      
      if (warningMessage) {
        await deleteCard(cardId);
        window.location.reload() //reloads page
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

export default CardDelete;