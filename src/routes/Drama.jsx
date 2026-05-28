import {useEffect, useState} from 'react';
import axios from 'axios'
import './drama.scss'

const Drama = () => {
    const apikey=import.meta.env.VITE_API_KEY;
    const [isLoading, setIsLoading]=useState(true)
    const [drama, setDrama]=useState([])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apikey}&language=ko-KR`)
        .then(res => {
            console.log(res.data.results)
            setDrama(res.data.results)
            setIsLoading(false)
        })
        .catch(err => {
            console.error(err)
            setIsLoading(false)
        })
    },[])
    return (
        <div className='drama'>
            <h2>드라마</h2>
            {
                isLoading ? (<p className='loading'>로딩중....</p>): (
                <div className='dramaItems'>
                    {
                        drama.map((item) => (
                            <div className='dramaItem' key={item.id}>
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
                            </div>
                        ))
                    }
                </div>
            )
            }
        </div>
    );
};

export default Drama;