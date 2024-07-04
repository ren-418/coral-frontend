import React, {useState, useCallback} from 'react'
import './NewPost.scss'
import ClassicInput from '../../../../components/classic input/ClassicInput'
import DefaultPic from '../../../../imgs/global/default-pic.png'
import PopUp from '../../../../components/popup/PopUp'
import debounce from 'lodash/debounce';

function NewPost({}) {
    const [title, setTitle] = useState('')
    const [imageBlob, setImageBlob] = useState(DefaultPic)
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({});
    const [tags, setTags] = useState([])
    const [suggestTags, setSuggestTags] = useState([{name: 'Tomás Serra', type: 'investor'}])
    const [tagInput, setTagInput] = useState('')

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        image: ""
    });

    function setNewMessage(message, type){
        var newMessage = {}
        newMessage.text = message
        newMessage.type = type
        setMessage(newMessage);
      }

    const hasErrors = () => {
        const newErrors = {}
        if(title.trim() === ''){
            newErrors.title = 'Title is required'
        }
        if(description.trim() === ''){
            newErrors.description = 'Description is required'
        }
        if(imageUrl === ''){
            newErrors.image = 'Image is required'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length > 0
    }


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBlob(URL.createObjectURL(file));
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
      };

    const submit = () => {
        setLoading(true)
        if(hasErrors()){
            setLoading(false)
            return;
        }

        fetch('http://localhost:9090/api/v1/news/create-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description,
                image: imageUrl,
                tags: tags,
                sessionToken: localStorage.getItem('sessionToken')
            }),
        }).then((res) => {
            if(res.ok){
                setNewMessage('Post created successfully', 'success')
                setDescription('')
                setTitle('')
                setImageBlob(DefaultPic)
                setTags([])
                setSuggestTags([])
                setTagInput('')
            }else{
                setNewMessage('An error has occurred', 'error')
            }

            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setNewMessage('An error has occurred', 'error')
            setLoading(false)
        })
    }

    /*const fetchSuggestions = useCallback(debounce(async (query) => {
        try {
            const res = await fetch(`http://localhost:9090/api/v1/news/get-prefixes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: localStorage.getItem('sessionToken'),
                    prefix: query
                }),
            });

            const resJson = await res.json();

            if (res.ok) {
                setSuggestions(resJson.prefixesResult);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, 500), [tagInput]);*/

  return (
    <div className='new-post-page'>
        {Object.keys(message).length !== 0 && 
            <PopUp buttonText='Close' close={setMessage}>{message}</PopUp>
        }
        <h1>New Post</h1>
        <section className="title">
            <ClassicInput type="text" placeholder="New's title" onChange={setTitle} value={title} errorMessage={errors.title}>Title*</ClassicInput>
        </section>
        <section className='image'>
            <label>Image Post*</label>
            <div className={"image-container " + (errors.image ? "error" : "")} style={{backgroundImage: 'url('+imageBlob+')'}}></div>
            <input type="file" name="profile-pic" accept=".png,.jpeg,.jpg" onChange={handleImageChange}/>
            {errors.image && <p className='image-error'>{errors.image}</p>}
        </section>
        <section className='description'>
            <ClassicInput type="textarea" placeholder="Description" onChange={setDescription} value={description} errorMessage={errors.description}>Description*</ClassicInput>
        </section>
        <section className='tag-input'>
            <label>Tags (Optional)</label>
            <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder='Tag an enterprise or investor'/>
            {suggestTags.length !== 0 && tagInput !== "" && <div className="suggestions">
                <div className="suggestions-container">
                    {suggestTags.map((suggestion, index) => (
                        <p key={index} onClick={() => {
                            setTags([...tags, suggestion.name])
                            setTagInput('')
                            setSuggestTags([])
                        }}><b>{suggestion.name}</b> - {suggestion.type}</p>
                    ))}
                </div>
            </div>}
            {tags.length !== 0 &&
            <div className="tags">
                {tags.map((tag, index) => (
                    <div className="tag-button" key={index}>
                        <p key={index}>{tag}</p>
                        <button onClick={()=>{
                            setTags(tags.filter((tagFilter, indexFilter) => indexFilter !== index))
                        }}>x</button>
                    </div>
                ))}
            </div>}
        </section>
        <button className='submit' onClick={submit} disabled={loading}>Post</button>
    </div>
  )
}

export default NewPost