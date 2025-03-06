import tfl_lines from '../../public/TubeData/tfl_lines.json'

export default function parseTubeLineData() {
    const data = tfl_lines.features;

    const filteredData = data.filter((tubeDrawLine) => {
        if (tubeDrawLine.properties.lines[0].name === "Victoria")
            return true;
        return false
    })

    const toDisplay = filteredData.map((tubeDrawLine) => {
            return tubeDrawLine.geometry.coordinates;
    })
    
    console.log(toDisplay);
    return toDisplay.flat();
}