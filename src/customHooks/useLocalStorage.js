import { useEffect, useState } from 'react';

export function useLocalStorage(key){
    const [data,setData]=useState(function(){
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : [];
      })
    useEffect(function(){
        localStorage.setItem("movie",JSON.stringify(data));
    },[data]);

    return [data,setData]

}