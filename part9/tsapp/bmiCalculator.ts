import { isNotNumber } from "./utils";

interface BodyValues {
    height: number;
    weight: number;
}
const parseBody = (args: string[]): BodyValues => {
    if (args.length > 4) throw new Error('Too many arguments');
    if (args.length < 4) throw new Error('Too few arguments');

    console.log(isNotNumber(args[2]), args[3]);
    if (isNotNumber(args[2]) || isNotNumber(args[3])) throw new Error('Provided values were not numbers!');

    return {
        height: Number(args[2]),
        weight: Number(args[3])
    };
};

const calculateBmi = (height:number, weight:number): string => {
    const bmi = weight/((height/100) ** 2);

    switch (true) {
        case (bmi<=18.4):
            return 'Underweight';
        case (bmi >= 18.5 && bmi <= 24.9):
            return 'Normal';
        default:
            return 'Overweight';
    }
};

try {
    const { height, weight } = parseBody(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
}

export default calculateBmi;