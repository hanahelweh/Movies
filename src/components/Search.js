export default function Search({query,setQuery}){
    return(
        <div className="search">
            <input onChange={(e)=>setQuery(e.target.value)} type="text" value={query} placeholder="Search For Your Movie"/>
        </div>
    )
}