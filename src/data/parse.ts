import { Area, Coord, Orientation, Rover, move, rotate, RotateDirection, withinArea, Action } from "./area";

export const parseCoord = (coordDesc: string, area?: Area): [ Coord, string ] => {
    const parts = coordDesc.trim().split(' ');
    if (parts.length < 2) throw new Error('Coordinate should have two numbers');
    let coord: Coord;
    try {
        coord = { x: parseInt(parts[0]), y: parseInt(parts[1]) };
    } catch (err) {
        throw new Error('Coordinate elements should both be integer numbers');
    }
    if (area && !withinArea(area, coord)) throw new Error('Coordinate outside area');
    return [ coord, parts.slice(2).join(' ') ];
}

export const parseOrientation = (orientDesc: string) => {
    switch (orientDesc.trim()) {
        case 'N': return Orientation.N;
        case 'E': return Orientation.E;
        case 'S': return Orientation.S;
        case 'W': return Orientation.W;
        default: throw new Error(`Unrecognised orientation indicator: ${orientDesc}`);
    }
}

export const parseAction = (area: Area, actionDesc: string): Action => {
    switch (actionDesc.trim()) {
        case 'M': return (r: Rover) => move(area, r);
        case 'L': return (r: Rover) => rotate(r, RotateDirection.L);
        case 'R': return (r: Rover) => rotate(r, RotateDirection.R);
        default: throw new Error(`Unrecognised action indicator: ${actionDesc}`);
    }
}
