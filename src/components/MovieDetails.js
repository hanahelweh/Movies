import { useEffect,useState } from "react";
import Loader from '../components/Loader';
import Rating from '../components/Rating';

export default function MovieDetails({current,setCurrent,watchList,setWatchList,rating,setRating}) {
    const [currentMovie,setCurrentMovie]=useState({});
    const [isLoading,setIsLoading]=useState(false);
    const isInWatchList = watchList.map((watch)=>watch.imdbID).includes(current);

    function handleAddToWishList(){
        setWatchList([...watchList,{...currentMovie,rating}]);
        setCurrent('');
        setRating('')
    }

    useEffect(function(){
        async function getCurrentMovie(){
            try{
                setIsLoading(true);
                const response = await fetch(`http://www.omdbapi.com/?apikey=2f8c3b60&i=${current}`);
                const data = await response.json();
                setCurrentMovie(data);
            }catch(error){
                console.log(error)
            }finally{
                setIsLoading(false);
            }
        }
        getCurrentMovie()
    },[current])
    return (
        <>
        {isLoading && <Loader/>}
        {!isLoading && (<>
        <div className="movie-header">
            <div className="movie-details-img" style={{backgroundImage:`url(${currentMovie.Poster})`}}></div>
            <div style={{padding:'10px'}}>
                <div style={{fontSize:'22px',fontWeight:'700',marginBottom:'2px'}}>{currentMovie.Title}</div>
                <div className="second" style={{marginBottom:'20px'}}>{currentMovie.Genre}</div>
                <div className="second" style={{marginBottom:'7px'}}><i style={{marginRight:'10px',color:'rgb(54, 147, 82)'}} className="fa-solid fa-calendar-week"></i>{currentMovie.Released}</div>
                <div className="second" style={{marginBottom:'7px'}}><i style={{marginRight:'10px',color:'rgb(101, 109, 162)'}} className="fa-solid fa-film"></i>{currentMovie.Runtime}</div>
                <div className="second"><i style={{color:'orange', marginRight:'10px'}} className="fa-solid fa-star"></i>{currentMovie.imdbRating}/10 IMDb Rating</div>
            </div>
        </div>
        {!isInWatchList && <div className="actions-container">
          <div className="rating">
            <Rating color={'orange'} maxRate={10} onSetRating={setRating}/>
          </div>
          <div>
            <span className="add-btn" onClick={handleAddToWishList}>Add To Watch Later List</span>
          </div>
        </div>
        }
        <div className="info">
            <div style={{marginBottom:'20px'}}>{currentMovie.Plot}</div>
            <div style={{marginBottom:'20px'}}>Actors: {currentMovie.Actors}</div>
            <div style={{marginBottom:'20px'}}>Languages: {currentMovie.Language}</div>
            <div style={{marginBottom:'20px'}}>Director: {currentMovie.Director}</div>
        </div>
        </>)}
        </>
    );
}  