import React, {useEffect, useState} from 'react'
import DefaultPic from '../../../../imgs/global/default-pic.png'
import ProfilePic from '../../../../imgs/global/default-pp.png'
import './ReadNews.scss'
import NewsCard from '../../../../components/news card/NewsCard'
import InvestedNews from "../read news/invested news/InvestedNews";
import AreasNews from "../read news/areas news/AreasNews";
import LocationNews from "./location news/LocationNews";

function ReadNews({setPage}) {
    const [searchType, setSearchType] = useState(0)

    return (
        <div className="search-page">
            <div className="search-type">
                <button onClick={() => setSearchType(0)} className='button' disabled={searchType === 0}>Investment
                    News
                </button>
                <button onClick={() => setSearchType(1)} className='button' disabled={searchType === 1}>Areas of Interest
                </button>
                <button onClick={() => setSearchType(2)} className='button' disabled={searchType === 2}>Location
                </button>
            </div>
            {searchType === 0 ? <InvestedNews setPage={setPage}/> : searchType === 1 ? <AreasNews setPage={setPage}/> : <LocationNews setPage={setPage}/>}
        </div>
    )
}

export default ReadNews