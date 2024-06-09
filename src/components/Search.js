function Search({setQuery}) {
  return (
    <div className="search">
        <input onChange={(e)=>setQuery(e.target.value)} type="text" placeholder="Search.."/>
    </div>
  );
}

export default Search;
