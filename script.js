//You can edit ALL of the code here
// Fetch Function
// function tvMaze() {
//   fetch("https://api.tvmaze.com/shows/82/episodes")
//     .then(function (response) {
//       return response.text();
//     })

//     .then(function (episode) {
//       console.log(typeof (episode))

//     })
//     // If something goes wrong
//     .catch((error) => console.log(error));

// }


function error() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}


function setup() {
  // const allEpisodes = tvMaze();
  // makePageForEpisodes(allEpisodes)
  // let allEpisodes;
  fetch("https://api.tvmaze.com/shows/527/episodes")
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        console.log(response);
        return response.json();
      } else {
        // throw new Error(
        //   `Encountered something unexpected: ${response.status} ${response.statusText}`
        // );
        location.reload(error());
        return error()
      }
    })
    .then((jsonResponse) => {
      // do whatever you want with the JSON response
      allEpisodes = jsonResponse;
      makePageForEpisodes(allEpisodes);
      console.log(allEpisodes);
    })
    .catch((error) => {
      // Handle the error
      console.log(error);
    });
};





function makePageForEpisodes(episodeList) {
  // testing Works perfect
  // let episode = episodeList
  // for (let i = 0; i < episode.length; i++) {
  //   console.log(`${episode[i].name} - S0${episode[i].season}E0${episode[i].number}`);
  // }

  const rootElem = document.getElementById("root");


  // Make container
  const firsDiv = document.createElement('div');
  firsDiv.classList.add('container')

  // Count Results
  let Display = document.getElementById("results");

  // Make container
  const container = document.createElement('div');
  container.classList.add('container')


  // Make Row For CSS
  const row = document.createElement('div');
  row.classList.add('row')



  episodeList.forEach((episode) => {
    //console.log(episode);

    const movies = `${episode.name} - S0${episode.season}E0${episode.number}`;
    console.log(movies);

    const image = episode.image.medium;
    console.log(image);

    // remove the <p></p> tags inside the text using regex from summary

    const delP = episode.summary.replace(/(<([^>]+)>)/gi, "");
    console.log(delP);

    const template = `<div class="column-12 sm-column-6 md-column-4 lg-column-3">
    <div class="episodeDiv">
                <div class="title">
                    <h5>${movies}</h5>
                </div>
                <div class="images">
                    <img src=${image}>
                </div>
                <div class="delP">
                    <p>${delP}</p>
                </div>
            </div> 
            </div>`;
    row.innerHTML = row.innerHTML + template;
    //console.log(rowElm.innerHTML);
  });
  // show on the Screen
  rootElem.appendChild(firsDiv) // first Div
  rootElem.appendChild(row) // Second Div called Row


  // Make Selection 
  const options = document.createElement('option');
  options.classList.add('select')
  // options.selec


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

    // console.log(`${episode[i].name} - S0${episode[i].season}E0${episode[i].number}`);

    const image = episode[i].image['medium'];
    // console.log(image);
    // remove the <p></p> tags inside the text using regex from summary

    const summery = episode[i].summary.replace(/(<([^>]+)>)/gi, "");
    // console.log(summery);
    // console.log(countWords(summery))

    const rate = episode[i].rating.average;
    console.log(rate)

    // Level 400
    // const rate = episode[i].rate

    const template = `<div class="column-12 sm-column-6 md-column-4 lg-column-3">
        <div class="episodeDiv">
                    <div class="title">
                        <h5>${movies}</h5>
                    </div>
                    <div class="images">
                        <img src=${image}>
                    </div>
                    <div class="summery">
                        <p>${summery}</p>
                    </div>
                     
                </div>
                </div>`;
    row.innerHTML = row.innerHTML + template;
    // console.log(row.innerHTML);
  }
  rootElem.appendChild(row) //Display in HTML
  // }

  // Level 200
  // search-container
  //id search-input
  // id submit
  // h3 id results

  // let submit = document.getElementById('submit').

  document.getElementById('search-input').addEventListener('keyup', function (e) {

    // Locate the card elements
    let title = document.querySelectorAll('.title'),
      images = document.querySelectorAll('.images'),
      summery = document.querySelectorAll('.summery'),
      row = document.querySelectorAll('.column-12'),
      rate = document.querySelectorAll(".rating")
    // count = 0;

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

    // Calculate is-not-hidden

    // let Hide = document.querySelectorAll(".is-hidden"),
    //   Screen = document.querySelectorAll(".on-Screen"),
    //   NoneHidden = Hide.length,
    //   screen = Screen.length;
    // // countResults = episode.length;
    // if (NoneHidden == 0) {
    //   Display.textContent = `Displaying 73/73 episodes`
    //   console.log(countResults)
    // } else {
    //   let check = title.innerText.toLowerCase().includes(search_query.toLowerCase()).length
    //   console.log(check)
    //   console.log("On Screen Number" + screen)
    //   Display.textContent = `Displaying ${NoneHidden}/73 episodes`
    // }

    // Calculate the Number of show up
    // count = 0
    // for (let i = 0; i < title.length; i++) {
    //   if (title) {

    //   }
    // }
    // console.log(count)

    e.preventDefault();
    // show on the Screen
  });
  // rootElem.appendChild(container) // first Div


  // Level 300
  // select-show
  // Make option automatically 
  for (let i = 0; i < episode.length; i++) {
    let movies = `S0${episode[i].season}E0${episode[i].number} - ${episode[i].name}`;
    const option = document.createElement('option');
    const optionText = document.createTextNode(movies);
    // set class
    option.classList.add('Options')
    // set option text
    option.appendChild(optionText);
    // and option value
    option.setAttribute('value', `${episode[i].name}`);
    const select = document.querySelector('#select-show');
    select.appendChild(option);
  };
  document.getElementById('select-show').addEventListener('change', (e) => {
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
