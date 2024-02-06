import { CoursePart } from "../../App"
import assertNever from "../../utils"
import './part.css'

interface PartProps {
    part: CoursePart
}

const Part = (props: PartProps): JSX.Element => {
    switch (props.part.kind) {
        case "basic":
            return (
                <div>
                    <h3>{props.part.name} {props.part.exerciseCount}</h3>
                    <p>{props.part.description}</p>
                </div>
            )
        case "group":
            return (
                <div>
                    <h3>{props.part.name} {props.part.exerciseCount}</h3>
                    <p>project exercise {props.part.groupProjectCount}</p>
                </div>
            )
        case "background":
            return (
                <div>
                    <h3>{props.part.name} {props.part.exerciseCount}</h3>
                    <p>{props.part.description}</p>
                    <p>submit to {props.part.backgroundMaterial}</p>
                </div>
            )
        case "special": {

            return (
                <div>
                    <h3>{props.part.name} {props.part.exerciseCount}</h3>
                    <p>{props.part.description}</p>
                    <p>required skills: {props.part.requirements.join(', ')}</p>
                </div>
            )
        }
            
        default:
            return assertNever(props.part)
    }
}

export default Part