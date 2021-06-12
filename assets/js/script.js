let modalInitial = document.querySelector('.start-screen');
let start__button = document.getElementById('start')
let nomePlayer1Winner = '';
let nomePlayer2Winner = '';
let winner = '';

let table = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],

]

start__button.addEventListener('click', function () {
    getName()
    
    modalInitial.classList.add('hidden');
}) // BOTÃO DE INICIAR O JOGO

function getName() {
    let input = document.getElementById('name1').value
    let input2 = document.getElementById('name2').value

    let name1 = '';
    let name2 = '';

    let re = new RegExp('[A-Za-z0-9]')
    let verifyInput1 = re.test(input);
    let verifyInput2 = re.test(input2);

    if ((verifyInput1 === false)) {
        name1 = 'Jogador 1';
    } else {
        name1 = input;
    }

    if ((verifyInput2 === false)) {
        name2 = 'Jogador 2';
    } else {
        name2 = input2;
    }


    if (name1.length > 9) {
        name1 = name1.substring(0, 9) + "..."
    }

    if (name2.length > 9) {
        name2 = name2.substring(0, 9) + "..."
    }
    let player1 = document.getElementById('player__name-1')
    let player2 = document.getElementById('player__name-2')
    player1.innerText = name1
    player2.innerText = name2
 
    nomePlayer1Winner = name1;
    nomePlayer2Winner = name2;
} // FUNÇÃO DE COLETAR NOME NA TELA INICIAL


function gameStart() {
    let mainscreen = document.getElementById('game__table')

    for (let i = 0; i < 7; i++) {
        let coluna = document.createElement('div')
        coluna.classList.add('table__column')
        coluna.id = i
        mainscreen.appendChild(coluna)

        for (let j = 0; j < 6; j++) {
            let celula = document.createElement('div')
            celula.classList.add('table__cell')
            celula.id = i + "." + j
            coluna.appendChild(celula)
        }
    }

} // FUNÇÃO DE CRIAR TABULEIRO DE JOGO

gameStart()
let lastplay = 0
let colunas = document.querySelectorAll(".table__column")
let escolha = true

let audioEfect = document.getElementById('som-efect')
for (let i = 0; i < colunas.length; i++) {
    colunas[i].addEventListener("click", () => {
        const disco = document.createElement("div")

        for (let j = 0; j < 6; j++) {
            let cell = colunas[i].children[j]
            if (cell.childElementCount === 0) {
                if (escolha === true) {
                    disco.classList.add('red')
                    disco.classList.add("fallen__disc")
                    cell.appendChild(disco)
                    audioEfect.play();
                    addArray(cell, 1);
                    let value = winCheckup();

                    if (value === true) {
                        winner = nomePlayer1Winner;
                        return mostraModal(winner)
                    }
                    return escolha = false
                    
                } else {
                    disco.classList.add('black')
                    disco.classList.add("fallen__disc")
                    cell.appendChild(disco)
                    audioEfect.play();
                    addArray(cell, 2);
                    let value = winCheckup();
              ;
                    if (value === true) {
                        winner = nomePlayer2Winner;
                        return mostraModal(winner)
                    }
                    return escolha = true
                    
                }
            }
            
        }
    })
}

function addArray(cell, valueDisc) {

    let column = Number(cell.id.charAt(0));
    let index = Number(cell.id.charAt(2));

    table[column][index] = valueDisc;

}

function clearCode() {
    const cell = document.querySelectorAll('div.table__cell');
    // resetando as celulas de cada coluna
    for (let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }

    // resetando os valores da tabela
    for (let i = 0; i < table.length; i++) {
        let column = table[i];

        for (let j = 0; j < column.length; j++) {
            table[i][j] = 0;
        }
    }
    
}

function winCheckup() {
    let arrY = table[0].length - 3;
    let arrX = table.length - 3;
    
    // checa a vertical
    for (let i = 0; i < table.length; i++) {
        let column = table[i];

        for (let j = 0; j < arrY; j++) {
            let cell = column[j];

            if (cell != 0){

                if ((cell === column[j + 1]) && (cell === column[j + 2]) && (cell === column[j + 3])){
                    return true;
                }
            }
        }
    }

    // checa a horizontal
    for (let i = 0; i < arrX; i++) {
        let column = table[i];

        for (let j = 0; j < table[0].length; j ++) {
            let cell = column[j]

            if (cell != 0) {

                if ((cell === table[i + 1][j]) && (cell === table[i + 2][j]) && (cell === table[i + 3][j])) {
                    return true;
                }
            }
        }
    }

    // checa a diagonal (direita)
    for (let i = 0; i < arrX; i++) {
        
        for (let j = 0; j < arrY; j++) {
            let cell = table[i][j];
        
            if (cell != 0) {
                
                if ((cell === table[i + 1][j + 1]) && (cell === table[i + 2][j + 2]) && (cell === table[i + 3][j + 3])) {
                    return true;
                }
            }
        }

    }

    // checa a diagonal (esquerda)
    for (let i = 3; i < table.length; i++) {
    
        for (let j = 0; j < arrY; j++) {
            let cell = table[i][j];
        
            if (cell != 0) {
                
                if ((cell === table[i - 1][j + 1]) && (cell === table[i - 2][j + 2]) && (cell === table[i - 3][j + 3])) {
                    return true;
                }
            }
        }
    }

    // checa empate
    let totalCelulas = 0;
    let quantColumn = 7;
    let quantCell = 6
    let calCell = quantColumn * quantCell
    for(let i = 0; i < quantColumn; i++) {
        for(let j = 0; j < quantCell; j++) {
            totalCelulas += colunas[i].childNodes[j].childElementCount;
            if(totalCelulas === calCell){ 
                let msgEmpate = 'Empate!'
                mostraModal(msgEmpate)
            }
        }
    }

    return false
} 

function mostraModal(value) {
    
    const modalFinale = document.querySelector('.modal-result');
    const btnReset = document.getElementById('btn-home');
    const msgDeVitoria = document.getElementById('modal-result__title');
    const btnReplace = document.getElementById('btn-replace');
    msgDeVitoria.innerHTML = '';
    
    if (value === 'Empate!') {
        msgDeVitoria.innerText = `${value}`;
    } else {
        msgDeVitoria.innerText = `O ${value} vence o jogo!`
    }

    setTimeout(() => {
        modalFinale.classList.remove('hidden');
    },1000)

    btnReset.addEventListener('click', function () {
        //location.reload();
        clearCode();
        modalFinale.classList.add('hidden');
        modalInitial.classList.remove('hidden');
    })

    btnReplace.addEventListener('click', function () {
        clearCode();
        modalFinale.classList.add('hidden');
    })

}
