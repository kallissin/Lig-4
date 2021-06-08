let start__button = document.getElementById('start')

// BOTÃO DE INICIAR O JOGO
start__button.addEventListener('click', function () {
    let modal = document.getElementsByClassName('start__screen')
    gameStart()
    modal[0].style.display = "none"
})

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
}

function gameStart() {
    let mainscreen = document.getElementById('table')
    getName()

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

    // Pegar as colunas e dar eventos respectivos 
    const colunas = document.querySelectorAll("div.table__column")
    let escolha = true
    for (let i = 0; i < colunas.length; i++) {
        colunas[i].addEventListener("click", function () {
            const disco = document.createElement("div")

            for (let j = 0; j < 6; j++) {
                let cell = colunas[i].children[j]
                if (cell.childElementCount == 0) {
                    console.log(escolha)
                if ( escolha === true ){
                    disco.classList = "red"
                    cell.appendChild(disco)
                    escolha = false
                    break
                }else{
                    disco.classList = "black"
                    cell.appendChild(disco)
                    escolha = true
                    break
                }
            } 
        }
 
            
        })
    }
}