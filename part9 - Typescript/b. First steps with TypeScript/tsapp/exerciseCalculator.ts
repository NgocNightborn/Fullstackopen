import { isNotNumber } from "./utils";

interface Training {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExercisesValues {
    target: number,
    exercises: number[]
}

const parseExercises = (args: string[]): ExercisesValues => {
    const ret = [];
    for (let i = 2; i < args.length; i++) {
        if (isNotNumber(args[i])) throw new Error('Provided values were not numbers');
        if (i === 2) continue;
        ret.push(Number(args[i]));
    }
    return {
        target: Number(args[2]),
        exercises: ret
    };
};

const calculateExercises = (dailyExercises:number[], target:number): Training => {
    const average = dailyExercises.reduce((accumulator, currentValue) => accumulator + currentValue, 0)/dailyExercises.length;
    
    const ratio = average/target;

    const rating = {
        number: 0,
        description: ''
    };
    if (ratio >= 1) {
        rating.number = 3;
        rating.description = 'Excellent, you reached the target';
    } else if (ratio >= 0.9) {
        rating.number = 2;
        rating.description = 'not too bad but could be better';
    } else {
        rating.number = 1;
        rating.description = 'Insuffient training, work harder!';
    }

    return {
        periodLength: dailyExercises.length,
        trainingDays: dailyExercises.filter(hours => hours !== 0).length,
        success: average > target ? true : false,
        rating: rating.number,
        ratingDescription: rating.description,
        target,
        average
    };
};

try {
    const { target, exercises } = parseExercises(process.argv);
    console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
}

export default calculateExercises;