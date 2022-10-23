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
  banner.innerHTML = bannerTemplate;
}

// Show new movies
function newest() {
  let years = episodeList[i].airdate;
  let cardTitle = movieCard.querySelector('.card-title');
  let card = document.querySelectorAll('.movie-card');

  if (years >= 2007) {
    for (movieCard of card) {
      let newest = years;

      if (newest) {
        let checkDate = newest.innerText.toLowerCase().includes(search_query.toLowerCase());

        if (checkDate) {
          movieCard.classList.remove("is-hidden");
          movieCard.classList.add('count');
        } else {
          movieCard.classList.add("is-hidden");
          movieCard.classList.remove('count');
        }
      }
    }
  }
}

// Show by Popularity
function popularity() {
  let weight = episodeList[i].weight;
  let cardTitle = movieCard.querySelector('.card-title');
  let card = document.querySelectorAll('.movie-card');

  if (weight >= 60) {
    for (movieCard of card) {
      // let newest = years;

      if (newest) {
        let checkWeight = weight.innerText.toLowerCase().includes(search_query.toLowerCase());

        if (checkWeight) {
          movieCard.classList.remove("is-hidden");
          movieCard.classList.add('count');
        } else {
          movieCard.classList.add("is-hidden");
          movieCard.classList.remove('count');
        }
      }
    }
  }
}



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
    const bannerImg = episode.image.original;
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
    <div class="movie-card" id="movies-card" onclick="Banner('${bannerImg}', '${premiered}', '${movies}', '${summary}')">

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

  // document.querySelectorAll('.movie-card').addEventListener('click', function (card) {
  //   card.querySelector('.card-img').src

  //   Banner('https://api.tvmaze.com/shows/527/episodes');
  // })

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
   * Select Any Movies By the year Of Release  "All years"
   */
  let options = `< option value = "all years" > All the years</option >`
  document.getElementById('SelectEpisode').innerHTML = options
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



  document.getElementById('search-input').addEventListener('keyup', function (e) {

    // // Locate the card elements
    let title = document.querySelectorAll('.card-title'),
      images = document.querySelectorAll('.card-img'),
      card = document.querySelectorAll('.movie-card'),
      rate = document.querySelectorAll(".rating"),
      summery = document.querySelectorAll('.summery');



    // // Locate the search input
    let search_query = document.getElementById("search-input").value;

    for (movieCard of card) {
      let cardTitle = movieCard.querySelector('.card-title');

      if (cardTitle) {
        let checkTitle = cardTitle.innerText.toLowerCase().includes(search_query.toLowerCase());

        if (checkTitle) {
          movieCard.classList.remove("is-hidden");
          movieCard.classList.add('count');
        } else {
          movieCard.classList.add("is-hidden");
          movieCard.classList.remove('count');
        }
      }
      // let checkTitle = movieCard.querySelector('.card-title').innerText.toLowerCase().includes(search_query.toLowerCase());


    }

    // // Loop through the title
    // for (var i = 0; i < title.length; i++) {
    //   // If the text is within the movie-card

    //   let checkTitle = title[i].innerText.toLowerCase().includes(search_query.toLowerCase());
    //   // let checkSummery = summery[i].innerText.toLowerCase().includes(search_query.toLowerCase());
    //   // console.log(checkSummery)


    //   console.log(typeof (checkTitle));
    //   if (checkTitle) {
    //     // ...remove the `.is-hidden` class.
    //     // title[i].classList.remove("is-hidden");
    //     // images[i].classList.remove("is-hidden");
    //     card[i].classList.remove("is-hidden");
    //     card[i].classList.add('count');
    //     // rate[i].classList.remove("is-hidden");
    //   } else {
    //     card[i].classList.remove('count');
    //     card[i].classList.add("is-hidden");
    //     // Otherwise, add the class.
    //     // title[i].classList.add("is-hidden");
    //     // images[i].classList.add("is-hidden");
    //     // card[i].classList.add("is-hidden");
    //     // rate[i].classList.add('is-hidden')
    //   }
    // };
    //   countResults = episode.length;
    let hide = document.querySelectorAll('.count');
    console.log(hide.length)
    displayCount = document.getElementById('results');
    displayCount.textContent = `Displaying ${hide.length}/ ${episode.length} `


    console.log(e)

    e.preventDefault();
    // show on the Screen
  });
  // rootElem.appendChild(container) // first Div





  document.querySelector('.year').addEventListener('change', (e) => {
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



  // Header 
  const header = `
  <div class="navbar">

        <!--
          - menu button for small screen
        -->
        <button class="navbar-menu-btn">
          <span class="one"></span>
          <span class="two"></span>
          <span class="three"></span>
        </button>


        <a href="#" class="navbar-brand">
          <!-- <img src="./assets/images/logomm_50x50.png" alt=""> -->
          <h1>Mr Maroga</h1>
        </a>

        <!--
          - navbar navigation
        -->

        <nav class="">
          <ul class="navbar-nav">

            <li> <a href="#" class="navbar-link">Home</a> </li>
            <li> <a href="#category" class="navbar-link">Category</a> </li>
            <li> <a href="#live" class="navbar-link  indicator">LIVE</a> </li>
            <!-- <li> <a href="#live" class="navbar-link" id="results">LIVE</a> </li> -->

          </ul>
        </nav>

        <!--
          - search and sign-in
        -->

        <div class="navbar-actions">

          <form action="#" class="navbar-form">
            <input type="text" id="search-input" name="search" placeholder="I'm looking for..."
              class="navbar-form-search">

            <button class="navbar-form-btn">
              <ion-icon name="search-outline"></ion-icon>
            </button>

            <button class="navbar-form-close">
              <ion-icon name="close-circle-outline"></ion-icon>
            </button>
          </form>


          <!--
            - search button for small screen
          -->

          <button class="navbar-search-btn">
            <ion-icon name="search-outline"></ion-icon>
          </button>

          <a href="#" class="navbar-signin">
            <span>Sign in</span>
            <ion-icon name="log-in-outline"></ion-icon>
          </a>

        </div>

      </div>`

  document.querySelector('.header').innerHTML = header


  // 
  /**
   * Show Categories
   * starts here
   */
  const category = `
             <h2 class="section-heading">Category</h2>

        <div class="category-grid">

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

        </div>
`
  document.querySelector('.category').innerHTML = category
  /* * Show Categories
     * Ends here
     * /
 
  * Show Categories
  * starts here
  */
  const live = `
 <h2 class="section-heading">Live Tv Shows</h2>

        <div class="live-grid">
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


          </div>

`
  document.querySelector('.live').innerHTML = live

  let footerTemplate =
    `    <div class="footer-content">

      <div class="footer-brand">
        
        <h1>Mr Maroga</h1>
        <p class="slogan">Movies & TV Shows, Online cinema,
          Movies from tvmaze.com API </p>


        <div class="social-link">

          <a href="#">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
          <a href="#">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
          <a href="#">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
          <a href="#">
            <ion-icon name="logo-tiktok"></ion-icon>
          </a>
          <a href="#">
            <ion-icon name="logo-youtube"></ion-icon>
          </a>

        </div>
      </div>


      <div class="footer-links">
        <ul>

          <h4 class="link-heading">Mr Maroga</h4>

          <li class="link-item"><a href="#">About us</a></li>
          <li class="link-item"><a href="#">My profile</a></li>
          <li class="link-item"><a href="#">Pricing plans</a></li>
          <li class="link-item"><a href="#">Contacts</a></li>

        </ul>

        <ul>

          <h4 class="link-heading">Browse</h4>

          <li class="link-item"><a href="#">Live Tv</a></li>
          <li class="link-item"><a href="#">Live News</a></li>
          <li class="link-item"><a href="#">Live Sports</a></li>
          <li class="link-item"><a href="#">Streaming Library</a></li>

        </ul>

        <ul>

          <li class="link-item"><a href="#">TV Shows</a></li>
          <li class="link-item"><a href="#">Movies</a></li>
          <li class="link-item"><a href="#">Kids</a></li>
          <li class="link-item"><a href="#">Collections</a></li>

        </ul>

        <ul>

          <h4 class="link-heading">Help</h4>

          <li class="link-item"><a href="#">Account & Billing</a></li>
          <li class="link-item"><a href="#">Plans & Pricing</a></li>
          <li class="link-item"><a href="#">Supported devices</a></li>
          <li class="link-item"><a href="#">Accessibility</a></li>

        </ul>
      </div>

    </div>

    <div class="footer-copyright">

      <div class="copyright">
        <p>&copy; copyright 2022 Mr Maroga</p>
      </div>

      <div class="wrapper">
        <a href="#">Privacy policy</a>
        <a href="#">Terms and conditions</a>
      </div>

    </div>
`
  document.getElementById('footers').innerHTML += footerTemplate


  // document.querySelectorAll('input[name="grade"]').addEventListener('change', () => {

  //   // radio = document.querySelectorAll('input[name="grade"]')

  //   let popular = document.getElementById('popular')
  //   let newest = document.getElementById('newest')


  //   if (radio.checked === popular) {
  //     let weight = episodeList[i].weight;
  //     let cardTitle = movieCard.querySelector('.card-title');
  //     let card = document.querySelectorAll('.movie-card');

  //     if (weight >= 60) {
  //       for (movieCard of card) {
  //         // let newest = years;

  //         if (newest) {
  //           let checkWeight = weight.innerText.toLowerCase().includes(search_query.toLowerCase());

  //           if (checkWeight) {
  //             movieCard.classList.remove("is-hidden");
  //             movieCard.classList.add('count');
  //           } else {
  //             movieCard.classList.add("is-hidden");
  //             movieCard.classList.remove('count');
  //           }
  //         }
  //       }
  //     }
  //   } else if (radio.checked === newest) {
  //     let years = episodeList[i].airdate;
  //     let cardTitle = movieCard.querySelector('.card-title');
  //     let card = document.querySelectorAll('.movie-card');

  //     if (years >= 2007) {
  //       for (movieCard of card) {
  //         let newest = years;

  //         if (newest) {
  //           let checkDate = newest.innerText.toLowerCase().includes(search_query.toLowerCase());

  //           if (checkDate) {
  //             movieCard.classList.remove("is-hidden");
  //             movieCard.classList.add('count');
  //           } else {
  //             movieCard.classList.add("is-hidden");
  //             movieCard.classList.remove('count');
  //           }
  //         }
  //       }
  //     }
  //   }

  // });


  let radioDOM = document.querySelector('.filter-radios');
  let radioTemplate = `
            <input type="radio" name="grade" id="featured" checked>
            <label for="featured">Featured</label>

            <input type="radio" name="grade" id="popular ">
            <label for="popular" >Popular</label>

            <input type="radio" name="grade" id="newest">
            <label for="newest">Newest</label>

            <div class="checked-radio-bg"></div>`;
  radioDOM.innerHTML += radioTemplate

  btn = radioDOM
  const radioCheck = document.querySelectorAll('input[name="grade"]');
  btn.addEventListener("click", () => {
    for (const radioButton of radioCheck) {
      if (radioButton.checked) {
        // selectedSize = radioButton.value;
        alert("We Don't Have Many movies at the moment!")
        break;
      }
    }
  })



};
window.onload = setup;

