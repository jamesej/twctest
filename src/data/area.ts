export interface Area {
    nePoint: Coord;
    rovers: Rover[];
}

export enum Orientation {
    N = 0, E = 1, S = 2, W = 3
}

export enum RotateDirection {
    L = -1, R = 1
}

const offsetMap: Coord[] = [ { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1}, { x: -1, y: 0 } ];


export interface Rover {
    position: Coord;
    orientation: Orientation;
}

export interface Coord {
    x: number;
    y: number;
}

export type Action = (r: Rover) => Rover;

const addCoord = (a: Coord, b: Coord) => ({
    x: a.x + b.x,
    y: a.y + b.y
});

// TODO: Consider collisions
const constrainPosition = (area: Area, { x, y }: Coord): Coord => ({
        x: x < 0 ? 0 : (x > area.nePoint.x ? area.nePoint.x : x),
        y: y < 0 ? 0 : (y > area.nePoint.y ? area.nePoint.y : y)
    }
);

export const withinArea = ({ nePoint }: Area, { x, y }: Coord): boolean =>
    0 <= x && x <= nePoint.x && 0 <= y && y <= nePoint.y;

export const move = (area: Area, { position, orientation }: Rover): Rover => (
    {
        orientation,
        position: constrainPosition(area, addCoord(position, offsetMap[orientation]))
    }
);

export const rotate = ({ position, orientation }: Rover, direction: RotateDirection) => (
    {
        position,
        orientation: (orientation + direction + 4) % 4
    }
);

export const displayRover = (r: Rover) => `${r.position.x} ${r.position.y} ${Orientation[r.orientation]}`;