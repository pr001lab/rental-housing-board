import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import {AppRoutes, AuthorizationStatus, offerTypes} from '../../const';
import {OfferType} from '../../types/offer';
import {computeRatingWidth} from '../../utils/utils';
import {selectCurrentOffer} from '../../store/app/actions';
import {selectAuthorizationStatus} from '../../store/user/selectors';
import {favoriteAction} from '../../store/data/api-actions';

const getClassNameComponent = (cardType: string) => {
  switch(cardType) {
    case 'cardsList':
      return {
        modifierArticle: 'cities__place-card',
        modifierDivImageWrapper: 'cities__place-card',
      };
    case 'offer':
      return {
        modifierArticle: 'near-places__card',
        modifierDivImageWrapper: 'near-places',
      };
    case 'favorites':
      return {
        modifierArticle: 'favorites__card',
        modifierDivImageWrapper: 'favorites',
        modifierDivPlaceCardInfo: 'favorites__card-info',
        imageWidth: '150',
        imageHeight: '110',
      };
    default:
      throw new Error(`Unknouwn oreder state: '${cardType}'`);
  }
};

type AppScreenProps = {
  offer: OfferType;
  cardType: string;
}

function Card({offer, cardType}: AppScreenProps): JSX.Element {
  const {
    id,
    isFavorite,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;

  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const history = useHistory();
  const dispatch = useDispatch();
  const getClassName = getClassNameComponent(cardType);
  const {
    modifierArticle,
    modifierDivImageWrapper,
    modifierDivPlaceCardInfo,
    imageWidth = '260',
    imageHeight = '200'} = getClassName;

  const handleSelectOffer = (selectedOffer: OfferType | null) => {
    if (!AppRoutes.Offer.includes(cardType)) {
      dispatch(selectCurrentOffer(selectedOffer));
    }
  };

  const handleButtonClick = (idOffer: number) => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(favoriteAction(idOffer, !isFavorite));
    } else {
      history.push(AppRoutes.Login);
    }
  };

  const buttonIsFavorite = cn('place-card__bookmark-button',
    {
      'place-card__bookmark-button--active': isFavorite,
    }, 'button');

  return (
    <article
      className={`${modifierArticle} place-card`}
      onMouseEnter={() => handleSelectOffer ? handleSelectOffer(offer) : undefined}
      onMouseLeave={() => handleSelectOffer ? handleSelectOffer(null) : undefined}
      data-testid="imageHover"
    >
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div
        className={
          `${modifierDivImageWrapper}__image-wrapper place-card__image-wrapper`
        }
      >
        <img
          className="place-card__image"
          src={previewImage}
          width={imageWidth}
          height={imageHeight}
          alt="Apartment"
        />
      </div>
      <div className={`${modifierDivPlaceCardInfo} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={buttonIsFavorite}
            type="button"
            onClick={() => handleButtonClick(id)}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: computeRatingWidth(rating)}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.Offer}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{offerTypes[type]}</p>
      </div>
    </article>
  );
}

export default Card;
