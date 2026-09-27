import styles from "./EmptyState.module.css";

export default function EmptyState() {
  return <div className={styles.empty}><span className={styles.icon}>✦</span><p>Seu resumo vai aparecer aqui</p><small>Escolha um formato e envie seu texto para começar.</small></div>;
}
