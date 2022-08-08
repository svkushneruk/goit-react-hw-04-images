import { LineWave } from 'react-loader-spinner';
import css from 'components/Loader/Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <LineWave />
    </div>
  );
};
