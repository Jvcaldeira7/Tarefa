const readline = require('readline-sync');

const TOTAL_ASSENTOS = 24;
const mapaAssentos = {};
let assentosOcupados = 0;

function exibirMenu() {
  console.log("_________________________________________");
  console.log('        ----------MENU----------         |');
  console.log('1 - Comprar Passagem                     |');
  console.log('2 - Consultar Voos                       |');
  console.log('3 - Exibir Mapa de Assentos              |');
  console.log('4 - Emitir Ticket                        |');
  console.log('0 - Encerrar Programa                    |');
  console.log("_________________________________________");
}

function comprarPassagem() {
  console.log('---------- Comprar Passagem ----------');

  const nome = readline.question('Nome: ');
  const sobrenome = readline.question('Sobrenome: ');
  const idade = parseInt(readline.question('Idade: '));
  const assento = readline.question('Assento ').toUpperCase();
  const origem = readline.question('Origem: ').toUpperCase();
  const destino = readline.question('Destino: ').toUpperCase();
  console.log("_________________________________________");

  if (!mapaAssentos[assento] && assento.match(/^[AB][1-9]|1[0-2]$/)) {
    mapaAssentos[assento] = { nome, sobrenome, idade, origem, destino };
    assentosOcupados++;

    let valor;
    if (idade < 18) {
      valor = 50;
    } else if (idade >= 60) {
      valor = 100;
    } else {
      valor = 75;
    }

    console.log(' ----------Resumo da Compra----------');
    console.log(`Nome: ${nome} ${sobrenome}`);
    console.log(`Idade: ${idade}`);
    console.log(`Assento: ${assento}`);
    console.log(`Origem: ${origem}`);
    console.log(`Destino: ${destino}`);
    console.log(`Valor: R$ ${valor.toFixed(2)}`);
    
  } else {
    console.log('----------Assento ocupado!----------');
    console.log("_________________________________________");
  }
}

function consultarVoos() {
  console.log('\n** Consultar Voos **');
  console.log('Voos disponíveis:');
  console.log('1 - Presidente Prudente -> Madrid');
  console.log('2 - Presidente Prudente -> Laos');
  console.log('3 - Presidente Prudente -> Manchester');
  console.log('4 - Presidente Prudente -> Barcelona');
}

function exibirMapaAssentos() {
  console.log('----------Mapa de Assentos----------');

  for (let i = 1; i <= 12; i++) {
    let linhaA = `A${i}: ${mapaAssentos['A' + i] ? 'X' : '-'}`;
    let linhaB = `B${i}: ${mapaAssentos['B' + i] ? 'X' : '-'}`;
    console.log(`${linhaA}\t\t${linhaB}`);
  }

  console.log(`\nAssentos Disponíveis: ${TOTAL_ASSENTOS - assentosOcupados}`);
  console.log(`Assentos Ocupados: ${assentosOcupados}`);
}

function emitirTicket() {
  console.log('----------Emitir Ticket----------');

  if (assentosOcupados === 0) {
    console.log('Nenhuma passagem vendida!');
    return;
  }

  const assento = readline.question('Assento ').toUpperCase();

  if (!mapaAssentos[assento]) {
    console.log('Assento invalido ou nao vendido!');
    return;
  }

  const { nome, sobrenome, idade, origem, destino } = mapaAssentos[assento];
  let valor;
  if (idade < 18) {
    valor = 50;
  } else if (idade >= 60) {
    valor = 100;
  } else {
    valor = 75;
  }

  console.log('===============================');
  console.log('      Companhia Aérea Nileo      ');
  console.log('===============================');
  console.log(`Nome: ${nome} ${sobrenome}`);
  console.log(`Idade: ${idade}`);
  console.log(`Assento: ${assento}`);
  console.log(`Origem: ${origem}`);
  console.log(`Destino: ${destino}`);
  console.log(`Valor: R$ ${valor.toFixed(2)}`);
  console.log('===============================');
}

let opcao;
do {
  exibirMenu();
  opcao = parseInt(readline.question('Opçao: '));
  switch (opcao) {
    case 1:
      comprarPassagem();
      break;
    case 2:
      consultarVoos();
      break;
    case 3:
      exibirMapaAssentos();
      break;
    case 4:
      emitirTicket();
      break;
    case 0:
      console.log('Programa encerrado (THE END!)');
      break;
    default:
      console.log('----------Opcao invalida!----------');
  }
} while (opcao !== 0);