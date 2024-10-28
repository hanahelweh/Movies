import { useState } from "react"

export default function Rating({
  color="blue",
  size=24,
  maxRate=5,
  onSetRating
}){
  const [rating,setRating]=useState(0);
  const [tempRating,setTempRating]=useState(0);
  function handleRating(i){
    setRating(i);
    onSetRating(i)
  }
  return(
    <>
    {Array.from({length:maxRate},(_,i)=>i+1).map((i)=>(
      <Star size={size} color={color} key={i} full={tempRating ? tempRating >=i : rating >= i} handleRating={()=>handleRating(i)} handleMouseEnter={()=>setTempRating(i)} handleMouseLeave={()=>setTempRating(0)}/>
    ))}
    </>
  )
}

function Star({full,handleRating,handleMouseEnter,handleMouseLeave,color,size}){
  return(
    <>
    {full ? (
      <span style={{cursor:"pointer"}} onClick={handleRating} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={color}
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15 10 22 10 17 14 19 22 12 18 5 22 7 14 2 10 9 10 12 2" />
          </svg>
        </span>
          ):(
            <span style={{cursor:"pointer"}} onClick={handleRating} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={size}
                height={size}
                fill="none"
                stroke={color}
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="12 2 15 10 22 10 17 14 19 22 12 18 5 22 7 14 2 10 9 10 12 2" />
              </svg>
            </span>
        )
      }
    </>
  )
}