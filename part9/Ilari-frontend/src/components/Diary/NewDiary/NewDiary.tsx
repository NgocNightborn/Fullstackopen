import { useState } from "react";
import diariesService from "../../../services/diariesService";
import { NewDiaryProps } from "./types";
import { Visibility, Weather } from "../../../types/types";
import axios from "axios";

const NewDiary = ({diaries, setDiaries}: NewDiaryProps): JSX.Element => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const diaryToAdd = {
            date,
            comment,
            visibility: visibility as Visibility,
            weather: weather as Weather 
        };
        diariesService
            .createOne(diaryToAdd)
            .then(() => {
                setDiaries(diaries.concat({...diaryToAdd, id: diaries.length + 1}));
                setDate('');
                setVisibility('');
                setWeather('');
                setComment('');
            })
            .catch((e: unknown) => {
                if (axios.isAxiosError(e)) {
                    setError(e?.response?.data);
                    setTimeout(() => {
                        setError('');
                    }, 5000);
                } else {
                    throw new Error('Something went wrong');
                }
            });
        
    };

    return (
        <div>
            <h2>Add new entry</h2>
            {error && <p style={{color: 'red'}} >{error}</p>}
            <form onSubmit={diaryCreation}>
                <div>
                    date: 
                    <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                </div>
                <div>
                    visibility: 
                    great
                    <input type="radio" name="visibilityFilter" value={visibility} onChange={() => setVisibility('great')} />
                    good
                    <input type="radio" name="visibilityFilter" value={visibility} onChange={() => setVisibility('good')} />
                    ok
                    <input type="radio" name="visibilityFilter" value={visibility} onChange={() => setVisibility('ok')} />
                    poor
                    <input type="radio" name="visibilityFilter" value={visibility} onChange={() => setVisibility('poor')} />
                </div>
                <div>
                    weather: 
                    sunny
                    <input type="radio" name="weatherFilter" value={weather} onChange={() => setWeather('sunny')} />
                    rainy
                    <input type="radio" name="weatherFilter" value={weather} onChange={() => setWeather('rainy')} />
                    cloudy
                    <input type="radio" name="weatherFilter" value={weather} onChange={() => setWeather('cloudy')} />
                    stormy
                    <input type="radio" name="weatherFilter" value={weather} onChange={() => setWeather('stormy')} />
                    windy
                    <input type="radio" name="weatherFilter" value={weather} onChange={() => setWeather('windy')} />
                </div>
                <div>
                    comment: 
                    <input value={comment} onChange={(event) => setComment(event.target.value)}/>
                </div>
                
                <button type='submit'>add</button>
            </form>
        </div>
        
    );
};

export default NewDiary;