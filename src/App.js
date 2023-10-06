import React, { useEffect, useState } from "react";
import "./App.css";

import {
  Footer,
  Genre,
  Header,
  Main,
  Navbar,
  Rating,
  RatingLabel,
  Slider,
} from "./components";
import genres from "./genres";
import useGenreFetcher from "./utils/useGenreFetcher";
import useTrimArrays from "./utils/useTrimArrays";

const movieData = [
  {
    adult: false,
    backdrop_path: "/H6j5smdpRqP9a8UnhWp6zfl0SC.jpg",
    genre_ids: [28, 878, 12],
    id: 565770,
    original_language: "en",
    original_title: "Blue Beetle",
    overview:
      "Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home is not quite as he left it. As he searches to find his purpose in the world, fate intervenes when Jaime unexpectedly finds himself in possession of an ancient relic of alien biotechnology: the Scarab.",
    popularity: 3538.632,
    poster_path: "/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
    release_date: "2023-08-16",
    title: "Blue Beetle",
    video: false,
    vote_average: 7.1,
    vote_count: 863,
  },
  {
    adult: false,
    backdrop_path: "/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg",
    genre_ids: [28, 9648, 53, 80],
    id: 762430,
    original_language: "en",
    original_title: "Retribution",
    overview:
      "When a mysterious caller puts a bomb under his car seat, Matt Turner begins a high-speed chase across the city to complete a specific series of tasks. With his kids trapped in the back seat and a bomb that will explode if they get out of the car, a normal commute becomes a twisted game of life or death as Matt follows the stranger's increasingly dangerous instructions in a race against time to save his family.",
    popularity: 1847.972,
    poster_path: "/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg",
    release_date: "2023-08-23",
    title: "Retribution",
    video: false,
    vote_average: 6.8,
    vote_count: 218,
  },
  {
    adult: false,
    backdrop_path: "/8pjWz2lt29KyVGoq1mXYu6Br7dE.jpg",
    genre_ids: [28, 878, 27],
    id: 615656,
    original_language: "en",
    original_title: "Meg 2: The Trench",
    overview:
      "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
    popularity: 1557.198,
    poster_path: "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
    release_date: "2023-08-02",
    title: "Meg 2: The Trench",
    type: "Action",
    video: false,
    vote_average: 7,
    vote_count: 1942,
  },
  {
    adult: false,
    backdrop_path: "/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
    genre_ids: [28, 80, 53],
    id: 385687,
    original_language: "en",
    original_title: "Fast X",
    overview:
      "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
    popularity: 1436.067,
    poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    release_date: "2023-05-17",
    title: "Fast X",
    type: "Action",
    video: false,
    vote_average: 7.3,
    vote_count: 3835,
  },
  {
    adult: false,
    backdrop_path: "/iIvQnZyzgx9TkbrOgcXx0p7aLiq.jpg",
    genre_ids: [27, 53],
    id: 1008042,
    original_language: "en",
    original_title: "Talk to Me",
    overview:
      "When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.",
    popularity: 1318.22,
    poster_path: "/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",
    release_date: "2023-07-26",
    title: "Talk to Me",
    type: "Drama",
    video: false,
    vote_average: 7.2,
    vote_count: 849,
  },
];
const newMovieData = [
  {
    adult: false,
    backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
    genre_ids: [35, 12, 14],
    id: 346698,
    original_language: "en",
    original_title: "Barbie",
    overview:
      "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
    popularity: 1315.19,
    poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    release_date: "2023-07-19",
    title: "Barbie",
    video: false,
    vote_average: 7.3,
    vote_count: 4990,
  },
  {
    adult: false,
    backdrop_path: "/53z2fXEKfnNg2uSOPss2unPBGX1.jpg",
    genre_ids: [27, 9648, 53],
    id: 968051,
    original_language: "en",
    original_title: "The Nun II",
    overview:
      "In 1956 France, a priest is violently murdered, and Sister Irene begins to investigate. She once again comes face-to-face with a powerful evil.",
    popularity: 1205.107,
    poster_path: "/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg",
    release_date: "2023-09-06",
    title: "The Nun II",
    video: false,
    vote_average: 6.6,
    vote_count: 315,
  },
  {
    adult: false,
    backdrop_path: "/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg",
    genre_ids: [28, 53],
    id: 717930,
    original_language: "en",
    original_title: "Kandahar",
    overview:
      "After his mission is exposed, an undercover CIA operative stuck deep in hostile territory in Afghanistan must fight his way out, alongside his Afghan translator, to an extraction point in Kandahar, all whilst avoiding elite enemy forces and foreign spies tasked with hunting them down.",
    popularity: 891.74,
    poster_path: "/lCanGgsqF4xD2WA5NF8PWeT3IXd.jpg",
    release_date: "2023-05-25",
    title: "Kandahar",
    video: false,
    vote_average: 6.9,
    vote_count: 548,
  },
  {
    adult: false,
    backdrop_path: "/4fLZUr1e65hKPPVw0R3PmKFKxj1.jpg",
    genre_ids: [16, 35, 10751, 14, 10749],
    id: 976573,
    original_language: "en",
    original_title: "Elemental",
    overview:
      "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
    popularity: 831.035,
    poster_path: "/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg",
    release_date: "2023-06-14",
    title: "Elemental",
    video: false,
    vote_average: 7.8,
    vote_count: 2363,
  },
  {
    adult: false,
    backdrop_path: "/5xUJBgds96m6Xi2EtUpSzbw24D7.jpg",
    genre_ids: [53, 9648],
    id: 852436,
    original_language: "fr",
    original_title: "Seule : Les dossiers Silvercloud",
    overview:
      "Alone in the mountains of Switzerland, Anne discovers that her isolated chalet is on surveillance and has been bugged. Caught up by her former life as an intelligence secret agent and an affair with her handler, Anne can only count on herself to get out alive.",
    popularity: 760.025,
    poster_path: "/qx81rP4b4UFcxjabCqfe79F24Z0.jpg",
    release_date: "2023-03-08",
    title: "Let Her Kill You",
    video: false,
    vote_average: 5.9,
    vote_count: 32,
  },
];
const popularMovieData = [
  {
    adult: false,
    backdrop_path: "/iOJX54nVAsnPawagFiWXKv1Y6sB.jpg",
    genre_ids: [16, 12, 10751],
    id: 1076364,
    original_language: "en",
    original_title: "Carl's Date",
    overview:
      "Carl Fredricksen reluctantly agrees to go on a date with a lady friend—but admittedly has no idea how dating works these days. Ever the helpful friend, Dug steps in to calm Carl's pre-date jitters and offer some tried-and-true tips for making friends—if you're a dog.",
    popularity: 759.057,
    poster_path: "/y8NtM6q3PzntqyNRNw6wgicwRYl.jpg",
    release_date: "2023-06-15",
    title: "Carl's Date",
    video: false,
    vote_average: 7.9,
    vote_count: 164,
  },
  {
    adult: false,
    backdrop_path: "/35z8hWuzfFUZQaYog8E9LsXW3iI.jpg",
    genre_ids: [12, 28],
    id: 335977,
    original_language: "en",
    original_title: "Indiana Jones and the Dial of Destiny",
    overview:
      "Finding himself in a new era, and approaching retirement, Indy wrestles with fitting into a world that seems to have outgrown him. But as the tentacles of an all-too-familiar evil return in the form of an old rival, Indy must don his hat and pick up his whip once more to make sure an ancient and powerful artifact doesn't fall into the wrong hands.",
    popularity: 704.322,
    poster_path: "/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg",
    release_date: "2023-06-28",
    title: "Indiana Jones and the Dial of Destiny",
    video: false,
    vote_average: 6.7,
    vote_count: 1720,
  },
  {
    adult: false,
    backdrop_path: "/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg",
    genre_ids: [28, 12, 878],
    id: 667538,
    original_language: "en",
    original_title: "Transformers: Rise of the Beasts",
    overview:
      "When a new threat capable of destroying the entire planet emerges, Optimus Prime and the Autobots must team up with a powerful faction known as the Maximals. With the fate of humanity hanging in the balance, humans Noah and Elena will do whatever it takes to help the Transformers as they engage in the ultimate battle to save Earth.",
    popularity: 620.407,
    poster_path: "/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
    release_date: "2023-06-06",
    title: "Transformers: Rise of the Beasts",
    video: false,
    vote_average: 7.5,
    vote_count: 3237,
  },
  {
    adult: false,
    backdrop_path: "/waBWlJlMpyFb7STkFHfFvJKgwww.jpg",
    genre_ids: [28, 18],
    id: 678512,
    original_language: "en",
    original_title: "Sound of Freedom",
    overview:
      "The story of Tim Ballard, a former US government agent, who quits his job in order to devote his life to rescuing children from global sex traffickers.",
    popularity: 619.562,
    poster_path: "/kSf9svfL2WrKeuK8W08xeR5lTn8.jpg",
    release_date: "2023-07-03",
    title: "Sound of Freedom",
    video: false,
    vote_average: 8,
    vote_count: 476,
  },
  {
    adult: false,
    backdrop_path: "/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
    genre_ids: [28, 12, 878],
    id: 298618,
    original_language: "en",
    original_title: "The Flash",
    overview:
      "When his attempt to save his family inadvertently alters the future, Barry Allen becomes trapped in a reality in which General Zod has returned and there are no Super Heroes to turn to. In order to save the world that he is in and return to the future that he knows, Barry's only hope is to race for his life. But will making the ultimate sacrifice be enough to reset the universe?",
    popularity: 554.433,
    poster_path: "/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
    release_date: "2023-06-13",
    title: "The Flash",
    video: false,
    vote_average: 6.9,
    vote_count: 2922,
  },
];

