import React, {useState, useEffect} from 'react'
import './Search.scss'
import SearchInvestors from './search investors/SearchInvestors'
import SearchEnterprises from './search enterprises/SearchEnterprises'
import routes from '../../../../data/routes.json'

function Search({setPage}) {
    const [searchType, setSearchType] = useState(0)

  return (
    <div className="search-page">
        <div className="search-type">
            <button onClick={() => setSearchType(0)} className='button' disabled={searchType===0}>Investors</button>
            <button onClick={() => setSearchType(1)} className='button' disabled={searchType===1}>Enterprises</button>
        </div>
        {searchType === 0 ? <SearchInvestors setPage={setPage}/> : <SearchEnterprises setPage={setPage}/>}
    </div>
  )
}

export default Search