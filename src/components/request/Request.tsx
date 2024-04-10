import styles from "./request.module.css";

export default function Request({children}) {
    return (
        <div className={`${styles.request}`}>
            {children}
        </div>
    );
}
