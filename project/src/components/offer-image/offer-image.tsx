type AppScreenProps = {
  images: string[];
}

const MAX_COUNT_IMAGE = 6;

function OfferImage({images}: AppScreenProps): JSX.Element {
  return (
    <div
      className="property__gallery-container container"
      data-testid="galleryContainer"
    >
      <div className="property__gallery">
        {images?.slice(0, MAX_COUNT_IMAGE).map((image) => (
          <div key={image} className="property__image-wrapper">
            <img className="property__image" src={image} alt="Studio" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferImage;
