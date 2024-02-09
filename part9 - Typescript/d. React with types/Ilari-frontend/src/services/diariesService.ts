import axios from "axios";
import { Diary, NewDiary } from "../types/types";

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = () => axios.get<Diary[]>(baseUrl).then(response => response.data);

const createOne = (diary: NewDiary) => 
    axios.post<NewDiary>(baseUrl, diary)
    .then(response => response.data);

export default {
    getAll,
    createOne
};