const tf = require("@tensorflow/tfjs-node");

// Criar o modelo
const model = tf.sequential();
model.add(tf.layers.dense({ units: 10, inputShape: [1], activation: "relu" }));
model.add(tf.layers.dense({ units: 3, activation: "softmax" }));

// Compilar o modelo
model.compile({
  optimizer: "adam",
  loss: "categoricalCrossentropy",
  metrics: ["accuracy"],
});

// Dados de treinamento (exemplo)
const xTrain = tf.tensor2d([[1], [2], [3], [4], [5]]);
const yTrain = tf.tensor2d([
  [1, 0, 0], // Explorer
  [0, 1, 0], // Creator
  [0, 0, 1], // Collaborator
  [1, 0, 0], // Explorer
  [0, 0, 1], // Collaborator
]); // Labels one-hot encoded

// Treinar o modelo
model.fit(xTrain, yTrain, { epochs: 100 }).then(() => {
  // Função para prever o tipo de arquétipo com base na pergunta
  function predictArchetype(pergunta) {
    const tensorInput = tf.tensor2d([[pergunta]]);
    const prediction = model.predict(tensorInput);
    return prediction.arraySync();
  }

  // Pergunta real escolhida aleatoriamente
  const perguntas = [
    "How do you usually spend your free time?",
    "What are your favorite hobbies or interests?",
    "Do you prefer working in a team or independently?",
    "What is your greatest achievement so far?",
    "How do you deal with failure?",
    "What is your opinion about life?",
    "What makes you feel alive?",
    "What are your plans for the future?",
    "Do you have any goal or objective you want to achieve?",
    "What inspires you to be a better person?",
    "How do you handle challenges and adversities?",
    "What is your greatest fear?",
    "Do you believe in destiny or free will?",
    "What is your perspective on love?",
    "How do you define success?",
  ];

  const perguntaAleatoria =
    perguntas[Math.floor(Math.random() * perguntas.length)];

  // Exemplo de uso com uma pergunta real escolhida aleatoriamente
  const arquetipoPrevisto = predictArchetype(perguntaAleatoria);
  console.log("Arquétipo previsto para a pergunta:", perguntaAleatoria);
  console.log("Arquétipo previsto:", arquetipoPrevisto);
});