function App() {
  const [slideMovies, setSlideMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistMov, setWatchlistMov] = useState();
  // const [login, setLogin] = useState(false);

  // const url = process.env.API_URL;
  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`,
  //   },
  // };

  // Add genres property to movie data using custom hook

  const updatedMovieData = useGenreFetcher(movieData, genres);
  const updatedNewMovieData = useGenreFetcher(newMovieData, genres);
  const updatedPopularMovie = useGenreFetcher(popularMovieData, genres);

  useEffect(() => {
    setSlideMovies(updatedMovieData);
    setNewMovies(updatedNewMovieData);
    setPopularMovies(updatedPopularMovie);

    console.log("movies data", slideMovies);
  }, []);

  function handleWatchlist(mov) {
    const isMovieInWatchlist = watchlist.some(
      (movie) => movie.title === mov.title
    );

    if (!isMovieInWatchlist) {
      setWatchlist((movies) => [...movies, mov]);
      // setIsWatchlist(true);
    }

    if (isMovieInWatchlist) {
      setWatchlist((movies) =>
        movies.filter((movie) => movie.title !== mov.title)
      );
      // setIsWatchlist(false);
    }
  }

  function handleSlider(e) {
    // const firstElement = e[0];
    // firstElement.style.transform = "translateX(-110%)";
    console.log("slider button clicked", e);
  }

  return (
    <div>
      <Header>
        <Navbar />
        <Slider
          slides={slideMovies}
          onWatchlist={handleWatchlist}
          watchlist={watchlist}
        />
      </Header>
      <Main
        newMovies={newMovies}
        popular={popularMovies}
        onSlide={handleSlider}
        onWatchlist={handleWatchlist}
        watchlist={watchlist}
      />
      <Footer />
    </div>
  );
}

export default App;
