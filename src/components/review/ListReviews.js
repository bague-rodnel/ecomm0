import React from 'react'

const ListReviews = ({ reviews }) => {
  return (
    <div className="reviews w-75 mx-auto">
      <h3>Product Reviews:</h3>
      { reviews && reviews.map( review => (
        <div key={review._id} className="review-card my-3">
          <div className="rating-outer">
              <div className="rating-inner" style={{ width: `${(review.rating/5) * 100}%` }}></div>
          </div>
          <p className="small text-gray-600">"{review.comment}"</p>
          <p className="italic text-gray-400 small">- {review.name}</p>

        </div>
      ))}
      
    </div>
  )
}

export default ListReviews;
