import styles from './Error.module.scss';
import {FC} from "react";

interface ErrorComponentProps {
    message: string;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ message }) => {
    return (
        <div className={styles.errorContainer}>
            <span className={styles.errorMessage}>{message}</span>
        </div>
    );
};

export default ErrorComponent;
