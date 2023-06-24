// Inicialização
const jogo = document.getElementById('jogo');
const tamanhoGrade = 20;
const tamanhoCobrinha = 1;
const velocidadeJogo = 150;

let cobrinha = [{ x: 10, y: 10 }];
let fruta = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let pontuacao = 0;

// Função para criar elementos no jogo
function criarElemento(x, y, classe) {
  const elemento = document.createElement('div');
  elemento.style.gridRowStart = y;
  elemento.style.gridColumnStart = x;
  elemento.classList.add(classe);
  return elemento;
}

// Função para atualizar o jogo
function atualizarJogo() {
  const cabecaCobrinha = { x: cobrinha[0].x + dx, y: cobrinha[0].y + dy };
  cobrinha.unshift(cabecaCobrinha);

  if (cabecaCobrinha.x === fruta.x && cabecaCobrinha.y === fruta.y) {
    pontuacao += 10;
    document.getElementById('pontuacao').textContent = pontuacao;
    criarFruta();
  } else {
    cobrinha.pop();
  }

  // Verificar colisões
  if (
    cabecaCobrinha.x < 1 ||
    cabecaCobrinha.x > tamanhoGrade ||
    cabecaCobrinha.y < 1 ||
    cabecaCobrinha.y > tamanhoGrade ||
    colisaoCobrinha(cabecaCobrinha)
  ) {
    clearInterval(intervaloJogo);
    alert('Fim de jogo! Pontuação: ' + pontuacao);
  }

  // Limpar jogo
  jogo.innerHTML = '';

  // Desenhar cobrinha
  cobrinha.forEach(parte => {
    const elemento = criarElemento(parte.x, parte.y, 'snake');
    jogo.appendChild(elemento);
  });

  // Desenhar fruta
  const frutaElemento = criarElemento(fruta.x, fruta.y, 'fruit');
  jogo.appendChild(frutaElemento);
}

// Função para criar fruta em uma posição aleatória
function criarFruta() {
  fruta = {
    x: Math.floor(Math.random() * tamanhoGrade) + 1,
    y: Math.floor(Math.random() * tamanhoGrade) + 1
  };

  if (colisaoCobrinha(fruta)) {
    criarFruta();
  }
}

// Função para verificar se houve colisão da cobrinha com a fruta
function colisaoCobrinha(posicao) {
  return cobrinha.some(parte => parte.x === posicao.x && parte.y === posicao.y);
}

// Função para controlar o movimento da cobrinha
function controlarMovimento(event) {
  const tecla = event.key;
  switch (tecla) {
    case 'ArrowUp':
      if (dy !== 1) {
        dx = 0;
        dy = -1;
      }
      break;
    case 'ArrowDown':
      if (dy !== -1) {
        dx = 0;
        dy = 1;
      }
      break;
    case 'ArrowLeft':
      if (dx !== 1) {
        dx = -1;
        dy = 0;
      }
      break;
    case 'ArrowRight':
      if (dx !== -1) {
        dx = 1;
        dy = 0;
      }
      break;
  }
}

// Adicionar evento para controlar o movimento da cobrinha
document.addEventListener('keydown', controlarMovimento);

// Iniciar o jogo
const intervaloJogo = setInterval(atualizarJogo, velocidadeJogo);
