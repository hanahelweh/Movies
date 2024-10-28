import Search from "./Search"
export default function Header({query,setQuery}){
    return(
        <div className="header">
            <div>logo</div>
            <Search query={query} setQuery={setQuery}/>
        </div>
    )
}