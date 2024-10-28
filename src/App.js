import './App.css';
import { useState } from 'react';
import {useFetch} from './customHooks/useFetch'
import Header from './components/Header';
import Box from './components/Box';
import MoviesList from './components/MoviesList';
import Loader from './components/Loader';
import MovieDetails from './components/MovieDetails';
import WatchList from './components/WatchList';
import { useLocalStorage } from './customHooks/useLocalStorage';
function App() {
  const [query,setQuery]=useState('');
  const [current,setCurrent]=useState('');
  const {data,isLoading}=useFetch(query);
  const [watchList,setWatchList]=useLocalStorage("movie");
  const [rating,setRating]=useState(0);

  return (
    <div className='flexi'>
      <div className='container'>
        <Header query={query} setQuery={setQuery}/>
        <div className='body-content'>
          <Box>
            {isLoading && <Loader/>}
            {!isLoading && data &&(
              <>
                {data.map((movie)=><MoviesList setCurrent={setCurrent} movie={movie} key={movie.imdbID}/>)}
              </>)}
          </Box>
          <Box>
            {watchList && !current && <WatchList watchList={watchList} setWatchList={setWatchList}/>}
            {current && <MovieDetails current={current} setCurrent={setCurrent} watchList={watchList} setWatchList={setWatchList} rating={rating} setRating={setRating}/>}
          </Box>
        </div>
      </div>
    </div>
  );
}
export default App;
