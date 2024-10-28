import Search from "./Search"
export default function Header({query,setQuery}){
    return(
        <div className="header">
            <div style={{fontSize:'20px'}}><i class="fa-solid fa-clapperboard"></i></div>
            <Search query={query} setQuery={setQuery}/>
        </div>
    )
}