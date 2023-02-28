import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import SandButton from '../components/SandButton';
import { setIsPlay } from '../redux/actions';
import './Favorites.css';

function Favorites() {
  const [loading] = useState(false);
  const favorites = useSelector((state) => state.favoriteSongsReducer.favorites);
  const artWork = useSelector((state) => state.artWorkReducer.artWork);
  const name = useSelector((state) => state.artWorkReducer.name);
  const track = useSelector((state) => state.artWorkReducer.track);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsPlay(false));
  }, []);

  useEffect(() => () => {
    dispatch(setIsPlay(false));
  }, [dispatch]);

  return (
    <div data-testid="page-favorites">
      <Header />
      <div className="fav main album-container">
        <div className="div-album">
          <SandButton />
          <img className="fav-art" src={ artWork } alt="" />
          <div className="fav-title">
            <h4>{name}</h4>
            <h5 title={ track }>
              {track?.length > 25 ? `${track.slice(0, 25)}...` : track}
            </h5>
            <h1>FAVORITA</h1>
          </div>
        </div>

        <div className="card-container-fav">
          {loading ? <h2>Carregando...</h2> : <MusicCard tracks={ favorites } />}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
