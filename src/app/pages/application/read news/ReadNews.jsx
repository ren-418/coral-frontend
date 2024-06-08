import React, {useEffect, useState} from 'react'
import DefaultPic from '../../../../imgs/global/default-pic.png'
import ProfilePic from '../../../../imgs/global/default-pp.png'
import './ReadNews.scss'
import NewsCard from '../../../../components/news card/NewsCard'

function ReadNews({setPage}) {
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
                setNews(resJson);
            }
        }catch(error){
        }
    }

    return (
        <div className='read-news-page'>
            <h1>Latest News</h1>
            <div className='news-cotainer'>
                {news.map((news, index) => (
                    <NewsCard key={index} title={news.title} description={news.description} image={news.image} date={news.date} enterprise={news.enterprise} setPage={setPage}/>
                ))}
                {news.length === 0 && <p>No news available</p>}
            </div>
        </div>
    )
}

export default ReadNews