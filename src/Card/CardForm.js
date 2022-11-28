import React from 'react';
import { useHistory } from 'react-router-dom';


function CardForm({ card, deckId, handleContentChange, handleSaveClick }) {

    const history = useHistory();

  return (
    <div>
      <form onSubmit={handleSaveClick}>
        <div className="card w-100">
          <div className="card-body">
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
                required
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
                required
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
export default CardForm