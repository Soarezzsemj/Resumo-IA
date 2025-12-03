import styles from "./SummaryBar.module.css";

function SummaryBar({ summary }: { summary: string }) {
  return (
    <div className={styles.box}>
      <h2 className={styles.title}>Resumo Gerado:</h2>
      <p className={styles.text}>{summary}</p>
    </div>
  );
}

export default SummaryBar;