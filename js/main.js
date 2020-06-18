// ------------------- BURGER MENU ---------------
const menuBtn = document.querySelector('.js-menu-btn')
const closeBtn = document.querySelector('.js-close-btn')
const menuContent = document.querySelector('.js-menu-content')

menuBtn.addEventListener('click', () => {
  menuContent.classList.add('show')
  document.querySelector('body').style.overflow = 'hidden'
  menuBtn.style.display = 'none'
  closeBtn.style.display = 'block'
})
closeBtn.addEventListener('click', () => {
  menuContent.classList.remove('show')
  document.querySelector('body').style.overflow = 'auto'
  menuBtn.style.display = 'block'
  closeBtn.style.display = 'none'
})

// --------------------- EVENTS ---------------
let filterButtons = document.querySelectorAll('.filter__item')
filterButtons.forEach(element => {
  element.addEventListener('click', event => {
    event.target.classList.toggle('active')
    let activeFilterButtons = document.querySelectorAll('.filter__item.active')

    let activePostersClasses = [...activeFilterButtons].map(activeFilterButton => {
      return activeFilterButton.dataset.filter
    })

    let posters = document.querySelectorAll('.poster')
    posters.forEach(poster => {
      poster.style.display = 'none'
    });

    activePostersClasses.forEach(activePostersClass => {
      document.querySelectorAll(`.${activePostersClass}`).forEach(poster => {
        poster.style.display = 'block'
      })
    })
  })
});

// ------------------ AQUAPORT ----------------
let iconBtns = document.querySelectorAll('.icon')
iconBtns.forEach(icon => {
  icon.addEventListener('click', event => {
    document.querySelectorAll('.popup').forEach(popup => {
      popup.style.display = 'none'
    })
    let popup = document.querySelector('.popup.' + event.target.dataset.btn)
    popup.style.display = 'block'
  })
})
let closeBtns = document.querySelectorAll('.popup__head__close')
closeBtns.forEach(closeBtn => {
  closeBtn.addEventListener('click', event => {
    document.querySelectorAll('.popup').forEach(popup => {
      popup.style.display = 'none'
    })
  })
})

// ------------------ ROUTES ---------------
// FORM INPUT WIDTH
document.querySelectorAll('.form__input').forEach(input => {
  autosizeInput(input, {
    minWidth: true
  })
})

// OCEANS MENU
let selectBtns = document.querySelectorAll('.oceans__selector__item__title')
selectBtns.forEach(btn => {
  btn.addEventListener('click', event => {
    document.querySelectorAll('.oceans__selector__item').forEach(elem => {
      elem.classList.remove('show')
    })
    event.target.parentElement.classList.add('show')
  })
})

// BTN FILL INPUT
let goBtns = document.querySelectorAll('.oceans__selector__item__content__description__btn')
goBtns.forEach(goBtn => {
  goBtn.addEventListener('click', event => {
    let oceanName = event.target.dataset.ocean
    let oceanInput = document.querySelector('.form__input__destination')
    oceanInput.value = oceanName

    const inputEvent = new Event('input');
    oceanInput.dispatchEvent(inputEvent);
  })
})

// BTN SUCCESS POPUP
let sendRequestBtn = document.querySelector('.form__btn')
if (sendRequestBtn) {
  sendRequestBtn.addEventListener('click', () => {
    document.querySelector('.form__popup').style.display = 'block'
  })
}

let closePopupBtn = document.querySelector('.form__popup__close')
if (closePopupBtn) {
  closePopupBtn.addEventListener('click', () => {
    document.querySelector('.form__popup').style.display = 'none'
  })
}

// --------------- QUIZ ----------------
let firstStepBtns = document.querySelectorAll('.quiz__fist-step .quiz__item')
firstStepBtns.forEach(firstStepBtn => {
  firstStepBtn.addEventListener('click', () => {
    document.querySelector('.quiz__fist-step').style.display = 'none'
    document.querySelector('.quiz__second-step').style.display = 'block'
  })
})

let secondStepBtns = document.querySelectorAll('.quiz__second-step .quiz__item')
secondStepBtns.forEach(secondStepBtn => {
  secondStepBtn.addEventListener('click', (event) => {
    document.querySelector(event.target.getAttribute("href") + ' .oceans__selector__item__title').click()
  })
})

// ------------- PROMO GAME --------------
let playBtns = document.querySelectorAll('.js-play-btn')
playBtns.forEach(playBtn => {
  playBtn.addEventListener('click', () => {
    document.querySelectorAll('.wrapper__promo__popup').forEach(popup => {
      popup.style.display = 'none'
    })
    items = []
    startGame = true
    speed = 1.5
  })
})

// ------------ STAR POPUP ----------------
let skipBtn = document.querySelector('.star-popup__content__skip')
if (skipBtn) {
  skipBtn.addEventListener('click', () => {
    document.querySelector('.wrapper__star-popup').style.display = 'none'
  })
}