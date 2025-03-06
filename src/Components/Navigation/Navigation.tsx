
import { ChangeEvent, PropsWithRef } from "react";
import "./Navigation.css"

interface Props {
    handleAngleInput: (pitchInput: number) => void;
}

export default function Navigation({ handleAngleInput }: Props) {

    const onAngleInputChange = (e) => {
        console.log(e.target.valueAsNumber);
        const pitchAngle = e.target.valueAsNumber
        if (pitchAngle)
            handleAngleInput(pitchAngle);
    }

    return (
        <div className="Card">
            Test
            <div>
                <label>Pitch Control</label>
                <input
                    id="pitchInput"
                    type="number"
                    // value={45}
                    onChange={onAngleInputChange}
                />
            </div>
        </div>
    )
}