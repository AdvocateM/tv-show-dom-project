// const getAllEpisodes

function error() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function setup() {
  fetch("https://api.tvmaze.com/shows/527/episodes")
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        // console.log(response);
        return response.json();
      }
    })
    .then((jsonResponse) => {
      // do whatever you want with the JSON response
      allEpisodes = jsonResponse;
      makePageForEpisodes(allEpisodes);
      // console.log(allEpisodes);
    })
    .catch((err) => {
      // Handle the error
      console.log(err);
    });
};





function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");


  // Make container
  const firsDiv = document.createElement('div');
  firsDiv.classList.add('container')

  // Count Results
  let Display = document.getElementById("results");


  // Make Movie Card
  const row = document.createElement('div');
  row.classList.add('movie-card')

  // get html Element to show on the screen
  const showMovies = document.querySelector('.movies-grid')


  episodeList.forEach((episode) => {

    // Movie Title
    const movies = `${episode.name} - S0${episode.season}E0${episode.number}`;
    // console.log(movies);

    // Movie Image
    const image = episode.image.medium;
    // console.log(image);


    // Movie Summary
    const summary = episode.summary.replace(/(<([^>]+)>)/gi, "");
    // console.log(summary);

    // Year of release
    const premiered = episode.airdate;
    // console.log(premiered)


    // Movie Rate
    const rate = episode.rating.average;
    // console.log(rate)



    const template = `
    <div class="movie-card" id="movies-card" onclick="Banner(${image}, ${premiered}, ${movies}, ${summary})">

            <div class="card-head">
              <img src="${image}" alt="" class="card-img">

              <div class="card-overlay">

                <div class="bookmark">
                  <ion-icon name="bookmark-outline"><span></span></ion-icon>

                </div>

                <div class="rating">
                  <ion-icon name="star-outline"></ion-icon>
                  <span>${rate}</span>
                </div>

                <div class="play">
                  <a href="https://mrmaroga.com" class="navbar-brand" target="_blank">
                  <ion-icon name="play-circle-outline"></ion-icon>
                  </a>
                  <p class="summary test">${summary}</p>
                </div>

              </div>
            </div>

            <div class="card-body">
              <h3 class="card-title">${movies}</h3>

              <div class="card-info">
                <span class="genre">Action/Comedy</span>
                <!--<span class="year">${premiered}</span>-->
              </div>
            </div>

          </div>`;
    showMovies.innerHTML += template;
  });
  const btn = `<button class="load-more">LOAD MORE</button>`
  showMovies.innerHTML += btn


  // show on the Screen
  // rootElem.appendChild(firsDiv) // first Div
  showMovies.appendChild(row)

  /*
    The End Of the Home Section
    */



  /**
   * the Start of Select Options
   * Select any Episodes you Would like to watch "All Episodes"
   * Make option automatically
  */

  for (let i = 0; i < episodeList.length; i++) {
    let movies = `S0${episodeList[i].season}E0${episodeList[i].number} - ${episodeList[i].name}`;
    const option = document.createElement('option');
    const optionText = document.createTextNode(movies);

    // set class
    option.classList.add('movies')
    // set option text
    option.appendChild(optionText);
    // and option value
    option.setAttribute('value', `${episodeList[i].name}`);

    document.getElementById('SelectEpisode').add(option);
    // select.append(option);
    // console.log(option)
  };
  /**
   * We have Added the select list to the UI
   */




  /**
   * The Start Of Select Options
   * Select Any Movies By It's year Of Realize  "All years"
   */
  for (let i = 0; i < episodeList.length; i++) {
    let years = episodeList[i].airdate;
    const option = document.createElement('option');
    const optionText = document.createTextNode(years);

    // set class
    option.classList.add('movies')
    // set option text
    option.appendChild(optionText);
    // and option value
    option.setAttribute('value', episodeList[i].name);

    document.querySelector('.year').add(option);
    // select.append(option);
    console.log(option)
  };
  /**
   * We have Added the year list to the UI
   */



  let episode = episodeList

  // show All the Episodes On the Screen
  // function Shows(episode) {
  // List 4 search

  let searchName = [];
  let searchSummery = [];
  let card = document.querySelectorAll('.movie-card');
  let displayCount = document.getElementById('results');
  displayCount.textContent = `Displaying ${episode.length}/${episode.length}`


  for (let i = 0; i < episode.length; i++) {
    let movies = `${episode[i].name} - S0${episode[i].season}E0${episode[i].number}`;

    // Add in the array
    searchName.push(episode[i].name);
    searchSummery.push(episode[i].summary)

    console.log(`${episode[i].name} - S0${episode[i].season}E0${episode[i].number}`);

    const image = episode[i].image['medium'];
    // console.log(image);
    // remove the <p></p> tags inside the text using regex from summary

    const summery = episode[i].summary.replace(/(<([^>]+)>)/gi, "");
    // console.log(summery);
    // console.log(countWords(summery))

    const rate = episode[i].rating.average;
    console.log(rate)

    const premiered = episode[i].premiered;

    // Level 400
    // const rate = episode[i].rate

    const template = `
    <div class="movie-card" id="movie-card">

            <div class="card-head">
              <img src="${image}" alt="" class="card-img">

              <div class="card-overlay">

                <div class="bookmark">
                  <ion-icon name="bookmark-outline"><span></span></ion-icon>
                
                </div>

                <div class="rating">
                  <ion-icon name="star-outline"></ion-icon>
                  <span>${rate}</span>
                </div>

                <div class="play">
                  <a href="https://mrmaroga.com" class="navbar-brand" target="_blank">
                  <ion-icon name="play-circle-outline"></ion-icon>
                  </a>
                </div>

              </div>
            </div>

            <div class="card-body">
              <h3 class="card-title">${movies}</h3>

              <div class="card-info">
                <span class="genre">Action/Comedy</span>
                <span class="year">${premiered}</span>
              </div>
            </div>

          </div>`;
    // showMovies.innerHTML += template;
  }
  // const btn = `<button class="load-more">LOAD MORE</button>`
  // showMovies.innerHTML += btn
  // rootElem.appendChild(row) //Display in HTML


  document.getElementById('search-input').addEventListener('keyup', function (e) {

    // // Locate the card elements
    let title = document.querySelectorAll('.card-title'),
      images = document.querySelectorAll('.card-img'),
      card = document.querySelectorAll('.movie-card'),
      rate = document.querySelectorAll(".rating"),
      summery = document.querySelectorAll('.summery'),
      hide = document.querySelectorAll('.count');


    // // Locate the search input
    let search_query = document.getElementById("search-input").value;



    // Loop through the title
    for (var i = 0; i < title.length; i++) {
      // If the text is within the movie-card

      let checkTitle = title[i].innerText.toLowerCase().includes(search_query.toLowerCase());
      // let checkSummery = summery[i].innerText.toLowerCase().includes(search_query.toLowerCase());
      // console.log(checkSummery)


      console.log(typeof (checkTitle));
      if (checkTitle) {
        // ...remove the `.is-hidden` class.
        // title[i].classList.remove("is-hidden");
        // images[i].classList.remove("is-hidden");
        card[i].classList.remove("is-hidden");
        card[i].classList.add('count')
        // rate[i].classList.remove("is-hidden");


      } else {
        card[i].classList.add("is-hidden")
        // Otherwise, add the class.
        // title[i].classList.add("is-hidden");
        // images[i].classList.add("is-hidden");
        // card[i].classList.add("is-hidden");
        // rate[i].classList.add('is-hidden')
      }
    };
    //   countResults = episode.length;
    displayCount = document.getElementById('results');
    displayCount.textContent = `Displaying ${hide.length}/ ${episode.length} `


    console.log(e)

    e.preventDefault();
    // show on the Screen
  });
  // rootElem.appendChild(container) // first Div





  document.getElementById('SelectEpisode').addEventListener('change', (e) => {
    let title = document.querySelectorAll('.card-title'),
      images = document.querySelectorAll('.images'),
      summery = document.querySelectorAll('.summery'),
      row = document.querySelectorAll('.card-overlay'),
      rating = document.querySelectorAll(".is-hidden")

    console.log(e.target.value)
    for (var i = 0; i < title.length; i++) {
      // If the text is within the card...

      if (title[i].innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
        // ...remove the `.is-hidden` class.
        card[i].classList.remove("is-hidden");
        card[i].classList.add('count')
      } else {
        card[i].classList.add("is-hidden")
        // Otherwise, add the class.
      }

      if (e.target.value === 'all genres') {
        location.reload();
      }
    }
    e.preventDefault();
  });







  /**
   * Show Categories
   * starts here
   */
  const category = `
            <div class="category-card">
            <img src="${episodeList[4].image.medium}" alt="" class="card-img" id="movie1">
            <div class="name">Action</div>
            <div class="total">100</div>
          </div>

          <div class="category-card">
            <img src="${episodeList[8].image.medium}" alt="" class="card-img">
            <div class="name">Comedy</div>
            <div class="total">50</div>
          </div>

          <div class="category-card">
            <img src="${episodeList[60].image.medium}" alt="" class="card-img">
            <div class="name">Thriller</div>
            <div class="total">20</div>
          </div>

          <div class="category-card">
            <img src="${episodeList[40].image.medium}" alt="" class="card-img">
            <div class="name">Horror</div>
            <div class="total">80</div>
          </div>

          <div class="category-card">
            <img src="${episodeList[34].image.medium}" alt="" class="card-img">
            <div class="name">Adventure</div>
            <div class="total">100</div>
          </div>

          <div class="category-card">
            <img src="${episodeList[14].image.medium}" alt="" class="card-img">
            <div class="name">Animated</div>
            <div class="total">50</div>
          </div>

          <div class="category-card">
            <img src="${episodeList[70].image.medium}" alt="" class="card-img">
            <div class="name">Crime</div>
            <div class="total">20</div>
          </div>

          <div class="category-card">
            <img src="${episodeList[12].image.medium}" alt="" class="card-img">
            <div class="name">SCI-FI</div>
            <div class="total">80</div>
          </div>
`
  document.querySelector('.category-grid').innerHTML = category
  /* * Show Categories
     * Ends here
     * /

  * Show Categories
  * starts here
  */
  const live = `
<div class="live-card">

            <div class="card-head">
              <img src="${episodeList[24].image.medium}" alt="" class="card-img">
              <div class="live-badge">LIVE</div>
              <div class="total-viewers">305K viewers</div>
              <div class="play">
                <ion-icon name="play-circle-outline"></ion-icon>
              </div>
            </div>

            <div class="card-body">
              <img src="./assets/images/bbcamerica.jpg" alt="" class="avatar">
              <h3 class="card-title">Planet Earth II <br> Season 1 - Islands</h3>
            </div>

          </div>

          <div class="live-card">

            <div class="card-head">
              <img src="${episodeList[20].image.medium}" alt="" class="card-img">
              <div class="live-badge">LIVE</div>
              <div class="total-viewers">1.7M viewers</div>
              <div class="play">
                <ion-icon name="play-circle-outline"></ion-icon>
              </div>
            </div>

            <div class="card-body">
              <img src="./assets/images/HBO-Logo-square.jpg" alt="" class="avatar">
              <h3 class="card-title">Game of Thrones <br> Season 5 - Mother's Mercy</h3>
            </div>

          </div>

          <div class="live-card">

            <div class="card-head">
              <img src="${episodeList[14].image.medium}" alt="" class="card-img">
              <div class="live-badge">LIVE</div>
              <div class="total-viewers">468K viewers</div>
              <div class="play">
                <ion-icon name="play-circle-outline"></ion-icon>
              </div>
            </div>

            <div class="card-body">
              <img src="./assets/images/HBO-Logo-square.jpg" alt="" class="avatar">
              <h3 class="card-title">Vikings <br> Season 4 - What Might Have Been</h3>
            </div>


`
  document.querySelector('.live-grid').innerHTML = live

  // Show more info when clicked on a movie
  function Banner(img, year, title, summary) {
    let banner = document.querySelector('.banner')
    let bannerTemplate = `
             <div class="banner-card">

          <img src="${img}" class="banner-img" alt="">

          <div class="card-content">
            <div class="card-info">

              <div class="genre">
                <ion-icon name="film"></ion-icon>
                <span>Action/Thriller</span>
              </div>

              <div class="year">
                <ion-icon name="calendar"></ion-icon>
                <span>${year}</span>
              </div>

              <div class="duration">
                <ion-icon name="time"></ion-icon>
                <span>2h 11m</span>
              </div>

              <div class="quality">4K</div>

            </div>
            <h2 class="card-title">${title}</h2>
            <p>${summary}</p>
          </div>

        </div>
        `
    banner.innerHTML += bannerTemplate;
  }



};
window.onload = setup;

'use strict';



// variables for navbar menu toggle
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const navbarMenuBtn = document.querySelector('.navbar-menu-btn');

// variables for navbar search toggle
const navbarForm = document.querySelector('.navbar-form');
const navbarFormCloseBtn = document.querySelector('.navbar-form-close');
const navbarSearchBtn = document.querySelector('.navbar-search-btn');


// navbar menu toggle function
function navIsActive() {
  header.classList.toggle('active');
  nav.classList.toggle('active');
  navbarMenuBtn.classList.toggle('active');
}

navbarMenuBtn.addEventListener('click', navIsActive);



// navbar search toggle function
const searchBarIsActive = () => navbarForm.classList.toggle('active');

navbarSearchBtn.addEventListener('click', searchBarIsActive);
navbarFormCloseBtn.addEventListener('click', searchBarIsActive);



// 