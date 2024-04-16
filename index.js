const brain = require('brain.js');

// Criar uma instância da rede neural feedforward
const net = new brain.recurrent.LSTM();

// Dados de treinamento para o arquétipo Explorer
const trainingDataExplorer = [
    { input: 'How do you usually spend your free time?', output: { Explorer: 1 } },
    { input: 'What are your favorite hobbies or interests?', output: { Explorer: 1 } },
    // Adicione mais dados de treinamento para o arquétipo Explorer conforme necessário
];

// Dados de treinamento para o arquétipo Creator
const trainingDataCreator = [
    { input: 'How do you usually spend your free time?', output: { Creator: 1 } },
    { input: 'What are your favorite hobbies or interests?', output: { Creator: 1 } },
    // Adicione mais dados de treinamento para o arquétipo Creator conforme necessário
];

// Dados de treinamento para o arquétipo Collaborator
const trainingDataCollaborator = [
    { input: 'How do you usually spend your free time?', output: { Collaborator: 1 } },
    { input: 'What are your favorite hobbies or interests?', output: { Collaborator: 1 } },
    // Adicione mais dados de treinamento para o arquétipo Collaborator conforme necessário
];

// Treinar a rede neural com os dados fornecidos para cada arquétipo
net.train([
    ...trainingDataExplorer,
    ...trainingDataCreator,
    ...trainingDataCollaborator
], {
    iterations: 200, // Número de vezes que a rede será treinada
    log: true, // Exibir logs durante o treinamento
    errorThresh: 0.01 // Limiar de erro para parar o treinamento
});

// Função para prever o tipo de arquétipo com base na pergunta
function predictArchetype(pergunta) {
    const output = net.run(pergunta);
    return output;
}

// Exemplo de uso:
const pergunta = 'How do you usually spend your free time?'; // Substitua com a pergunta real
const arquetipoPrevisto = predictArchetype(pergunta);
console.log(arquetipoPrevisto); // Isso deveria retornar o arquétipo previsto
