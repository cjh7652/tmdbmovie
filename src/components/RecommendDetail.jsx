import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './recommendDetail.scss'

const RecommendDetail = () => {
    const {id} =useParams();
    const navigate=useNavigate(); //뒤로가기 버튼을 위한 훅

    const [movie, setMovie]=useState(null);
    const [isLoading, setIsLoading]=useState(true)

    const apikey=import.meta.env.VITE_API_KEY;

    const getMovieDetail = async () => {
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=ko`)
            setMovie(response.data)
            console.log(response.data)
            setIsLoading(false)
        }catch(error){
            console.error("상세 정보를 불러오는 중 오류 발생:", error);
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        getMovieDetail()
    }, [id])

    if (isLoading) {
        return (
            <div className='loading'>상세 정보 로딩 중....</div>
        )
    }
    if (!movie) {
        return (
            <div className='error'>영화정보를 찾을수 없습니다.</div>
        )
    }

    return (
        <div className='recommendDetail'>
            <h2>추천영화 상세 내용</h2>

            <div className="detailContent">
                <div className="detailPoster">
                    {
                        movie.poster_path ? (<img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title}/>) : (
                            <div className='noImage'>이미지 없음</div>
                        )
                    }
                </div>
                <div className="detailInfo">
                    <button className="backBtn" onClick={() => navigate(-1)}>뒤로가기</button>
                     <h1 className='title'>{movie.title}</h1>
                     {movie.tagline && <p className='tagline'>"{movie.tagline}"</p>}
                     <p className="overview"><strong>줄거리:</strong>{movie.overview || "등록된 줄거리가 없습니다."}</p>
                     <div className="mataGrid">
                        <p><strong>개봉일 :</strong>{movie.release_date}</p>
                        <p><strong>평점 :</strong>❤️{movie.vote_average}</p>
                        <p><strong>상영시간 :</strong>{movie.runtime}</p>
                        <p><strong>장르 :</strong>{movie.genres.map(g => g.name).join(', ')}</p>
                     </div>
                </div>
               
            </div>
        </div>
    );
};

export default RecommendDetail;