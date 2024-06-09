import { useEffect,useState } from "react";
import Rating from '../components/Rating'
import Loading from '../components/Loading';
import Error from '../components/Error';

function MovieDetails({current,setCurrent,watchList,setWatchList}) {
  const [movie,setMovie]=useState({});
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState('');
  const [myRating,setMyRating]=useState('');
  const isInWishList = watchList.map((watch)=>watch.imdbID).includes(current);
  
  useEffect(function(){
    async function getDetails(){
      try{
        setIsLoading(true);
        setError('');
        const response = await fetch(`http://www.omdbapi.com/?apikey=2f8c3b60&i=${current}`);
        if(!response.ok){
          throw new Error("something wrong");
        }
        const data = await response.json();
        if(data.Response === 'False'){
          throw new Error("Movie details not found");
        }
        setMovie(data);
      }catch(error){
        setError(error.message)
      }finally{
        setIsLoading(false);
      }
    }
    getDetails();
  },[current]);

  useEffect(function(){
    if(!movie.Title) return;
    document.title=movie.Title;
    return function (){
      document.title="Movies"
    }
  },[movie]);

  function handleWatchList(movie){
    var movieToAdd = {...movie,myRating};
    setWatchList((watchList)=>[...watchList,movieToAdd]);
    setCurrent(null);
  }

  
  return (
    <>
    {isLoading && <Loading />}
    {error && <Error error={error}/>}
    {!isLoading && !error && (
      <>
        <div className="movie-header">
          <div className="movie-details-img" style={{backgroundImage:`url(${movie.Poster})`}}></div>
          <div style={{padding:'10px'}}>
            <div style={{fontSize:'22px',fontWeight:'700',marginBottom:'2px'}}>{movie.Title}</div>
            <div className="second" style={{marginBottom:'20px'}}>By {movie.Writer}</div>
            <div className="second" style={{marginBottom:'7px'}}><i style={{marginRight:'10px',color:'rgb(54, 147, 82)'}} className="fa-solid fa-calendar-week"></i>{movie.Released} - {movie.Runtime}</div>
            <div className="second" style={{marginBottom:'7px'}}><i style={{marginRight:'10px',color:'rgb(101, 109, 162)'}} className="fa-solid fa-film"></i>{movie.Genre}</div>
            <div className="second"><i style={{color:'orange', marginRight:'10px'}} className="fa-solid fa-star"></i>{movie.imdbRating}/10 IMDb Rating</div>
          </div>
        </div>
        {!isInWishList && (<div className="actions-container">
          <div className="rating">
            <Rating color={'orange'} maxRate={10} onSetRating={setMyRating}/>
          </div>
          <div>
            <span onClick={()=>handleWatchList(movie)} className="add-btn">Add To Watch Later List</span>
          </div>
        </div>)}
        <div className="info">
          <div style={{marginBottom:'20px'}}>{movie.Plot}</div>
          <div style={{marginBottom:'20px'}}>Actors: {movie.Actors}</div>
          <div style={{marginBottom:'20px'}}>Languages: {movie.Language}</div>
          <div style={{marginBottom:'20px'}}>Director: {movie.Director}</div>
        </div>
      </>
    )}
    </>
  );
  }
  
  export default MovieDetails;
  