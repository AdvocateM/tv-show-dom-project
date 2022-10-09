
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
      } else {
        // throw new Error(
        //   `Encountered something unexpected: ${response.status} ${response.statusText}`
        // );
        location.reload(error());
        // return error()
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


  // episodeList.forEach((episode) => {

  //   // Movie Title
  //   const movies = `${episode.name} - S0${episode.season}E0${episode.number}`;
  //   // console.log(movies);

  //   // Movie Image
  //   const image = episode.image.medium;
  //   // console.log(image);


  //   // Movie Summary
  //   const summary = episode.summary.replace(/(<([^>]+)>)/gi, "");
  //   // console.log(summary);

  //   // Year of relize
  //   const premiered = episode.airdate;
  //   console.log(premiered)


  //   // Movie Rate
  //   const rate = episode.rating.average;
  //   console.log(rate)



  //   const template = `
  //   <div class="movie-card">

  //           <div class="card-head">
  //             <img src="${image}" alt="" class="card-img">

  //             <div class="card-overlay">

  //               <div class="bookmark">
  //                 <ion-icon name="bookmark-outline"><span></span></ion-icon>

  //               </div>

  //               <div class="rating">
  //                 <ion-icon name="star-outline"></ion-icon>
  //                 <span>${rate}</span>
  //               </div>

  //               <div class="play">
  //                 <a href="https://mrmaroga.com" class="navbar-brand" target="_blank">
  //                 <ion-icon name="play-circle-outline"></ion-icon>
  //                 </a>
  //               </div>

  //             </div>
  //           </div>

  //           <div class="card-body">
  //             <h3 class="card-title">${movies}</h3>

  //             <div class="card-info">
  //               <span class="genre">Action/Comedy</span>
  //               <span class="year">${premiered}</span>
  //             </div>
  //           </div>

  //         </div>`;
  //   showMovies.innerHTML += template;
  // });


  // show on the Screen
  // rootElem.appendChild(firsDiv) // first Div
  showMovies.appendChild(row) // Second Div called Row

  /*
    The End Of the Home Section
    */



  /**
   * the Start of Select Options
   * Select any Episodes you Would like to watch
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
   * Select Any Movies By It's year Of Realize 
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


  // const options = document.createElement('option');
  // options.classList.add('select')
  // options.select


  // episodeList.forEach(Shows(episodeList));

  let episode = episodeList

  // show All the Episodes On the Screen
  // function Shows(episode) {
  // List 4 search

  let searchName = [];
  let searchSummery = [];
  let displayCount = document.getElementById('results');
  displayCount.textContent = `Showing ${episode.length}`


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
    <div class="movie-card">

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
    showMovies.innerHTML += template;
  }
  const btn = `<button class="load-more">LOAD MORE</button>`
  showMovies.innerHTML += btn
  // rootElem.appendChild(row) //Display in HTML


  document.getElementById('search-input').addEventListener('keyup', function (e) {

    // Locate the card elements
    let title = document.querySelectorAll('.title'),
      images = document.querySelectorAll('.images'),
      summery = document.querySelectorAll('.summery'),
      row = document.querySelectorAll('.column-12'),
      rate = document.querySelectorAll(".rating");

    // Locate the search input
    let search_query = document.getElementById("search-input").value,
      countResults = episode.length;

    // Loop through the title
    // count = ""
    for (var i = 0; i < title.length; i++) {
      // If the text is within the column...

      let checkTitle = title[i].innerText.toLowerCase().includes(search_query.toLowerCase());
      let checkSummery = summery[i].innerText.toLowerCase().includes(search_query.toLowerCase());


      console.log(typeof (checkSummery));
      if (checkTitle || checkSummery) {
        // ...remove the `.is-hidden` class.
        title[i].classList.remove("is-hidden");
        images[i].classList.remove("is-hidden");
        summery[i].classList.remove("is-hidden");
        rate[i].classList.remove("is-hidden");



        let howManyTitles = checkTitle.length;
        let howManySummery = checkSummery.length;
        // console.log(howManySummery)
        // if (howManySummery === 0) {
        //   Display.textContent = `Displaying ${howManyTitles}}/${episode.length} episodes`
        // } else {
        //   Display.textContent = `Displaying ${howManySummery}/${episode.length} episodes`
        // }
        // count += title.length
      } else {
        // Otherwise, add the class.
        title[i].classList.add("is-hidden");
        images[i].classList.add("is-hidden");
        summery[i].classList.add("is-hidden");
        row[i].classList.add('is-hidden');
      }
    };


    e.preventDefault();
    // show on the Screen
  });
  // rootElem.appendChild(container) // first Div





  document.getElementById('SelectEpisode').addEventListener('change', (e) => {
    let title = document.querySelectorAll('.title'),
      images = document.querySelectorAll('.images'),
      summery = document.querySelectorAll('.summery'),
      row = document.querySelectorAll('.column-12'),
      rating = document.querySelectorAll(".is-hidden")

    console.log(e.target.value)
    for (var i = 0; i < title.length; i++) {
      // If the text is within the card...
      if (title[i].innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
        // ...remove the `.is-hidden` class.
        title[i].classList.remove("is-hidden");
        images[i].classList.remove("is-hidden");
        summery[i].classList.remove("is-hidden");
        // ratting[i].classList.add("on-Screen");
        // count += title.length

      } else {
        // Otherwise, add the class.
        title[i].classList.add("is-hidden");
        images[i].classList.add("is-hidden");
        summery[i].classList.add("is-hidden");
        row[i].classList.add('is-hidden');
      }
      if (e.target.value === 'All episodes') {
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
              <img src="${episodeList[2].image.medium}" alt="" class="card-img">
              <div class="live-badge">LIVE</div>
              <div class="total-viewers">305K viewers</div>
              <div class="play">
                <ion-icon name="play-circle-outline"></ion-icon>
              </div>
            </div>

            <div class="card-body">
              <img src="${episodeList[13].image.medium}" alt="" class="avatar">
              <h3 class="card-title">Planet Earth II <br> Season 1 - Islands</h3>
            </div>

          </div>

          <div class="live-card">

            <div class="card-head">
              <img src="${episodeList[80].image.medium}" alt="" class="card-img">
              <div class="live-badge">LIVE</div>
              <div class="total-viewers">1.7M viewers</div>
              <div class="play">
                <ion-icon name="play-circle-outline"></ion-icon>
              </div>
            </div>

            <div class="card-body">
              <img src="${episodeList[78].image.medium}" alt="" class="avatar">
              <h3 class="card-title">Game of Thrones <br> Season 5 - Mother's Mercy</h3>
            </div>

          </div>

          <div class="live-card">

            <div class="card-head">
              <img src="${episodeList[86].image.medium}" alt="" class="card-img">
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


  // Onchange Function
  function Onchange() {
    let value = document.getElementById('select-show').value;
    alert(`you have Selected: ${value}`)

    for (var i = 0; i < title.length; i++) {
      // If the text is within the card...
      if (title[i] === value || summery[i] === value) {
        // ...remove the `.is-hidden` class.
        title[i].classList.remove("is-hidden");
        images[i].classList.remove("is-hidden");
        summery[i].classList.remove("is-hidden");
        title[i].classList.add("on-Screen");
        // count += title.length
      } else {
        // Otherwise, add the class.
        title[i].classList.add("is-hidden");
        images[i].classList.add("is-hidden");
        summery[i].classList.add("is-hidden");
        row[i].classList.add('is-hidden');
      }
    };

  };

};
window.onload = setup;
