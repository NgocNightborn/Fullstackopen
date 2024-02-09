import { Diary } from "../../../types/types";

export interface NewDiaryProps {
    diaries: Diary[],
    setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}