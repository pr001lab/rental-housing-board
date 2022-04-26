import {ChangeEvent} from 'react';

type StarRatingProps = {
  starNumber: string;
  starActionNumber: string,
  title: string;
  onChangeRating: (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function StarRating({
  title,
  starNumber,
  starActionNumber,
  onChangeRating,
}: StarRatingProps): JSX.Element {

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={starNumber}
        checked={starNumber === starActionNumber}
        id={`${starNumber}-stars`}
        type="radio"
        onChange={onChangeRating}
      />
      <label
        htmlFor={`${starNumber}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}

export default StarRating;
