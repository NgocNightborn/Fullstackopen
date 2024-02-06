import { CoursePart } from "../../App";
import Part from "../Part/Part";

interface ContentProps {
    part: CoursePart
}

const Content = (props: ContentProps) => {
    return (
        <p>
            <Part part={props.part} />
        </p>
    )
};

export default Content;