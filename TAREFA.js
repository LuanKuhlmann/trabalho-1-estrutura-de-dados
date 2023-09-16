const alunos = [];

function subimite(e) {
  e.preventDefault();
  const aluno = {};

  const nomeInput = document.getElementById('nome');
  const raInput = document.getElementById('ra');
  const idadeInput = document.getElementById('idade');
  let sexoInput = null;
  const mediaInput = document.getElementById('media');

  // loop para confirmar a seleção no radio
  const radioButtons = document.querySelectorAll('input[name="gender"]');
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      sexoInput = document.querySelector(`label[for="${radioButton.id}"]`).getAttribute('for');
      break;
    }
  }

  // validar e armazenar
  try {
    const nome = nomeInput.value.trim();
    if (!nome.match(/^[a-zA-Z\s]*$/) || nome.length < 1) {
      throw new Error('Nome do aluno deve conter apenas letras.');
    }
    aluno.NOME = nome;

    const ra = raInput.value.trim();
    if (isNaN(ra) || ra.length !== 13) {
      throw new Error('RA deve conter apenas números e possuir 13 dígitos.');
    }
    aluno.RA = ra;

    const idade = parseInt(idadeInput.value, 10);
    if (isNaN(idade) || idade < 1 || idade > 100) {
      throw new Error('Idade informada precisa ser válida.');
    }
    aluno.IDADE = idade;

    if (sexoInput !== 'M' && sexoInput !== 'F' && sexoInput !== 'O') {
      throw new Error('Gênero do aluno deve ser "M" para masculino, "F" para feminino ou "O" para outros.');
    }
    aluno.SEXO = sexoInput;

    const media = parseFloat(mediaInput.value);
    if (isNaN(media) || media < 0 || media > 10) {
      throw new Error('Média informada precisa ser válida e estar entre 0 e 10.');
    }
    aluno.MEDIA = media;

    aluno.RESULTADO = aluno.MEDIA >= 6 ? 'Aprovado' : 'Reprovado';

    // adicionar aluno e limpar o formulario
    alunos.push(aluno);
    
    show(alunos);

    nomeInput.value = '';
    raInput.value = '';
    idadeInput.value = '';
    // limpar a seleção de genero
    for (const radioButton of radioButtons) {
      radioButton.checked = false;
    }
    mediaInput.value = '';

    alert('Aluno cadastrado com sucesso!');
  } catch (error) {
    alert(error.message);
  }
}


// Ordena os alunos em ordem crescente
function ordemCrescente() {
  try {
    if (alunos.length === 0) {
      throw new Error('A lista está vazia.');
    }

    const alunosTemp = [...alunos];
    const n = alunosTemp.length;

    // Variavel para gerenciar o loop
    let swap;

    // Aplicando o sort
    do {
      swap = false;
      for (let i = 0; i < n - 1; i++) {

        // Checando os nomes e ordenando corretamente
        if (alunosTemp[i].NOME > alunosTemp[i + 1].NOME) {
          const temp = alunosTemp[i];
          alunosTemp[i] = alunosTemp[i + 1];
          alunosTemp[i + 1] = temp;
          swap = true;
        }
      }
    } while (swap);

    show(alunosTemp);

  } catch (error) {
    alert(error.message);
  }
}

// Função para orderar os alunos em ordem decrescente o RA
function ordemDecrescenteRA() {
  try {
    if (alunos.length === 0) {
      throw new Error('A lista está vazia.');
    };

    const alunosTemp = [...alunos];
    const n = alunos.length;

    // Variavel para gerenciar o loop
    let swap;

    // Aplicando o sort
    do {
      swap = false;
      for (let i = 0; i < n - 1; i++) {

        // Checando os RA e ordenando corretamente
        if (alunosTemp[i].RA < alunosTemp[i + 1].RA) {
          const temp = alunosTemp[i];
          alunosTemp[i] = alunosTemp[i + 1];
          alunosTemp[i + 1] = temp;
          swap = true;
        }
      }
    } while (swap);

    show(alunosTemp);

  } catch (error) {
    alert(error.message);
  }
}

// Função para ordenar os alunos aprovados em ordem crescente de nomes
function ordemCrescenteAprovados() {
  try {
    if (alunos.length === 0) {
      throw new Error('A lista está vazia.');
    }

    // Constroi uma array apenas com os alunos aprovados
    const alunosAprovados = alunos.filter((aluno) => aluno.RESULTADO === 'Aprovado');
    if (alunosAprovados.length === 0) {
      throw new Error('Nenhum aluno aprovado na lista.');
    }

    // Variavel para gerenciar o loop
    let swap;

    // Aplicando o sort
    do {
      swap = false;
      for (let i = 0; i < alunosAprovados.length - 1; i++) {

        // Checando os nomes e ordenando corretamente
        if (alunosAprovados[i].NOME > alunosAprovados[i + 1].NOME) {
          const temp = alunosAprovados[i];
          alunosAprovados[i] = alunosAprovados[i + 1];
          alunosAprovados[i + 1] = temp;
          swap = true;
        }
      }
    } while (swap);

    show(alunosAprovados);

  } catch (error) {
    alert(error.message);
  }
}

// Função para mostrar os dados no formulario
function show(array) {
  const tbody = document.getElementById('listBody');
    if (tbody) {
    tbody.innerHTML = array.map(user => {
      return `<tr>
                <td>${user.NOME}</td>
                <td>${user.RA}</td>
                <td>${user.IDADE}</td>
                <td>${user.SEXO}</td>
                <td>${user.MEDIA}</td>
                <td>${user.RESULTADO}</td>
              </tr>`;
    }).join('');
  }
}

window.addEventListener('load', () => {
  document.getElementById('form').addEventListener('submit', subimite);
});