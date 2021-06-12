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
    let modal = document.getElementsByClassName('start-screen')
    getName()
    modal[0].style.display = "none"
}) // BOTÃO DE INICIAR O JOGO

function getName() {
    let input = document.getElementById('name1')
    let input2 = document.getElementById('name2')
    let name1 = '';
    let name2 = '';

    let re = new RegExp('[A-Za-z0-9]')
    let verifyInput1 = re.test(input.value);
    let verifyInput2 = re.test(input2.value);

    if ((verifyInput1 === false)) {
        name1 = 'Jogador 1' ;  
    } else {
        name1 = input.value;
    }

    if ((verifyInput2 === false)) {
        name2 = 'Jogador 2';
    } else {
        name2 = input2.value;
    }


    if (name1.length > 9) {
        name1 = name1.substring(0, 9) + "..."
    }

    if (name2.length > 9) {
        name2 = name2.substring(0, 9) + "..."
    }
    let player1 = document.getElementById('player1')
    let player2 = document.getElementById('player2')
    let nameText1 = document.createElement('h1')
    let nameText2 = document.createElement('h1')
    nameText1.classList.add('player__title');
    nameText2.classList.add('player__title');
    nameText1.innerText = name1
    nameText2.innerText = name2
    player1.appendChild(nameText1)
    player2.appendChild(nameText2)

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
    console.log(table);

}

function clearCode() {
    const cell = document.querySelectorAll('div.table__cell');

    for (let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }
    
}

function winCheckup() {
    // checa a vertical
    let arrY = table[0].length - 3;
    let arrX = table.length - 3;
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

    return false
} // FUNÇÃO QUE CHECA EM CIMA
//function winCheckSides(cell) {
//    let id = cell.id
//    let column = Number(id.charAt(0))
//    let place = Number(id.charAt(2))

//    let colour = cell.lastChild.classList[0]
//    let countR = 0
//    let countL = 0

//    for (let i = 1; i < 4; i++) {
//        let next = document.getElementById(`${column + i}.${place}`)

//        if (next === null || next.lastChild === null) {
//            break
//        } else if (next.lastChild.classList[0] === colour) {
//            countR += 1
//        }
//    }

//    for (let i = 1; i < 4; i++) {
//        let next = document.getElementById(`${column - i}.${place}`)

//        if (next === null || next.lastChild === null) {
//            break
//        } else if (next.lastChild.classList[0] === colour) {
//            countL += 1
//        }
//    }

//    if (countR === 3 || countL === 3 || countR + countL === 3) { 
//        return true
//    }

//    return false
//} // FUNÇÃO QUE CHECA LADOS



//function winCheckDiag(cell) {
//    let id = cell.id
//    let column = Number(id.charAt(0))
//    let place = Number(id.charAt(2))

//    let colour = cell.lastChild.classList[0]
//    let countR = 0
//    let countRUp = 0
//    let countL = 0
//    let countLUp = 0

//    for (let i = 1; i < 4; i++) { // CIMA PRA BAIXO ESQUERDA
//        let next = document.getElementById(`${column - i}.${place - i}`)

//        if (next === null || next.lastChild === null) {
//            break
//        } else if (next.lastChild.classList[0] === colour) {
//            countL += 1
//        }
//    }

//    for (let i = 1; i < 4; i++) { // BAIXO PRA CIMA DIREITA
//        let next = document.getElementById(`${column + i}.${place + i}`)

//        if (next === null || next.lastChild === null) {
//            break
//        } else if (next.lastChild.classList[0] === colour) {
//            countRUp += 1
//        }
//    }

//    for (let i = 1; i < 4; i++) { // BAIXO PRA CIMA ESQUERDA
//        let next = document.getElementById(`${column - i}.${place + i}`)

//        if (next === null || next.lastChild === null) {
//            break
//        } else if (next.lastChild.classList[0] === colour) {
//            countLUp += 1
//        }
//    }

//    for (let i = 1; i < 4; i++) { // CIMA PRA BAIXO DIREITA
//        let next = document.getElementById(`${column + i}.${place - i}`)

//        if (next === null || next.lastChild === null) {
//            break
//        } else if (next.lastChild.classList[0] === colour) {
//            countR += 1
//        }
//    }

//    let countTotal = countR + countL + countLUp + countRUp

//    if (countR === 3 || countL === 3 || countRUp === 3 || countLUp === 3 || countTotal === 3) { 
//        return true
//    }

//    return false
//} // FUNÇÃO QUE CHECA DIAGONAIS


//function draw() {
//    let totalCelulas = 0;
//    let quantColumn = 7;
//    let quantCell = 6
//    let calCell = quantColumn * quantCell
//    for(let i = 0; i < quantColumn; i++) {
//        for(let j = 0; j < quantCell; j++) {
//            totalCelulas += colunas[i].childNodes[j].childElementCount;
//            if(totalCelulas === calCell){ 
//                let msgEmpate = 'Empate!'
//                mostraModal(msgEmpate)
//            }
//        }
//    }
//} // FUNÇÃO QUE CHECA EMPATE


function winCheck() {
    console.log('winCheck')
    if (winCheckUp() === true) {
        return true
    }
    //} else if (winCheckSides(table)) {
    //    return true
    //} else if (winCheckDiag(table)) {
    //    return true    
    //} else{
    //    draw();
    //    return false
    //}

} // FUNÇÃO QUE ENVELOPA TODAS

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
        location.reload();
    })

    btnReplace.addEventListener('click', function () {
        clearCode();
        modalFinale.classList.add('hidden');
    })

}
