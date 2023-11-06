import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import styled from 'styled-components';
import Sidebar from './Sidebar';

function Airing({ rendered }) {
  const { airingAnime, isSearch, searchResults } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch && rendered === 'airing') {
      return airingAnime?.map((anime) => {
        return (
          <Link
            to={`/anime/${anime.mal_id}`}
            key={anime.mal_id}
          >
            <img
              src={anime.images.jpg.large_image_url}
              alt=""
            />
            <h4>{anime.title}</h4>
          </Link>
        );
      });
    } else {
      return searchResults?.map((anime) => {
        return (
          <Link
            to={`/anime/${anime.mal_id}`}
            key={anime.mal_id}
          >
            <img
              src={anime.images.jpg.large_image_url}
              alt=""
            />
            <h3>{anime.title}</h3>
          </Link>
        );
      });
    }
  };

  return (
    <PopularStyled>
      <div className="airing-anime">{conditionalRender()}</div>
      <Sidebar />
    </PopularStyled>
  );
}

const PopularStyled = styled.div`
  display: flex;
  h4,
  h3 {
    color: #f8c119;
  }
  .airing-anime {
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 5rem;
    padding-right: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    background-color: #0f0f0f;
    border-top: 5px solid #f8c119;
    a {
      height: 500px;
      border-radius: 7px;
      border: 5px solid #f8c119;
    }
    a img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`;

export default Airing;
