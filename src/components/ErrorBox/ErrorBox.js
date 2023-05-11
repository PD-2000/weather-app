import PropTypes from 'prop-types';
import styles from './ErrorBox.module.scss';

const ErrorBox = (props) => {
  return (
    <div className={styles.errorBox}>
      <h1>
        <span className="fa fa-exclamation-triangle" />
        Error
      </h1>
      <p>
        {props.error}
      </p>
    </div>
  );
};

ErrorBox.propTypes = { 
  children: PropTypes.string
};

export default ErrorBox;