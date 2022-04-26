import ReactLoaderSpiner from 'react-loader-spinner';
import {loadersDisplayType, loaderType} from '../../types/loader';
import styles from './loader.module.css';

const loadersSize: loadersDisplayType = {
  'type': loaderType.WATCH,
  'color': '#4481c3',
  'height': '150px',
  'width': '150px',
};

function Loader(): JSX.Element {
  return (
    <div
      className={styles.loader}
      data-testid="loader"
    >
      <ReactLoaderSpiner
        type={loadersSize['type']}
        color={loadersSize['color']}
        height={loadersSize['height']}
        width={loadersSize['width']}
      />
    </div>
  );
}

export default Loader;
