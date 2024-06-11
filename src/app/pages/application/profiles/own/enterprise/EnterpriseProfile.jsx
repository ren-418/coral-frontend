import React, { useEffect, useState } from 'react'
import './EnterpriseProfile.scss'
import ProfileImage from '../../../../../../imgs/global/default-pp.png'
import ProgressBar from '@ramonak/react-progress-bar'
import { FaLocationDot } from 'react-icons/fa6';
import InvestorCard from '../../../../../../components/investor card/InvestorCard'
import HorizontalSlider from '../../../../../../components/horizontal slider/HorizontalSlider';
import { FaUserEdit } from "react-icons/fa";

import DefaultPic from '../../../../../../imgs/global/default-pic.png'
import NewsOwnCard from '../../../../../../components/news own card/NewsOwnCard';

import ClassicInput from '../../../../../../components/classic input/ClassicInput';

function EnterpriseProfile({edit, logout, deleteUser, setPage}) {

    const [editNew, setEditNew] = useState(-1)

    const [titleNewEdit, setNewTitleEdit] = useState('')

    const [newEditId, setNewEditId] = useState('')

    const [enterpriseData, setEnterpriseData] = useState({
        profileImage: "",
        name: "",
        location: "",
        description: "",
        goal: 0,
        current: "",
        minimumInvestment: "",
        areas: [],
        investors: [],
        totalCollected: 0,
        enterpriseType: ""
    })

    const [news, setNews] = useState([])

    useEffect(() => {
        fetchEnterpriseData()
        fetchNews()
    }, [])

    const fetchEnterpriseData = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/v1/auth/check-user', {
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
                console.log(resJson)
                setEnterpriseData(resJson);
            }
            else{
            }
        } catch (error) {
        }
    }

    const fetchNews = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/v1/news/get-own', {
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
                console.log(resJson)
                setNews(resJson);
            }
            else{
                setNews([]);
            }
        } catch (error) {
        }
    }

    const editNewFunction = (index, id) => {
        setNewTitleEdit(news[index].title)
        setDescription(news[index].description)
        setImageBlob(news[index].image)
        setImageURL(news[index].image)
        setNewEditId(id)
        setEditNew(index)
    }

    const [imageBlob, setImageBlob] = useState(DefaultPic)
    const [imageURL, setImageURL] = useState('')

    const [description, setDescription] = useState('')

    const [errors, setErrors] = useState({
        title: '',
        image: '',
        description: ''
    })

    const [loading, setLoading] = useState(false)

    const hasErrors = () => {
        const newErrors = {}
        if(titleNewEdit.trim() === ''){
            newErrors.title = 'Title is required'
        }
        if(description.trim() === ''){
            newErrors.description = 'Description is required'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length > 0
    }

    const editPostSubmit = async () => {
        setLoading(true)
        
        if(!hasErrors()){
            try {
                const res = await fetch('http://localhost:9090/api/v1/news/edit-post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sessionToken: localStorage.getItem('sessionToken'),
                        title: titleNewEdit,
                        description: description,
                        image: imageURL,
                        postId: newEditId
                    }),
                });
    
                const resText = await res.text();
    
                if(res.ok){
                    fetchNews()
                    setEditNew(-1)
                    setNewTitleEdit('')
                    setDescription('')
                    setImageBlob(DefaultPic)
                    setNewEditId('')
                    closeEditNew()
                }
                else{
                }
            } catch (error) {
            }
        }
        setLoading(false)
    }

    const closeEditNew = () => {
        setEditNew(-1)
        setNewEditId('')
        setEditNew(-1)
        setNewTitleEdit('')
        setDescription('')
        setImageBlob(DefaultPic)
        setNewEditId('')
        setErrors({})
    }

    const deletePost = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/v1/news/delete-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: localStorage.getItem('sessionToken'),
                    postId: newEditId
                }),
            });

            if(res.ok){
                fetchNews()
                setEditNew(-1)
                setNewTitleEdit('')
                setDescription('')
                setImageBlob(DefaultPic)
                setNewEditId('')
                closeEditNew()
            }
            else{
            }
        } catch (error) {
        }
    }



  return (
    <div className='enterprise-profile-page'>
        {editNew !== -1 && 
        <div className='edit-new-bg'>
            <div className='edit-new-container'>
                <button className='close-btn' onClick={closeEditNew}>Close</button>
                <button className='delete-post-btn' onClick={deletePost}>Delete post</button>
                <h1>Edit Post</h1>
                <section className="title">
                    <ClassicInput type="text" placeholder="New's title" onChange={setNewTitleEdit} value={titleNewEdit} errorMessage={errors.title}></ClassicInput>
                </section>
                <section className='description'>
                    <ClassicInput type="textarea" placeholder="Description" onChange={setDescription} value={description} errorMessage={errors.description}></ClassicInput>
                </section>
                <button className='submit' onClick={editPostSubmit} disabled={loading}>Edit Post</button>
            </div>
        </div>
        }
        <div className="banner">
            <button className='edit-btn' onClick={edit}><FaUserEdit/></button>
            <button className='logout-btn' onClick={logout}>Logout</button>
            <div className='container'>
                <img src={enterpriseData.profileImage !== "" ? enterpriseData.profileImage : ProfileImage} className='profile-picture' alt="profile picture enterprise"/>
            </div>
        </div>
        <div className='enterprise-data'>
            <h1>{enterpriseData.name}</h1>
            <div className='location'>
                <FaLocationDot color='rgba(0, 0, 0, 0.548)'/>
                <h6>{enterpriseData.location.charAt(0).toUpperCase() + enterpriseData.location.slice(1)}</h6>
            </div>
            <div className="areas">
                {enterpriseData.areas.map((area, index) => (
                  <div key={index} className='area'>{area}</div>
                ))}
            </div>
           {enterpriseData.enterpriseType == "Community" && <div className='progress-bar'>
                <ProgressBar completed={Math.round((enterpriseData.totalCollected/enterpriseData.goal)*100)} bgColor="#ED4E67" width={'100%'}/>
                <div className='numbers'>
                    <p>US$ 0</p>
                    <p>US$ {enterpriseData.goal}</p>
                </div>
            </div>}
            <h4>Description</h4>
            <div className="enterprise-description">
                <p>{enterpriseData.description}</p>
            </div>
            {(enterpriseData.investors.length !== 0 && enterpriseData.investors !== null) && <h4>My Investors</h4>}
                <HorizontalSlider>
                    {enterpriseData.investors.map((investor, index) => (
                        <div className="card" key={index}>
                            <InvestorCard key={index} investorData={investor} setPage={setPage}/>
                        </div>
                    ))}
                </HorizontalSlider>
            {(news.length !== 0 && news !== null) && <h4>My News</h4>}
                <HorizontalSlider>
                    {news.map((news, index) => (
                        <div className="card" key={index}>
                            <NewsOwnCard key={index} title={news.title} image={news.image} description={news.description} date={news.date} editNew={() => {editNewFunction(index, news.id)}}/>
                        </div>
                    ))}
                </HorizontalSlider>
        </div>
        <button className="delete-btn" onClick={deleteUser}>Delete Account</button>
    </div>
      )
}

export default EnterpriseProfile