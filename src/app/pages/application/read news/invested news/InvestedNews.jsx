import NewsCard from "../../../../../components/news card/NewsCard";
import React, {useEffect, useState} from "react";
import ReadNews from "../ReadNews";

function InvestedNews({setPage}) {
    const [news, setNews] = useState([])

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        try{
            const res = await fetch('http://localhost:9090/api/v1/news/get-news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: localStorage.getItem('sessionToken')
                }),
            });

            const resJson = await res.json();

            if(res.ok){
                console.log(resJson.posts)
                setNews(resJson.posts);
            }
        }catch(error){
        }
    }

    return(
        <div className='read-news-page'>
            <h1>Latest News From Your Investments</h1>
            <div className='news-cotainer'>
                {news.map((news, index) => (
                    <NewsCard key={index} title={news.title} description={news.description} image={news.image} date={news.date} enterpriseId={news.enterpriseUserId} enterpriseName={news.enterpriseName} enterpriseProfileImage={news.enterpriseProfileImage} setPage={setPage} tags={news.tags}/>
                ))}
                {news.length === 0 && <p>No news available</p>}
            </div>
        </div>
    )
}

export default InvestedNews