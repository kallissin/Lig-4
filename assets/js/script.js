let start__button = document.getElementById('start')

// BOTÃO DE INICIAR O JOGO
start__button.addEventListener('click', function () {
    let modal = document.getElementsByClassName('start__screen')
    gameStart()
    modal[0].style.display = "none"
})


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
        for (let j = 0; j < 5; j++) {
            let celula = document.createElement('div')
            celula.classList.add('table__cell')
            celula.id = i + "." + j
            colunaAtual.appendChild(celula)
        }
    }
}