import { useEffect, useState } from "react";

export function useFetch(query){
    const [data,setData]= useState([]);
    const [isLoading,setIsLoading] = useState(false);
    useEffect(function(){
        async function fetchData(){
            try{
                setIsLoading(true);
                const response = await fetch(`http://www.omdbapi.com/?apikey=2f8c3b60&s=${query}`);
                const fetchedData = await response.json();
                setData(fetchedData.Search);
            }catch(error){
                console.log(error)
            }finally{
                setIsLoading(false)
            }
        }
    fetchData();
    },[query]);
    return {data,isLoading};
}