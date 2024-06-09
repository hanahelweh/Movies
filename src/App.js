import './App.css';
import Header from './components/Header';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import Loading from './components/Loading';
import Error from './components/Error';
import Box from './components/Box';
import WishList from './components/WishList';
import { useState } from 'react';
import { useMovies } from './customHooks/useMovies';
import { useLocalStorage } from './customHooks/useLocaleStorage';

function App() {
  const [query,setQuery]=useState('');
  const {movies,isLoading,error} = useMovies(query);
  const [current,setCurrent]=useState(null);
  const [watchList,setWatchList]=useLocalStorage([],"watch");

  return (
    <div className='flexi'>
      <div className='container'>
        <Header setQuery={setQuery}/>
        <div className='body-content'>
          <Box>
            {isLoading && <Loading/>}
            {error && <Error error={error}/>}
            {!isLoading && !error && movies && (
              <>
              {movies.map((movie)=>(
                <Movies setCurrent={setCurrent} movie={movie} key={movie.imdbID} />
              ))}
              </>
            )}
          </Box>
          <Box> 
            {current && <MovieDetails watchList={watchList} setWatchList={setWatchList} current={current} setCurrent={setCurrent}/>}
            {!current && watchList && <WishList setWatchList={setWatchList} watchList={watchList}/>}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default App;
