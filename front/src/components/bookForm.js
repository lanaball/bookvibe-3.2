import { useState } from 'react'
import './bookForm.scss'
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const BookForm = () => { 
    // const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [rating, setRating] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault()

        console.log("submit")
        const book = { title, author, rating, description }
        
        const response = await fetch('/', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            // this will reset the input to empty to add another
            setTitle('')
            setAuthor('')
            setDescription('')
            setRating('')
             setEmptyFields([])
            setError(null)
            //  dispatch({type:'CREATE_WORKOUT', payload: json})
            // console.log("new workout added")
        }
     }
    
    return (
        <form className='create' onSubmit={handleSubmit}>

            <h2>Add New Book</h2>

            <label> Book Title </label>
            <input
                type="text"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
                 className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label> Book Author </label>
            <input
                type="text"
                 onChange={(event) => setAuthor(event.target.value)}
                value={author}
                className={emptyFields.includes('title') ? 'error' : ''}/>

            <label> Rating </label>
            <input
                type="text"
                 onChange={(event) => setRating(event.target.value)}
                value={rating}
                className={emptyFields.includes('title') ? 'error' : ''}/>

            <label> Description </label>
            <input
                type="text"
                 onChange={(event) => setDescription(event.target.value)}
                value={description}
                className={emptyFields.includes('title') ? 'error' : ''}/>

            <button>Add</button>
             {error && <div className="error">{ error }</div> }

        </form>
    )
}


export default BookForm;