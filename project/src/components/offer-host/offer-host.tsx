import {User} from '../../types/offer';
import OfferPropertyDescription from '../offer-property-description/offer-property-description';

type AppScreenProps = {
  host: User;
  description: string;
}

function OfferHost({host, description}: AppScreenProps): JSX.Element {
  const {avatarUrl, isPro, name} = host;
  const descriptionTexts = description.split('\n');

  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className={`property__avatar-wrapper ${isPro && 'property__avatar-wrapper--pro'} user__avatar-wrapper`}>
          <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="property__user-name">
          {name}
        </span>
        {isPro &&
      <span className="property__user-status">
        Pro
      </span>}
      </div>
      <div className="property__description">
        {descriptionTexts.map((text) => <OfferPropertyDescription text={text} key={text} />)}
      </div>
    </div>
  );
}

export default OfferHost;
