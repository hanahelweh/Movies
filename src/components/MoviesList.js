export default function MoviesList({movie,setCurrent}){
    return(
        <div className="list" onClick={()=>setCurrent(movie.imdbID)}>
            <div className="img movies-list-img" style={{backgroundImage:`url(${movie.Poster})`}}></div>
            <div>
                <div className="title">{movie.Title}</div>
                <div className="second">{movie.Year}</div>
            </div>
        </div>
    )
}