import styles from "./SummarySkeleton.module.css";
export default function SummarySkeleton() {
  return <div className={styles.skeleton} aria-label="Gerando resumo" aria-busy="true"><div className={styles.title} /><div className={styles.line} /><div className={styles.line} /><div className={styles.short} /></div>;
}
