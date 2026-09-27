import styles from "./ExampleChips.module.css";

export type Example = {
  label: string;
  text: string;
};

export const examples: Example[] = [
  {
    label: "Resumir um artigo",
    text: "A inteligência artificial está transformando diversas áreas da sociedade. Na educação, ela personaliza o aprendizado e ajuda professores a identificar dificuldades. Na saúde, apoia diagnósticos e acelera pesquisas. Apesar dos benefícios, seu uso exige transparência, proteção de dados e supervisão humana.",
  },
  {
    label: "Resumir um e-mail longo",
    text: "Olá, equipe! Gostaria de confirmar que a reunião de planejamento foi remarcada para quinta-feira, às 14h. Levaremos os resultados do último trimestre, as prioridades do próximo ciclo e os pontos que precisam de decisão. Por favor, enviem suas atualizações até quarta-feira de manhã.",
  },
  {
    label: "Resumir um contrato",
    text: "Este contrato estabelece a prestação de serviços pelo período de doze meses. O contratante deverá efetuar o pagamento até o quinto dia útil de cada mês. Qualquer parte poderá rescindir o acordo mediante aviso prévio de trinta dias, respeitadas as obrigações já assumidas.",
  },
  {
    label: "Resumir uma notícia",
    text: "A prefeitura anunciou uma nova etapa de revitalização dos parques municipais. As obras incluem iluminação, acessibilidade e recuperação das áreas esportivas. O projeto começará pelos três parques com maior fluxo de visitantes e terá conclusão prevista para o fim do ano.",
  },
];

type Props = { onSelect: (text: string) => void };

export default function ExampleChips({ onSelect }: Props) {
  return (
    <div className={styles.container} aria-label="Exemplos de texto">
      <span className={styles.label}>Experimente:</span>
      <div className={styles.chips}>
        {examples.map((example) => (
          <button key={example.label} type="button" className={styles.chip} onClick={() => onSelect(example.text)}>
            {example.label}
          </button>
        ))}
      </div>
    </div>
  );
}
