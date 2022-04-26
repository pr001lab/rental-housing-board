type AppScreenProps = {
  good: string;
}

function OfferProperty({good}: AppScreenProps): JSX.Element {
  return (
    <li className="property__inside-item">
      {good}
    </li>
  );
}

export default OfferProperty;
