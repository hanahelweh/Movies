import { useState,useEffect } from "react";
export function useLocalStorage(initial,key){

    const [data,setData]=useState(function(){
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : initial
      });

      useEffect(function(){
        localStorage.setItem(key,JSON.stringify(data))
      },[data,key]);
      
      return [data,setData]
}