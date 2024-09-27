import React, { useState, useEffect } from "react";
import "./DescriptionBox.css";
import DOMPurify from "dompurify";

const DescriptionBox = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showDescription, setShowDescription] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [reviewCount, setReviewCount] = useState(122);

  useEffect(() => {
    // Load reviews from local storage on component mount
    loadReviews();
  }, []);

  const saveReview = () => {
    // Sanitize the user input to prevent XSS attacks
    const sanitizedComment = DOMPurify.sanitize(comment);

    // Store the review in local storage
    const newReviews = [...reviews, { rating, comment: sanitizedComment }];
    localStorage.setItem("reviews", JSON.stringify(newReviews));
    setReviews(newReviews);
    setRating(0);
    setComment("");
    setReviewCount(reviewCount + 1);
  };

  const loadReviews = () => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(storedReviews);
    setReviewCount(storedReviews.length);
  };

  const clearReviews = () => {
    localStorage.removeItem("reviews");
    setReviews([]);
    setReviewCount(0);
  };

  const toggleDescription = () => {
    setShowDescription(true);
    setShowReviews(false);
  };

  const toggleReviews = () => {
    setShowDescription(false);
    setShowReviews(true);
  };

  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${showDescription ? "active" : ""}`}
          onClick={toggleDescription}
        >
          Description
        </div>
        <div
          className={`descriptionbox-nav-box fade ${showReviews ? "active" : ""}`}
          onClick={toggleReviews}
        >
          Reviews ({reviewCount})
        </div>
      </div>
      {showDescription && (
        <div className="descriptionbox-description">
          <p className="para">
            Welcome to our premier online marketplace, your ultimate destination
            for all things fashion. From trendy apparel to timeless classics, we
            offer a curated selection of clothing products to suit every style
            and occasion. Explore our extensive range of garments, including
            shirts, dresses, outerwear, and more, all meticulously chosen for
            their quality and craftsmanship. Whether you're seeking everyday
            essentials or statement pieces, we've got you covered with a diverse
            array of options from top brands and designers.
          </p>
        </div>
      )}
      {showReviews && (
        <div className="reviews-container">
          <div className="product-review">
            <h3>Write a Review</h3>
            <form className="review-form" onSubmit={(e) => {
              e.preventDefault();
              saveReview();
            }}>
              <label className="review-label" htmlFor="rating">Rating:</label>
              <select
                className="review-input"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="">Select a rating</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
              <label className="review-label" htmlFor="comment">Comment:</label>
              <textarea
                className="review-input"
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
              <button className="review-button submit-button" type="submit">Submit Review</button>
              {/*<button className="review-button" onClick={clearReviews}>
                Clear Reviews
          </button>*/}
            </form>
            {reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p className="review-rating">Rating: {review.rating} stars</p>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;