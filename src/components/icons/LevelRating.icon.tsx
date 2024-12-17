// import StarRating from "./StarRating";

import StarRating from "./StarRating.icon";

interface LevelRatingProps {
  level: 1 | 2 | 3;
  rating: 1 | 2 | 3 | 4 | 5;
}

const LevelRating = ({ level, rating }: LevelRatingProps) => {
  return (
    <div className="text-main-color-600 flex gap-2 leading-none items-center">
      <span> Level {level} </span>
      <StarRating rating={rating} />
    </div>
  );
};

export default LevelRating;
