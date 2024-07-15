import NewsCard from "../../../../../components/news card/NewsCard";
import React, {useEffect, useState} from "react";
import ReadNews from "../ReadNews";

function InvestedNews({setPage}) {
    const [news, setNews] = useState([])
    const [visibleItems, setVisibleItems] = useState([]);
    const [loadMore, setLoadMore] = useState(3); // Número de elementos a cargar inicialmente
    const [message, setMessage] = useState('Loading news...')

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
                setNews(resJson.posts);
                setVisibleItems(resJson.posts.slice(0, loadMore));
                if(resJson.posts.length === 0){
                    setMessage('No news available')
                }
            }
            else{
                setMessage('No news available')
            }
        }catch(error){
            setMessage('No news available')
        }
    }

  useEffect(() => {
      setVisibleItems(news.slice(0, loadMore));
  }, [loadMore]);

  const handleLoadMore = () => {
    setLoadMore(loadMore + 3); // Incrementa el número de elementos visibles en 5
  };

    return(
        <div className='read-news-page'>
            <h1>Latest News From Your Investments</h1>
            <div className='news-cotainer'>
                {visibleItems.map((news, index) => (
                    <NewsCard key={index} title={news.title} description={news.description} image={news.image} date={news.date} enterpriseId={news.enterpriseUserId} enterpriseName={news.enterpriseName} enterpriseProfileImage={news.enterpriseProfileImage} setPage={setPage} tags={news.tags}/>
                ))}
                {news.length === 0 && <p>{message}</p>}
            </div>
            {visibleItems.length < news.length && (
                <button className='load-button' onClick={handleLoadMore}>Load more</button>
            )}
        </div>
    )
}

export default InvestedNews