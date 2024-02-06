import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
import Total from "./components/Total/Total";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      {courseParts.map(coursePart => {
        return <Content key={coursePart.name} name={coursePart.name} exerciseCount={coursePart.exerciseCount} />
      })}
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;