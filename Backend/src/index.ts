import { generateSummary } from "./aiService";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("bem vindo ao resumo-ia (modo terminal por enquanto)");
console.log("digite o texto a ser resumido");
console.log("Digite 'sair' para fechar.\n");

const askQuestion = () => {
    rl.question("Cole seu texto aqui: ", async (input) => {

        // ele vai checar
        if (input.toLowerCase() == "sair"){
            console.log(" Saindo");
            rl.close();
            return;
        } 

        // se nao escrever o sair ele faz o resumo, quando mandar o codigo 
        console.log(" Fazendo seu resumo");

        try {
            const summary = await generateSummary(input);
            console.log("-----------------------------------------");
            console.log(" SEU RESUMO:");
            console.log(summary);
            console.log("-----------------------------------------\n");

        } catch (error){
            console.error("Erro ao gerar o assunto:", error);
        }

        // o askQuestion chama a função dnv, para proximas perguntas
        askQuestion();
    });
};

// Não esqueça de iniciar o ciclo:
askQuestion(); 