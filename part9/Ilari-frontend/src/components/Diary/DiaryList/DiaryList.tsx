import Diary from "../Diary/Diary";
import { DiaryListProps } from "./types";

const DiaryList = ({ data }: DiaryListProps ): JSX.Element  => {
    if (data.length === 0) return <p>No data</p>;
    return (
        <div>
            <h2>Diary entries</h2>
            {data.map(diary => {
                return <Diary key={diary.id} diary={diary} />;
            })}
        </div>
        
    );
};

export default DiaryList;