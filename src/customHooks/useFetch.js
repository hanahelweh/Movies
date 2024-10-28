import { useEffect, useState } from "react";
const key="2f8c3b60";
export function useFetch(query){
    const [data,setData]= useState([]);
    const [isLoading,setIsLoading] = useState(false);
    useEffect(function(){
        async function fetchData(){
            try{
                setIsLoading(true);
                const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${query}`);
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