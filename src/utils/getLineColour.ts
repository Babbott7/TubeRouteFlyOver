import tfl_lines from '../../public/TubeData/line_colours.json'

export default function getLineColour(lineName: string) {
    return tfl_lines[lineName];
}