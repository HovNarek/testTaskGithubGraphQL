import {FC} from 'react';

import './Loader.scss';

const Loader: FC = () => {
    return (
        <div className="loader">
            <div className="spinner"></div>
        </div>
    );
};

export default Loader;
