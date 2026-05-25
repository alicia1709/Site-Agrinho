// ==========================================================================
// LÓGICA DE INTERATIVIDADE E SIMULADORES - AGROECOTECH
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarMenuMobile();
    inicializarQuiz();
});

// 1. Menu Mobile Responsivo
function inicializarMenuMobile() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// 2. Calculadora de Impacto Agro-Sustentável
function calcularImpacto() {
    const hectaresInput = document.getElementById('hectares').value;
    const nivelTech = document.getElementById('tecnologia-select').value;
    const resultadoBox = document.getElementById('resultado-calculadora');

    if (!hectaresInput || hectaresInput <= 0) {
        resultadoBox.classList.remove('hidden');
        resultadoBox.innerHTML = "⚠️ Por favor, insira uma quantidade válida de hectares.";
        return;
    }

    const hectares = parseFloat(hectaresInput);
    let economiaAguaDiaria = 0;
    let creditoCarbonoAno = 0;
    let textoResultado = "";

    if (nivelTech === "tradicional") {
        textoResultado = `🛑 <strong>Modelo Tradicional:</strong> Alto consumo de recursos. Ao adotar tecnologias básicas, você poderia mitigar riscos de desperdício severo.`;
    } else if (nivelTech === "intermediaria") {
        economiaAguaDiaria = hectares * 450; 
        creditoCarbonoAno = hectares * 0.25; 
        textoResultado = `🌱 <strong>Manejo Integrado!</strong><br><br>
                          💧 Economia estimada: <strong>${economiaAguaDiaria.toLocaleString('pt-BR')} litros/dia</strong>.<br>
                          📉 Redução de Carbono: Retenção de <strong>${creditoCarbonoAno.toFixed(1)} toneladas/ano de CO₂</strong>.`;
    } else if (nivelTech === "alta_precisao") {
        economiaAguaDiaria = hectares * 1200; 
        creditoCarbonoAno = hectares * 0.6; 
        textoResultado = `🚀 <strong>Alta Precisão EcoTech!</strong><br><br>
                          💧 Economia massiva: <strong>${economiaAguaDiaria.toLocaleString('pt-BR')} litros/dia</strong>.<br>
                          📉 Neutralização: Evita cerca de <strong>${creditoCarbonoAno.toFixed(1)} toneladas/ano de CO₂</strong> com matriz solar.`;
    }

    resultadoBox.innerHTML = textoResultado;
    resultadoBox.classList.remove('hidden');
}

// 3. Quiz Interativo AgroSustentável
const dadosQuiz = [
    {
        pergunta: "Qual setor consome cerca de 70% de toda a água doce do planeta?",
        opcoes: ["Indústrias Têxteis", "Uso Doméstico Urbano", "Agropecuária / Irrigação"],
        correta: 2
    },
    {
        pergunta: "Como os drones agrícolas ajudam na preservação ambiental?",
        opcoes: ["Substituindo tratores elétricos", "Detectando pragas precocemente e reduzindo defensivos químicos", "Espantando pássaros migratórios"],
        correta: 1
    },
    {
        pergunta: "O que caracteriza a Agricultura de Precisão?",
        opcoes: ["Manejo homogêneo da fazenda", "Aplicação de insumos no local exato e dose certa", "Plantio realizado exclusivamente à mão"],
        correta: 1
    }
];

let indicePerguntaAtual = 0;
let pontuacaoQuiz = 0;
let opcaoSelecionadaIdx = null;

function inicializarQuiz() {
    indicePerguntaAtual = 0;
    pontuacaoQuiz = 0;
    mostrarPergunta();
}

function mostrarPergunta() {
    opcaoSelecionadaIdx = null;
    const questaoContainer = document.getElementById('question-box');
    const btnQuiz = document.getElementById('btn-quiz');
    const resultadoBox = document.getElementById('resultado-quiz');
    
    if (indicePerguntaAtual === 0) {
        resultadoBox.classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');
        btnQuiz.classList.remove('hidden');
    }

    if (indicePerguntaAtual >= dadosQuiz.length) {
        document.getElementById('quiz-container').classList.add('hidden');
        resultadoBox.classList.remove('hidden');
        resultadoBox.innerHTML = `🏆 <strong>Quiz Concluído!</strong><br>Você acertou <strong>${pontuacaoQuiz} de ${dadosQuiz.length}</strong> perguntas.<br><br>
        <button onclick="inicializarQuiz()" class="btn-glossy btn-small" style="margin-top:10px;">Refazer Quiz</button>`;
        return;
    }

    const itemQuiz = dadosQuiz[indicePerguntaAtual];
    let htmlQuiz = `<p class="quiz-question" style="margin-bottom:10px;"><strong>Questão ${indicePerguntaAtual + 1}:</strong> ${itemQuiz.pergunta}</p>`;
    
    itemQuiz.opcoes.forEach((opcao, index) => {
        htmlQuiz += `<div class="quiz-option" data-idx="${index}" onclick="selecionarOpcao(this, ${index})">${opcao}</div>`;
    });

    questaoContainer.innerHTML = htmlQuiz;
    btnQuiz.innerText = "Confirmar Resposta";
}

function selecionarOpcao(elemento, idx) {
    const opcoes = document.querySelectorAll('.quiz-option');
    opcoes.forEach(opt => opt.classList.remove('selected'));
    elemento.classList.add('selected');
    opcaoSelecionadaIdx = idx;
}

function verificarResposta() {
    if (opcaoSelecionadaIdx === null) {
        alert("Por favor, selecione uma das alternativas!");
        return;
    }

    if (opcaoSelecionadaIdx === dadosQuiz[indicePerguntaAtual].correta) {
        pontuacaoQuiz++;
    }

    indicePerguntaAtual++;
    mostrarPergunta();
}

// 4. Newsletter (Simulação visual de sucesso)
function enviarFormulario(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const msgSucesso = document.getElementById('msg-sucesso');

    if(nome && email) {
        msgSucesso.classList.remove('hidden');
        document.getElementById('contact-form').reset();
        
        setTimeout(() => {
            msgSucesso.classList.add('hidden');
        }, 5000);
    }
}
