import { useEffect, useState} from 'react';
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import 'swiper/css';
import './home.scss'

import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';


const Home = () => {
     const apikey=import.meta.env.VITE_API_KEY;
     const [appMovie, setAppMovie]=useState([]);
     const [recommend, setRecommend]=useState([]);
     const [isLoading, setIsLoading]=useState(true)
     const [randomMovie, setRandomMovie] = useState(null)
     const [visibleMovies, setVisibleMovies]=useState(5)
     const [searchWord, setSearchWord] =useState('')




    const search = () => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=ko&query=${searchWord}`)
        .then((rs)=>{
            console.log(rs.data.results)
            setRecommend(rs.data.results)
            setSearchWord("")
        })
        .catch((err)=>{
            console.error("검색 중 오류 발생 : ", err)
        })
    }
    const handleKeyPress= (e) => {
        if(e.key === 'Enter') {
            search();
            setSearchWord("")
        }
    }

    const getMovies = async () => {
        try{
            const response= await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=ko) `)
            const res= await axios.get(`https://api.themoviedb.org/3/movie/550/recommendations?api_key=${apikey}&language=ko) `) /* 추천영화 */
            console.log(response)
            setAppMovie(response.data.results)
            setRecommend(res.data.results)
            const movies=response.data.results;
            if(movies.length > 0){
                const randomIndex=Math.floor(Math.random()*movies.length)
                setRandomMovie(movies[randomIndex])
            }
            setIsLoading(false)
        }catch(error){
            console.log(error)
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        getMovies()
    },[])
    return (
        <div className='home'>
            {
                isLoading ? (
                    <p className='loading'>로딩중...</p>
                ):(
                    <div className="upMovie">
                        { randomMovie && <img src={`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`}  alt="영화이미지"/>}
                        <div className="upMovieInfo">
                                <p className="title">제목 : {randomMovie.title}</p>
                                <p className="overview">개요 : {randomMovie.overview}</p>
                                <p className="release_date">개봉일 : {randomMovie.release_date}</p>
                                <p className="vote_average">평점 : {randomMovie.vote_average}</p>
                                <p className="vote_count">좋아요 : {randomMovie.vote_count}</p>
                        </div>
                    </div>
                )
            }



            <div className="upComing">
                <h2>상영작</h2>
                <div className="movieList">
                    {
                        isLoading ? (<p className='loading1'>로딩중...</p>) : (
                           

                                 <Swiper
                                    slidesPerView={2}
                                    spaceBetween={20}
                                    autoplay={{
                                        delay:0,
                                        disableOnInteraction:false,
                                    }}
                                    loop={true}
                                    speed={3000}
                                    pagination={{
                                    clickable: true,
                                    }}
                                    breakpoints={{
                                         
                                        780: {
                                            slidesPerView:3,
                                            spaceBetween: 10
                                            },
                                        1280: {
                                            slidesPerView: 4,
                                            spaceBetween: 5
                                            }
                                        }
                                    }
                                    modules={[Pagination, Autoplay]}
                                    className="mySwiper"
                                >
                                    {
                                         appMovie.map((movieItem) => (
                                             <SwiperSlide  key={movieItem.id}  className='movieItem'>
                                                <Link to="">
                                                <img src={`https://image.tmdb.org/t/p/w500${movieItem.poster_path}`}  />
                                                <p>{movieItem.title}</p>
                                                </Link>
                                             </SwiperSlide>
                                         ))
                                    }
                                                                     
                                </Swiper>
                                
                            )
                    }
                </div>
            </div>
            <div className="recommend">
                <h2>추천영화</h2>
                <div className="search">
                    <div className="searchBox">
                        <input type="search" placeholder='영화 제목을 입력해주세요' value={searchWord} onChange={(e)=>{setSearchWord(e.target.value)}} onKeyDown={handleKeyPress} />
                        <button className="searchBtn" onClick={search}>< CiSearch /></button>
                    </div>
                </div>
                <div className="recommendList">
                    {
                        isLoading? (<p className='loading1'>로딩중</p>) : (
                            recommend.slice(0, visibleMovies).map((rec) =>(
                                <div key={rec.id} className='recommendImg'>
                                   <Link to={`/recommendDetail/${rec.id}`}>
                                         <img src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`} alt={rec.title} />
                                   </Link>
                                </div>
                            ))
                        )
                    }
                </div>
                {
                    recommend.length > visibleMovies && (
                        <div className='more'>
                            <button onClick={()=>{setVisibleMovies(visibleMovies+5)}}>더보기</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Home;