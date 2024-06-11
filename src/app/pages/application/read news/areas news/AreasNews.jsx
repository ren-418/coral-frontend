import React, {useEffect, useState} from "react";
import NewsCard from "../../../../../components/news card/NewsCard";

function AreasNews({setPage}) {
    const [news, setNews] = useState([])

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        try{
            const res = await fetch('http://localhost:9090/api/v1/news/get-news-areas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: localStorage.getItem('sessionToken')
                }),
            });

            const resJson = await res.json();
            console.log(resJson)

            if(res.ok){
                setNews(resJson.posts);
            }
        }catch(error){
        }
    }

    return(
        <div className='read-news-page'>
            <h1>News with your areas of interest</h1>
            <div className='news-cotainer'>
                {news.map((news, index) => (
                    <NewsCard key={index} title={news.title} description={news.description} image={news.image} date={news.date} enterpriseId={news.enterpriseId} enterpriseName={news.enterpriseName} enterpriseProfileImage={news.enterpriseProfileImage} setPage={setPage}/>
                ))}
                {news.length === 0 && <p>No news available</p>}
            </div>
        </div>
    )
}

export default AreasNews