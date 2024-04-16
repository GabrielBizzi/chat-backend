const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3333;
const nodemon = require("nodemon");

app.use(cors());
app.use(bodyParser.json());

const arquetipos = {
  Explorador: [
    "exploração",
    "descoberta",
    "curiosidade",
    "liberdade",
    "aventura",
    "inovação",
    "negócios B2B",
    "empreendedorismo",
  ],
  Sábio: [
    "compreensão",
    "independência",
    "conhecimento",
    "sabedoria",
    "intelecto",
    "experiência",
    "educação",
    "aprendizado",
  ],
  Inocente: [
    "pureza",
    "otimismo",
    "simplicidade",
    "alegria",
    "confiança",
    "esperança",
    "positividade",
    "transparência",
  ],
  Cara_Comum: [
    "acessibilidade",
    "simplicidade",
    "familiaridade",
    "conveniência",
    "comunidade",
    "autenticidade",
    "proximidade",
    "acessível",
  ],
  Bobo_da_Corte: [
    "diversão",
    "humor",
    "irreverência",
    "entretenimento",
    "palhaçada",
    "criatividade",
    "brincadeira",
    "excentricidade",
  ],
  Amante: [
    "paixão",
    "sensualidade",
    "romance",
    "indulgência",
    "desejo",
    "luxúria",
    "sedução",
    "intimidade",
  ],
  Governante: [
    "luxo",
    "prestígio",
    "excelência",
    "exclusividade",
    "soberania",
    "liderança",
    "domínio",
    "autoridade",
  ],
  Criador: [
    "inovação",
    "criatividade",
    "design",
    "excelência",
    "originalidade",
    "artesanato",
    "desenvolvimento",
    "inspiração",
  ],
  Cuidador: [
    "compaixão",
    "cuidado",
    "solidariedade",
    "sustentabilidade",
    "proteção",
    "apoio",
    "responsabilidade",
    "bem-estar",
  ],
  Herói: [
    "determinação",
    "coragem",
    "resiliência",
    "superioridade",
    "heroísmo",
    "força",
    "vitória",
    "altruísmo",
  ],
  Mago: [
    "magia",
    "mistério",
    "transformação",
    "poder",
    "encantamento",
    "alquimia",
    "espiritualidade",
    "mistério",
  ],
  Rebelde: [
    "rebeldia",
    "liberdade",
    "individualidade",
    "ousadia",
    "audácia",
    "revolução",
    "contracultura",
    "independência",
  ],
};

const perguntas = [
  "Qual a maturidade da marca? (quanto tempo ela tem).",
  "Já trabalhou comunicação?",
  "Qual o público-alvo?",
  "Já tem identidade visual definida? (logomarca, manual de cores e etc).",
  "Qual a principal dor da marca? (comunicação, marketing, vendas, se conectar com o público-alvo).",
];

let proximaPerguntaIndex = 0;
let respostasUsuario = [];

function preprocessarFrase(frase) {
  return frase.toLowerCase().split(" ");
}

function determinarArquetipo(respostas) {
  let pontuacaoArquetipos = {};

  for (let arquetipo in arquetipos) {
    pontuacaoArquetipos[arquetipo] = 0;
  }

  for (let resposta of respostas) {
    let tokens = preprocessarFrase(resposta);
    for (let arquetipo in arquetipos) {
      for (let caracteristica of arquetipos[arquetipo]) {
        if (tokens.includes(caracteristica)) {
          pontuacaoArquetipos[arquetipo]++;
        }
      }
    }
  }

  let arquetipoFinal = "";
  let pontuacaoMaxima = -1;
  for (let arquetipo in pontuacaoArquetipos) {
    if (pontuacaoArquetipos[arquetipo] > pontuacaoMaxima) {
      arquetipoFinal = arquetipo;
      pontuacaoMaxima = pontuacaoArquetipos[arquetipo];
    }
  }

  return arquetipoFinal;
}

app.get("/primeira-pergunta", (req, res) => {
  proximaPerguntaIndex = 0;
  respostasUsuario = [];
  const primeiraPergunta = perguntas[0];
  res.json({ pergunta: primeiraPergunta });
});

app.post("/resposta", (req, res) => {
  const resposta = req.body.resposta;
  respostasUsuario.push(resposta);
  proximaPerguntaIndex++;
  if (proximaPerguntaIndex < perguntas.length) {
    const proximaPergunta = perguntas[proximaPerguntaIndex];
    res.json({ pergunta: proximaPergunta });
  } else {
    const arquetipo = determinarArquetipo(respostasUsuario);
    res.json({ arquetipo });
  }
});

app.get("/reiniciar", (req, res) => {
  proximaPerguntaIndex = 0;
  respostasUsuario = [];
  res.json({ message: "O questionário foi reiniciado." });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
