document.addEventListener('DOMContentLoaded', () => {

    const cardArray = [
        {
            name: 'camera',
            img: 'Images/camera.png'
        },
        {
            name: 'folder',
            img: 'Images/folder.png'
        },
        {
            name: 'helmet',
            img: 'Images/helmet.png'
        },
        {
            name: 'movie',
            img: 'Images/movie.png'
        },
        {
            name: 'paint',
            img: 'Images/paint.png'
        },
        {
            name: 'photos',
            img: 'Images/photos.png'
        },
        {
            name: 'camera',
            img: 'Images/camera.png'
        },
        {
            name: 'folder',
            img: 'Images/folder.png'
        },
        {
            name: 'helmet',
            img: 'Images/helmet.png'
        },
        {
            name: 'movie',
            img: 'Images/movie.png'
        },
        {
            name: 'paint',
            img: 'Images/paint.png'
        },
        {
            name: 'photos',
            img: 'Images/photos.png'
        },
    ]

    cardArray.sort(() => 0.5 - Math.random())//Samaisa elementus random secībā

    const container = document.querySelector('.container');
    const resultDisplay = document.querySelector('#result')
    const resetBtn = document.querySelector('.reset-btn')
    const scoreBoard = document.querySelector('#score')
    const timeText = document.querySelector('#time-text')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []
    var turns = 0

    //hronometrs

    var minutes = 00;
    var seconds = 00;
    var tens = 00;//desmitdaļas
    const appendMinutes = document.getElementById('minutes')
    const appendSeconds = document.getElementById('seconds')
    const appendTens = document.getElementById('tens')
    var Interval //Laika intervāls

    container.onclick = function() {
        clearInterval(Interval)
        Interval = setInterval(startTimer, 10)//Katras 10 milisekundes izpildās funkcija startTimer()
    }

    function startTimer() {
        tens++

        if(tens < 9){
            appendTens.innerHTML = '0' + tens

        }

        if(tens > 9){
            appendTens.innerHTML = tens
            
        }

        if(tens > 99){
            console.log('seconds')
            seconds++
            appendSeconds.innerHTML = '0' + seconds
            tens = 0
            appendTens.innerHTML = '0' + 0
        }

        if(seconds > 9){
            appendSeconds.innerHTML = seconds
        }

        if(seconds > 59){
            console.log('minute')
            minutes++
            appendMinutes.innerHTML = '0' + minutes
            seconds = 0
            appendSeconds.innerHTML = '0' + 0
            tens = 0
            appendTens.innerHTML = '0' + 0
        }

        if(minutes > 9){
            appendMinutes.innerHTML = minutes
        }
    }

    //izveidojam spēles galdu

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            resultDisplay.textContent = '0'//Lai spēles sākumā rezultāts rādās kā 0
            var card = document.createElement('img');//Katrai kārtij izveidojam img elementu
            card.setAttribute('src', 'Images/back.jpg');//Piešķiram back.jpg bildi
            card.setAttribute('data-id', i);//Piešķiram id
            card.addEventListener('click', flipCard);
            container.appendChild(card);//Liekam kārtis div elementā ar klasi 'grid'
        }
    }

    //pārbaudam vai ir abas kārtis vienādas

    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].setAttribute('src', 'Images/blank.png')
            cards[optionTwoId].setAttribute('src', 'Images/blank.png')
            cards[optionOneId].classList.add('flipped-card')//Lai nevar uzspiest, kad kārts jau ir atminēta
            cards[optionTwoId].classList.add('flipped-card')//Lai nevar uzspiest, kad kārts jau ir atminēta
            cardsWon.push(cardsChosen)
            container.classList.remove('flipped-card')
        } else {
            cards[optionOneId].setAttribute('src', 'Images/back.jpg')
            cards[optionTwoId].setAttribute('src', 'Images/back.jpg')
            cards[optionOneId].classList.remove('flip')//Ja nav vienādas, tad noņemam klasi flip, lai var apmest atpakaļ
            cards[optionTwoId].classList.remove('flip')
            cards[optionOneId].classList.add('turn-back')//Ja nav vienādas, tad pievienojam klasi turn-back lai apmet atpakaļ
            cards[optionTwoId].classList.add('turn-back')
            container.classList.remove('flipped-card')//Noņem flipped-card klasi container, lai var atlasīt citas 2 kārtis
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = turns //cardsWon.length //Parāda rezultātu, kas vienāds ar atminēto kāršu pāru skaitu
        if (cardsWon.length === 6) {
            clearInterval(Interval)//Izdzēšam laika intervālu, lai laiks apstātos
            scoreBoard.textContent = 'Apsveicam! Spēli pabeidzi ar ' + turns + ' gājieniem!'
            resultDisplay.textContent = ''
            timeText.textContent = 'Tavs laiks'
            container.remove()//Noņemam spēles laukumu
            var resetButton = document.createElement('button')//Izveido pogu, ar kuru varēs restartēt spēli
            resetBtn.appendChild(resetButton)//Pievienojam to div elementam
            resetButton.innerHTML = "Restartēt Spēli"
            resetButton.addEventListener('click', refreshPage)//Kad uzspiež pogu tad izpildās funkcija refreshPage, kas pārstartēs spēli
            resetButton.classList.add('btn', 'btn-primary')
        } 
    }

    //apmetam kārti otrādi

    var flippedCards = []

    function flipCard() {
        this.classList.remove('turn-back')//Noņemam turn-back klasi, lai bilde nav apgriezta otrādi
        this.classList.add("flip")//Pievinojam flip klasi, kas apmet kārti otrādi
        flippedCards.push(this) //Masīvam flippedCards pievieno tikko apmesto kārti
        console.log(flippedCards)//Lai pārbaudītu vai masīvā nav vairāk par diviem elementiem
        this.classList.add('flipped-card')//Tikko apmestajai kārtij pievieno klasi flipped-card, kas izslēdz opciju divreiz apmest vienu un to pašu kārti pēc kārtas
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            turns ++
            allowClick()//Izpilda allowClick funkciju, kas abām kārtīm noņem klasi, lai pēc tam, ja nav vienādas tās var pēc tam vēlreiz apmest otrādi
            flippedCards = []//Iztīra masīvu flippedCards, jo tās kuras tur ir iekšā, tām flipped-card klasi jau noņēma ar allowClick() funkciju
            container.classList.add('flipped-card')//Lai nevar apmest otrādi citas kārtis, kamēr pārbauda vai ir vienādas. Lai var tikai 2 kārtis atlasīt
            setTimeout(checkForMatch, 500)//Pēc pus sekundes (500 milisekundes) izpildās funkcija checkforMatch
        }
    }

    //funkcija kas noņem flipped-card klasi flippedCards masīva elementiem

    function allowClick() {
        if (flippedCards.length > 0) {
            for (var i = 0; i < flippedCards.length; i++) {
                flippedCards[i].classList.remove('flipped-card')
            }
        }
    }

    //funkcija kas pārlādē lapu

    function refreshPage() {
        window.location.reload()
    }

    createBoard();//Izsaucam createBoard() funkciju

})