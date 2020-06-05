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
