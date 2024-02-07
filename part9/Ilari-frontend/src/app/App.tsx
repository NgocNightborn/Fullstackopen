import { useEffect, useState } from "react";
import { Diary } from "../types/types";
import diariesService from "../services/diariesService";
import DiaryList from "../components/Diary/DiaryList/DiaryList";
import NewDiary from "../components/Diary/NewDiary/NewDiary";


function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    diariesService.getAll().then((response) => setDiaries(response));
  }, []);

  return (
    <>
      <NewDiary diaries={diaries} setDiaries={setDiaries} />
      <DiaryList data={diaries} />
    </>
  );
}

export default App;
