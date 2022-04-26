import ReactLoaderSpiner from 'react-loader-spinner';
import {loadersDisplayType, loaderType} from '../../types/loader';

const loadersSize: loadersDisplayType = {
  'type': loaderType.WATCH,
  'color': '#4481c3',
  'height': '30px',
  'width': '30px',
};

function ButtonsLoader(): JSX.Element {
  return (
    <div data-testid="buttonsLoader">
      <ReactLoaderSpiner
        type={loadersSize['type']}
        color={loadersSize['color']}
        height={loadersSize['height']}
        width={loadersSize['width']}
      />
    </div>
  );
}

export default ButtonsLoader;
