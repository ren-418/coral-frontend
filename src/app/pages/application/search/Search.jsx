import React, {useState, useEffect} from 'react'
import './Search.scss'
import SearchInvestors from './search investors/SearchInvestors'
import SearchEnterprises from './search enterprises/SearchEnterprises'

function Search({setEnterpriseId, setPage}) {
    const [searchType, setSearchType] = useState(0)
  return (
    <div className="search-page">
        <div className="search-type">
            <button onClick={() => setSearchType(0)} className='button' disabled={searchType===0}>Investors</button>
            <button onClick={() => setSearchType(1)} className='button' disabled={searchType===1}>Enterprises</button>
        </div>
        {searchType === 0 ? <SearchInvestors setEnterpriseId={setEnterpriseId} setPage={setPage}/> : <SearchEnterprises setEnterpriseId={setEnterpriseId} setPage={setPage}/>}
    </div>
  )
}

export default Search