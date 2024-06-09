import {useState,useEffect} from 'react';
const apikey='2f8c3b60';
export function useMovies(query){
    const [movies,setMovies] = useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState('');

    useEffect(function(){
        const controller= new AbortController();
        async function fetchData(){
          if(query.length<3){
            setMovies([]);
            setError("");
            return;
          }
          try{
            setIsLoading(true);
            setError('');
            const response = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${query}`,{signal:controller.signal});
            if(!response.ok){
              throw new Error("Something went wrong");
            }
            const data = await response.json();
            if(data.Response === 'False'){
              throw new Error("Movie Not Found");
            }
            setMovies(data.Search);
            setError("");
          }catch(error){
            if(error.name!=='AbortError'){
              setError(error.message)
            }
          }finally{
            setIsLoading(false);
          }
        }
        fetchData();
        return function(){
          controller.abort();
        }
      },[query]);
      return {movies,isLoading,error}
}