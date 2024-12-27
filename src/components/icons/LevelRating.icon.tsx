// import StarRating from "./StarRating";

interface LevelRatingProps {
  level: 1 | 2 | 3;
}

const LevelRating = ({ level }: LevelRatingProps) => {
  return (
    <div className="text-main-color-600 flex gap-2 leading-none items-center">
      <span> Level {level} </span>
    </div>
  );
};

export default LevelRating;
