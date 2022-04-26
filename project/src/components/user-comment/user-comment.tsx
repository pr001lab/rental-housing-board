import {CommentType} from '../../types/comment';
import {computeRatingWidth} from '../../utils/utils';
import {formatDateYYYYMMDD, formatDateMMMMYYYY} from '../../utils/utils';

type AppScreenProps = {
  comment: CommentType;
}

function UserComment({comment}: AppScreenProps): JSX.Element {
  const {
    comment: commentText,
    date,
    rating,
    user} = comment;
  const {avatarUrl, isPro, name} = user;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className={`reviews__avatar-wrapper ${isPro && 'reviews__avatar-wrapper--pro'} user__avatar-wrapper`}>
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
        <span className="property__user-status">
          {isPro && 'Pro'}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: computeRatingWidth(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {commentText}
        </p>
        <time className="reviews__time" dateTime={formatDateYYYYMMDD(new Date(date))}>{formatDateMMMMYYYY(new Date(date))}</time>
      </div>
    </li>
  );
}

export default UserComment;
