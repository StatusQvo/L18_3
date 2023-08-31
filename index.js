const URL = 'https://jsonplaceholder.typicode.com/photos'

function toggleLoader() {
  const loaderHTML = document.querySelector('#loader')
  const isHidden = loaderHTML.getAttribute('hidden') !== null
  if (isHidden) {
    loaderHTML.removeAttribute('hidden')
  } else {
    loaderHTML.setAttribute('hidden', '')
  }
}

const createElements = (title, imgURL) => {
  const $listIMG = document.createElement('li')
  $listIMG.className = 'photo-item'
  const $IMG = document.createElement('img')
  $IMG.className = 'photo-item__image'
  $IMG.src = imgURL
  const $header3 = document.createElement('h3')
  $header3.className = 'photo-item__title'
  $header3.textContent = title

  $IMG.append($header3)
  $listIMG.append($IMG)

  return $listIMG
}

const getFastestLoadedPhoto = (ids) => {
  const $container = document.querySelector('#data-container')
  Array.prototype.slice.call(ids).forEach((id) => {
    Promise.race(ids.map((id) => fetch(URL + '/' + id)))
      .then((response) => {
        if (!response.ok) throw new Error('Ошибка данных')
        return response.json()
      })
      .then((user) => {
        toggleLoader()
        const $list = createElements(user.title, user.url)
        $container.append($list)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        toggleLoader()
      })
  })
}

getFastestLoadedPhoto([60, 12, 55])
