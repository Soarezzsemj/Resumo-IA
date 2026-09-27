import styles from "./LanguageSelector.module.css";
export type SummaryLanguage = "pt-BR" | "en" | "es";
export default function LanguageSelector({ value, onChange }: { value: SummaryLanguage; onChange: (value: SummaryLanguage) => void }) {
  return <label className={styles.label}>Idioma do resumo
    <select value={value} onChange={(event) => onChange(event.target.value as SummaryLanguage)}>
      <option value="pt-BR">PT-BR</option><option value="en">EN</option><option value="es">ES</option>
    </select>
  </label>;
}
