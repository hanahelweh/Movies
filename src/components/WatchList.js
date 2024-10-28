export default function WatchList({watchList,setWatchList}){
    const totalDuration=watchList.reduce((acc,watch)=>acc+watch.Runtime.split[" "[0]],0);
    const number = watchList.length;
    function handleRemoveFromWatchList(id){
        setWatchList(watchList.filter((watch)=>watch.imdbID !== id))
    }
    return(<>
        <div className="rating" style={{width:'100%'}}>
            <div className="title" style={{marginBottom:'10px'}}>List of movies you want to watch:</div>
            <div className="flex">
                <div className="second"><i style={{color:'rgb(49, 68, 189)',marginRight:'5px'}} class="fa-solid fa-video"></i> Total of {number}</div>
                <div style={{fontSize:'13px'}}><i class="fa-solid fa-hourglass-end" style={{color:'rgb(115, 107, 107)',marginRight:'5px'}}></i>{totalDuration} min</div>
            </div>
        </div>
        {watchList.map((watch)=>
        <div className="list" key={watch.imdbID}>
                <div className="btn" onClick={()=>handleRemoveFromWatchList(watch.imdbID)} style={{position:'absolute',right:'10px'}}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className="img watchList-movie-img" style={{backgroundImage:`URL(${watch.Poster})`}}></div>
                <div className="movie-details">
                    <div className="title" style={{marginBottom:'7px'}}>{watch.Title}</div>
                    <div className="flex">
                        <div className="second"><i style={{color:'orange', marginRight:'5px'}} className="fa-solid fa-star"></i>{watch.imdbRating}</div>
                        {watch.rating > 0 && <div className="second"><i style={{color:'orange', marginRight:'5px'}} className="fa-solid fa-star"></i>{watch.rating}</div>}
                        <div className="second"><i className="fa-solid fa-hourglass-end" style={{color:'rgb(115, 107, 107)' ,marginRight:'5px'}}></i>{watch.Runtime}</div>
                    </div>
                </div>
            </div>)}
    </>)
}