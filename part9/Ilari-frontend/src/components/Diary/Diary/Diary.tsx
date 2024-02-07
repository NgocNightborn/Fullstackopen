import { DiaryProps } from "./types";

const Diary = ({diary}: DiaryProps) => {
    return (
        <div>
            <h3>{diary.date}</h3>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
            <p>comment: {diary.comment}</p>
        </div>
    );
};

export default Diary;