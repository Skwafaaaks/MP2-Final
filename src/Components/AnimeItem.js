import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

function AnimeItem() {
  const { id } = useParams();

  //state
  const [anime, setAnime] = React.useState({});
  const [characters, setCharacters] = React.useState([]);
  const [showMore, setShowMore] = React.useState(false);

  //destructure anime
  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime;

  //get anime based on id
  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();
    setAnime(data.data);
  };

  //get characters
  const getCharacters = async (anime) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${anime}/characters`
    );
    const data = await response.json();
    setCharacters(data.data);
    console.log(data.data);
  };

  //initial render
  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, []);

  return (
    <AnimeItemStyled>
      <Link to="/">
        <i className="fas fa-arrow-left home"></i>
      </Link>
      <h1 className="homePage">{title}</h1>

      <div className="details">
        <div className="detail">
          <div className="image">
            <img
              className="mainimg"
              src={images?.jpg.large_image_url}
              alt=""
            />
          </div>
          <div className="anime-details">
            <p>
              <span>Aired:</span>
              <span>{aired?.string}</span>
            </p>
            <p>
              <span>Rating:</span>
              <span>{rating}</span>
            </p>
            <p>
              <span>Rank:</span>
              <span>{rank}</span>
            </p>
            <p>
              <span>Score:</span>
              <span>{score}</span>
            </p>
            <p>
              <span>Scored By:</span>
              <span>{scored_by}</span>
            </p>
            <p>
              <span>Popularity:</span>
              <span>{popularity}</span>
            </p>
            <p>
              <span>Status:</span>
              <span>{status}</span>
            </p>
            <p>
              <span>Source:</span>
              <span>{source}</span>
            </p>
            <p>
              <span>Season:</span>
              <span>{season}</span>
            </p>
            <p>
              <span>Duration:</span>
              <span>{duration}</span>
            </p>
          </div>
        </div>
        <p className="description">
          {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
          <button
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            {showMore ? 'Show Less' : 'Read More'}
          </button>
        </p>
      </div>
      <h3 className="title">Trailer</h3>
      <div className="trailer-con">
        {trailer?.embed_url ? (
          <iframe
            src={trailer?.embed_url}
            title="Inline Frame Example"
            width="800"
            height="450"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <h3>Trailer not available</h3>
        )}
      </div>
      <h3 className="title">Characters</h3>
      <div className="characters">
        {characters?.map((character, index) => {
          const { role } = character;
          const { images, name, mal_id } = character.character;
          return (
            <Link
              to={`/character/${mal_id}`}
              key={index}
            >
              <div className="character">
                <img
                  className="chara"
                  src={images?.jpg.image_url}
                  alt=""
                />
                <h4>{name}</h4>
                <p>{role}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </AnimeItemStyled>
  );
}

const AnimeItemStyled = styled.div`
  .mainimg {
    border: 5px solid #f8c119;
  }
  .chara {
    height: 300px;
  }
  i {
    font-size: 3rem;
    padding-right: 20px;
    color: #fdf4f5;
  }

  padding: 3rem 18rem;
  background-color: #0f0f0f;

  h1 {
    display: inline-block;
    font-size: 3rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background: #f8c119;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.4s ease-in-out;
    &:hover {
      transform: skew(-3deg);
    }
  }

  .title {
    display: inline-block;
    margin: 3rem 0;
    font-size: 2rem;
    cursor: pointer;
    background: #fdf4f5;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    margin-top: 2rem;
    color: #6c7983;
    line-height: 1.7rem;
    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 1.2rem;
      color: #f8c119;
      font-weight: 600;
    }
  }

  .trailer-con {
    display: flex;
    justify-content: center;
    align-items: center;
    iframe {
      outline: none;
      border: 5px solid #232d3f;
      padding: 1.5rem;
      border-radius: 10px;
      background-color: #232d3f;
    }
  }

  .details {
    background-color: #232d3f;
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid #232d3f;

    .detail {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      img {
        border-radius: 7px;
      }
    }

    .anime-details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        display: flex;
        gap: 1rem;
      }

      p span:first-child {
        font-weight: 600;
        color: #f8c119;
      }
    }
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
    background-color: #232d3f;
    padding: 2rem;
    border-radius: 20px;
    border: 5px solid #232d3f;

    .character {
      padding: 0.4rem 0.6rem;
      border-radius: 7px;
      background-color: #f8c119;
      transition: all 0.4s ease-in-out;

      img {
        width: 100%;
      }

      h4 {
        padding: 0.5rem 0;
        color: #454e56;
      }

      p {
        color: #27ae60;
      }

      &:hover {
        transform: translateY(-5px);
      }
    }
  }
`;

export default AnimeItem;