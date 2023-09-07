// Cria uma array vazia
const alunos = [];

// Função para cadastrar o objeto Aluno
function cadastrarAluno() {
  const aluno = {};

  while (true) {
    try {
      let nome = prompt('Digite o nome do aluno:');
      if (!nome.match(/^[a-zA-Z\s]*$/) || nome.length < 1) {
        throw new Error('Campo obrigatorio e o nome do aluno deve conter apenas letras.');
      }
      aluno.NOME = nome;

      break;
    } catch (error) {
      alert(error.message);
    }
  }

  while (true) {
    try {
      let ra = prompt('Digite o RA do aluno:');
      if (isNaN(ra) || ra.length !== 13) {
        throw new Error('Campo obrigatorio, deve conter apenas numeros e possuir 13 digitos.');
      }
      aluno.RA = ra;

      break;
    } catch (error) {
      alert(error.message);
    }
  }

  while (true) {
    try {
      let idade = parseInt(prompt('Digite a idade do aluno:'));
      if (isNaN(idade) || idade < 1 || idade > 100) {
        throw new Error('Campo obrigatorio e a idade informada precisa ser válida.');
      }
      aluno.IDADE = idade;

      break;
    } catch (error) {
      alert(error.message);
    }
  }

  while (true) {
    try {
      let sexo = prompt('Digite o sexo do aluno (M/F):');
      sexo = sexo.toUpperCase()
      if (sexo !== 'M' && sexo !== 'F') {
        throw new Error('Campo obrigatorio e o sexo do aluno deve ser "M" para masculino ou "F" para feminino.');
      }
      aluno.SEXO = sexo;

      break;
    } catch (error) {
      alert(error.message);
    }
  }

  while (true) {
    try {
      let media = parseFloat(prompt('Digite a média do aluno:'));
      if (isNaN(media) || media > 0 || media < 10) {
        throw new Error('Campo obrigatorio e a média informada precisa ser válida.');
      }
      aluno.MEDIA = media;

      break;
    } catch (error) {
      alert(error.message);
    }
  }

  aluno.RESULTADO = aluno.MEDIA >= 6 ? 'Aprovado' : 'Reprovado';

  alunos.push(aluno);
}

// Função para ordenar a array em ordem crescente de nomes
function ordemCrescente() {

  const alunosOrdenados = [...alunos].sort((a, b) => a.NOME.localeCompare(b.NOME));
  mostrarRelatorio(alunosOrdenados);
}

// Função para orderar a array em ordem decrescente de RA
function ordemDecrescenteRA() {

  const alunosOrdenados = [...alunos].sort((a, b) => b.RA.localeCompare(a.RA));
  mostrarRelatorio(alunosOrdenados);
}

// Função para ordenar os alunos aprovados em ordem crescente de nomes
function ordemCrescenteAprovados() {

  const alunosAprovados = alunos.filter((aluno) => aluno.RESULTADO === 'Aprovado');

  const alunosOrdenados = [...alunosAprovados].sort((a, b) => a.NOME.localeCompare(b.NOME));
  mostrarRelatorio(alunosOrdenados);
}

// Função para exibir a array na ordem requisitada
function mostrarRelatorio(alunos) {
  console.clear();
            
  let msg = 'Lista de alunos:\n***************************\n';

  alunos.forEach((aluno, index) => {
      msg += `Aluno ${index + 1}:\n`;
      msg += `Nome: ${aluno.NOME}\n`;
      msg += `RA: ${aluno.RA}\n`;
      msg += `Idade: ${aluno.IDADE}\n`;
      msg += `Sexo: ${aluno.SEXO}\n`;
      msg += `Média: ${aluno.MEDIA}\n`;
      msg += `Resultado: ${aluno.RESULTADO}\n`;
      msg += '----------------\n';
  });

  console.log(msg);

  window.alert(msg);
}

function executar() {

  let op;

  do {
    let msg = 'Entre com uma das opções abaixo: \n'
    msg +='1. Cadastrar Alunos.\n';
    msg +='2. Relatório de Alunos em ordem crescente por Nome.\n';
    msg +='3. Relatório de Alunos em ordem decrescente por RA.\n';
    msg +='4. Relatório de Alunos em ordem crescente por Nome, apenas dos Aprovados.\n';
    msg +='5. Encerre a execução do programa.';
    alert(msg);
    
    op = prompt('OPÇÃO: ');

    switch (op) {
      case '1':
        cadastrarAluno();
        break;
      case '2':
        ordemCrescente();
        break;
      case '3':
        ordemDecrescenteRA();
        break;
      case '4':
        ordemCrescenteAprovados();
        break;
      case '5':
        alert('Encerrando o programa.');
        break;
      default:
        alert('Opção inválida. Tente novamente.');
    }

  } while (op !== '5');
}