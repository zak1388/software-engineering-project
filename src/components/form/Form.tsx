import styles from "./form.module.css";

export default function Form({errors, onSubmit, children, className}) {
    return (
        <form className={`${className} ${styles.Form}`} onSubmit={onSubmit}>
            <div className={styles.Errors}>
                { errors && errors.map((err, i) => <p key={i}>{err}</p>) }
            </div>
            {children}
        </form>
    );
}
