import { useState } from "react";
import styles from "./InputBar.module.css";

function InputBar({ onSend }: { onSend: (texto: string) => void }) {
    const [texto, setTexto] = useState("");

    return (
        <div className={styles["main"]}>
            
            <div className={styles["Box-input"]}> 
                <textarea
                    className={styles.textarea}
                    placeholder="Digite seu texto aqui..."
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />
            </div>

            <button className={styles["submit-button"]} onClick={() => onSend(texto)}>
                        ENVIAR
            </button>

        </div>
    );
}

export default InputBar;