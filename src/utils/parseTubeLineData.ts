import tfl_lines from '../../public/TubeData/tfl_lines.json'

interface ILineForDisplay {
    name: string,
    data: number[][]
}

export default function parseTubeLineData() {
    const data = tfl_lines.features;
    const toDisplay2: ILineForDisplay[] = []

    data.forEach((subLine) => {
        const subLineName = subLine.properties.lines[0].name

        if (!toDisplay2.some((tubeLine) => tubeLine.name === subLineName))
            toDisplay2.push({"name": subLineName, "data": subLine.geometry.coordinates})
        else {
            toDisplay2.forEach((tubeLine) => {
                if (tubeLine.name === subLineName) {
                    tubeLine.data = tubeLine.data.concat(subLine.geometry.coordinates);
                }
            });
        }

    });

    console.log("toDisplay2", toDisplay2);

    return toDisplay2;

    // const toDisplayFlat2 = toDisplay2.map((tubeLine) => {
    //     const flatCoordinates = tubeLine.data.flat();
    //     tubeLine.data = flatCoordinates;


        
    // });
    

    const filteredData = data.filter((tubeDrawLine) => {
        if (tubeDrawLine.properties.lines[0].name === "Victoria")
            return true;
        return false
    })

    const toDisplay = filteredData.map((tubeDrawLine) => {
            return tubeDrawLine.geometry.coordinates;
    })
    
    const toDisplayFlat = toDisplay.flat()

    const obj = [{
        "name": 'Victoria',
        "data": toDisplayFlat
    }]
    
    console.log("obj", obj);
    
    return obj;
}