import axios from 'axios'
import {useEffect, useState} from 'react'
import "./posts.css"

function Posts() {
    const [posts, setPosts] = useState([])
    const [searchPost, setSearchPost] = useState('car')
    const [perPage, setPerPage] = useState(9)

    useEffect(() => {
        async function getData(){
            const response = await axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=499146244dbd2c1ee8d30d765cd35d75&text='+searchPost+'&format=json&nojsoncallback=1&per_page='+perPage)
            setPosts(response.data.photos.photo)
            console.log(response.data.photos.photo)
        }
        getData()
    }, [searchPost, perPage]);

    const searchKeyword = (e) => {
        setSearchPost(e.target.value)
    }

    const selectPerPage = (e) => {
        setPerPage(e.target.value)
    }

  return (
    <>
        <h1 className="text-center text-uppercase mt-3 mb-5">Gallery</h1>

        <form className="row justify-content-center mb-4">
            <input className="form-control w-25 m-1" type="search" name="keyword" id="keyword" onChange={searchKeyword}/>
            <input className="form-control w-25 m-1" type="number" name="perPage" id="perPage" onChange={selectPerPage}/>
        </form> 
        
        <div className="d-flex row justify-content-evenly">
            {posts.map((post) =>
                <div className="card m-2 col-4 col-md-3 text-center" key={post.id}>
                    <img className="card-img-top mt-2" src={"https://farm"+post.farm+".staticflickr.com/"+post.server+"/"+post.id+"_"+post.secret+".jpg"} alt={post.image}/>

                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                    </div>
                </div>
            )}
        </div>
    </>
  )
}

export default Posts