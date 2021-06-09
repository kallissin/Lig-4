let start__button = document.getElementById('start')

start__button.addEventListener('click', function () {
    let modal = document.getElementsByClassName('start__screen')
    getName()
    modal[0].style.display = "none"
}) // BOTÃO DE INICIAR O JOGO

function getName() {
    let input = document.getElementById('name')
    let name = input.value
    if (name.length > 8) {
        name = name.substring(0, 8) + "..."
    }
    let player = document.getElementById('jogador')
    let nameText = document.createElement('h1')
    nameText.innerText = name
    player.appendChild(nameText)
} // FUNÇÃO DE COLETAR NOME NA TELA INICIAL


function gameStart() {
    let mainscreen = document.getElementById('table')

    for (let i = 0; i < 7; i++) {
        let coluna = document.createElement('div')
        coluna.classList.add('table__column')
        coluna.id = i
        mainscreen.appendChild(coluna)
    }

    for (let i = 0; i < 7; i++) {
        let colunaAtual = document.getElementById(`${i}`)
        for (let j = 0; j < 6; j++) {
            let celula = document.createElement('div')
            celula.classList.add('table__cell')
            celula.id = i + "." + j
            colunaAtual.appendChild(celula)
        }
    }
} // FUNÇÃO DE CRIAR TABULEIRO DE JOGO

gameStart()
let lastplay = 0
let colunas = document.querySelectorAll("div.table__column")
let escolha = true
for (let i = 0; i < colunas.length; i++) {
    colunas[i].addEventListener("click", function () {
        const disco = document.createElement("div")

        for (let j = 0; j < 6; j++) {
            let cell = colunas[i].children[j]
            if (cell.childElementCount === 0) {
                if (escolha === true) {
                    disco.classList = "red"
                    disco.classList.add("fallen__disc")
                    cell.appendChild(disco)
                    lastplay = cell
                    if (winCheck(lastplay)) {
                        console.log("Vermelho venceu.") // remover console.log
                        // CÓDIGO PRA ATIVAR O MODAL DA TELA DE VENCEDOR (PLAYER 1) ENTRA AQUI
                    }
                    return escolha = false
                    
                } else {
                    disco.classList = "black"
                    disco.classList.add("fallen__disc")
                    cell.appendChild(disco)
                    lastplay = cell
                    if (winCheck(lastplay) === true) {
                        console.log("Preto venceu.") // remover console.log
                        // CÓDIGO PRA ATIVAR O MODAL DA TELA DE VENCEDOR (PLAYER 2) ENTRA AQUI
                    }
                    return escolha = true
                    
                }
            }
        }
    })
}


function winCheckUp(cell) {
    let id = cell.id
    let column = Number(id.charAt(0))
    let place = Number(id.charAt(2))

    let colour = cell.lastChild.classList[0]
    let count = 0

    for (let i = 1; i < 4; i++) { // CHECK VERTICAL
        let next = document.getElementById(`${column}.${place - i}`)

        if (next === null) {
            return false
        } else if (next.lastChild.classList[0] === colour) {
            count += 1
        }
    }

    if (count === 3) {
        return true
    }
    return false
} // FUNÇÃO QUE CHECA EM CIMA
function winCheckSides(cell) {
    let id = cell.id
    let column = Number(id.charAt(0))
    let place = Number(id.charAt(2))

    let colour = cell.lastChild.classList[0]
    let countR = 0
    let countL = 0

    for (let i = 1; i < 4; i++) {
        let next = document.getElementById(`${column + i}.${place}`)

        if (next === null || next.lastChild === null) {
            break
        } else if (next.lastChild.classList[0] === colour) {
            countR += 1
        }
    }

    for (let i = 1; i < 4; i++) {
        let next = document.getElementById(`${column - i}.${place}`)

        if (next === null || next.lastChild === null) {
            break
        } else if (next.lastChild.classList[0] === colour) {
            countL += 1
        }
    }

    if (countR === 3 || countL === 3) { 
        return true
    }

    return false
} // FUNÇÃO QUE CHECA LADOS
function winCheckDiag(cell) {
    let id = cell.id
    let column = Number(id.charAt(0))
    let place = Number(id.charAt(2))

    let colour = cell.lastChild.classList[0]
    let countR = 0
    let countL = 0

    for (let i = 1; i < 4; i++) {
        let next = document.getElementById(`${column - i}.${place - i}`)

        if (next === null || next.lastChild === null) {
            break
        } else if (next.lastChild.classList[0] === colour) {
            countR += 1
        }
    }

    for (let i = 1; i < 4; i++) {
        let next = document.getElementById(`${column + i}.${place - i}`)

        if (next === null || next.lastChild === null) {
            break
        } else if (next.lastChild.classList[0] === colour) {
            countL += 1
        }
    }

    if (countR === 3 || countL === 3) { 
        return true
    }

    return false
} // FUNÇÃO QUE CHECA DIAGONAIS
function winCheck(coord) {
    if (winCheckUp(coord)) {
        return true
    } else if (winCheckSides(coord)) {
        return true
    } else if (winCheckDiag(coord)) {
        return true    
    } else {
        return false
    }
} // FUNÇÃO QUE ENVELOPA TODAS




const modalFinal = document.querySelector('.modal_container');
const botaoReset = document.getElementById('botao_reset');

// condição de vitória completa

modalFinal.classList.add('.ativo');
botaoReset.addEventListener('click', function () {
    location.reload();

})
// Aplicando evento no botão reset