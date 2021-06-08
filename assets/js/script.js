let start__button = document.getElementById('start')

// BOTÃO DE INICIAR O JOGO
start__button.addEventListener('click', function () {
    let modal = document.getElementsByClassName('start__screen')
    getName()
    modal[0].style.display = "none"
})

// FUNÇÃO DE COLETAR NOME NA TELA INICIAL
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
    return name
}

// FUNÇÃO DE CRIAR TABULEIRO DE JOGO
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
}

gameStart()

// Pegar as colunas e dar eventos respectivos
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
                    cell.appendChild(disco)
                    lastplay = cell
                    if (winCheckVertical(lastplay) === true) { console.log(getName() + ' venceu') }
                    if (winCheckRight(lastplay) === true) { console.log(getName() + ' venceu') }
                    if (winCheckLeft(lastplay) === true) { console.log(getName() + ' venceu') }
                    escolha = false
                    break
                } else {
                    disco.classList = "black"
                    cell.appendChild(disco)
                    lastplay = cell
                    if (winCheckVertical(lastplay) === true) { console.log('Preto venceu') }
                    if (winCheckRight(lastplay) === true) { console.log('Preto venceu') }
                    if (winCheckLeft(lastplay) === true) { console.log('Preto venceu') }
                    escolha = true
                    break
                }
            }
        }
    })
}

function winCheckVertical(cell) {
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
}

function winCheckRight(cell) {
    let id = cell.id
    let column = Number(id.charAt(0))
    let place = Number(id.charAt(2))

    let colour = cell.lastChild.classList[0]
    let countRight = 0
    let countLeft = 0

    for (let i = 1; i < 4; i++) { // CHECK VERTICAL
        let next = document.getElementById(`${column + i}.${place}`)

        if (next === null || next.lastChild === null) {
            return false
        } else if (next.lastChild.classList[0] === colour) {
            countRight += 1
        }
    }

    if (countRight === 3) {
        return true
    }
    return false
}

function winCheckLeft(cell) {
    let id = cell.id
    let column = Number(id.charAt(0))
    let place = Number(id.charAt(2))

    let colour = cell.lastChild.classList[0]
    let countRight = 0
    let countLeft = 0

    for (let i = 1; i < 4; i++) { // CHECK VERTICAL
        let next = document.getElementById(`${column - i}.${place}`)

        if (next === null || next.lastChild === null) {
            return false
        } else if (next.lastChild.classList[0] === colour) {
            countRight += 1
        }
    }

    if (countRight === 3) {
        return true
    }
    return false
}