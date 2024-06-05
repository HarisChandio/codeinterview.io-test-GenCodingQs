import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import axios from "axios"
function Home({setQuestions}) {
    const navigate = useNavigate();
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('easy');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/generate", {
                topic,
                difficulty
            })
            console.log(res.data)
            setQuestions(res.data.questions);
            navigate('/questions')
        } catch (error) {
            console.error()
        }
    }
    return (
        <>
            <div>
                <header>
                    <h1>Generate Coding Questions</h1>
                    <p>From Arrays, Stack, Linked List etc</p>
                    <p>After submitting, wait for a few seconds</p>
                </header>
                <main>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label > Topic: <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} /></label>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="">Difficulty:
                                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </label>
                        </div>
                        <br />
                        <button type='submit'>Submit</button>
                    </form>
                </main>
            </div>
        </>
    )
}

export default Home;
