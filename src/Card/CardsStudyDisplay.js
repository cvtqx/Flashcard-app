import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function CardsStudyDisplay({cards}){

    const initialCardState ={
        index: 0,
        text: "",
        length: 0,
        next: false,
        isFront: true,
    };

    const [cardData, setCardData] = useState({
        ...initialCardState,
        length: cards.length,
        text: cards[0].front
    });

    const history = useHistory();


    //create flip button handler

    const flipHandler =() =>{

    if (cardData.isFront){
        setCardData({
                ...cardData,
                text: cards[cardData.index].back, //change text to back side
                isFront: false,
                next: true,
            });
        }else{
            setCardData({
              ...cardData,
              text: cards[cardData.index].front, //change text to back side
              isFront: true,
              next: false,
            });
        }
    };

    //create next button click handler

    const nextCardButton = () => {
        //check if the card is the last in the deck
        if(cardData.index === cards.length -1){
           if(
        //display message
            window.confirm(
                "Restart cards? \n Click 'cancel' to return to the homepage."
            )
           ) {
    //if warning message is ok-clicked set card data to initial state
            setCardData({
                ...initialCardState,
                length: cards.length,
                text: cards[0].front,
            });
           }else{
    //return to home page if cancel is clicked on warning message
            history.push("/");
           }
    //if the card is not the last in deck set card data to next card
        }else{
            setCardData({
                ...cardData,
                index: cardData.index+1,
                isFront: true,
                next: false,
                text: cards[cardData.index+1].front,
            });
        }
    };

    return (
      <div className="card w-100">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardData.index+1} of {cards.length}
          </h5>
          <p className="card-text">{cardData.text}</p>
          <button
            type="button"
            className=" btn btn-secondary"
            onClick={flipHandler}
          >
            Flip
          </button>
          {/* display next button */}
          {cardData.next && (
            <button
              type="button"
              className=" btn btn-primary ml-3"
              onClick={nextCardButton}
            >
              Next
            </button>
          )}
        </div>
      </div>
    );

}
    
    
export default CardsStudyDisplay;