import {FC} from "react";

import './Error.scss';

interface ErrorComponentProps {
    message: string;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ message }) => {
    return (
        <div className="errorContainer">
            <span className="errorMessage">{message}</span>
        </div>
    );
};

export default ErrorComponent;
