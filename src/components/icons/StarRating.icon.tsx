import React, { FC } from "react";
import { MdStar, MdStarHalf, MdStarBorder } from "react-icons/md";

interface StarRatingProps {
  rating: number; // Rating out of 5
}

const StarRating: FC<StarRatingProps> = ({ rating }) => {
  const equivalentRating = (rating / 5) * 3;
  const stars = [];

  for (let i = 0; i < 3; i++) {
    if (equivalentRating >= i + 1) {
      stars.push(<MdStar size={16} key={i} className="text-main-color-600" />);
    } else if (equivalentRating > i) {
      stars.push(
        <MdStarHalf size={16} key={i} className="text-main-color-600" />
      );
    } else {
      stars.push(<MdStarBorder size={16} key={i} className="text-gray-300" />);
    }
  }

  return (
    <div className="star-rating flex items-center md:space-x-0.5">{stars}</div>
  );
};

export default StarRating;
