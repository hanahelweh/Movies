function Movies({movie,setCurrent}) {
    return (
      <div onClick={()=>setCurrent(movie.imdbID)} className="list">
        <div className="img movies-list-img" style={{backgroundImage:`URL(${movie.Poster})`}}></div>
        <div>
            <div className="title">{movie.Title}</div>
            <div className="second">{movie.Year}</div>
        </div>
      </div>
    );
  }
  
  export default Movies;
  