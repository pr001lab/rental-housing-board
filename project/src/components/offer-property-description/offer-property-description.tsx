type AppScreenProps = {
  text: string;
}

function OfferPropertyDescription({text}: AppScreenProps): JSX.Element {
  return (
    <p
      className="property__text"
      data-testid="propertyText"
    >
      {text}
    </p>
  );
}

export default OfferPropertyDescription;
