import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export const Loading = () => {
    return (
        <div className="loading">
            <FontAwesomeIcon icon={faSpinner} className='fa-2x' spin />
        </div>
    );
}