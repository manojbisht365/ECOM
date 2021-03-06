import React, { useState } from "react";
import Rating from "react-rating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import img2 from "./star-yellow.png";
import { addProductReview } from "../actions/productActions";

export default function Review({ product }) {
  const [rating, setrating] = useState(5);
  const [comment, setcomment] = useState("");
  const dispatch = useDispatch();

  function sendreview() {
    alert(rating + comment);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var alreadyreviewed;

    for (var i = 0; i < product.reviews.length; i++) {
      if (product.reviews[i].userid == currentUser._id) alreadyreviewed = true;
    }

    if (alreadyreviewed) {
    } else {
      const review = {
        rating: rating,
        comment: comment,
      };
      dispatch(addProductReview(review, product._id));
    }
  }
  return (
    <div>
      <h1 style={{ marginLeft: "-50px" }}>Give your Review</h1>
      <Rating
        // style={{ color: "orange" }}
        // initialRating={product.rating}
        // emptySymbol="fa fa-star-o fa-1x"
        // fullSymbol="fa fa-star fa-1x"
        readonly={true}
        initialRating={rating}
        fullSymbol={<img src={img2} className="icon" />}
        onChange={(e) => {
          setrating(e);
        }}
      />
      <input
        type="text"
        className="form-control mt-2 mr-10 "
        style={{ width: "%" }}
        value={comment}
        onChange={(e) => {
          setcomment(e.target.value);
        }}
      />
      <div className="btn btn-dark mt-2" onClick={sendreview}>
        submit review
      </div>
      <br />
      <br />
      <h1 style={{ marginLeft: "-90px" }}>latest review</h1>
      {product.reviews &&
        product.reviews.map((review) => {
          return (
            <div className="text-left">
              <Rating
                readonly={true}
                initialRating={review.rating}
                fullSymbol={<img src={img2} className="icon" />}
                readonly
              />
              <h1>{setcomment}</h1>
              <p>{review.comment}</p>
              <h1>{review.comment}</h1>
              <p>By:{review.name}</p>
            </div>
          );
        })}
    </div>
  );
}
