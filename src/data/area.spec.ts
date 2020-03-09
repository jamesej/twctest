import { move, Area, Orientation, rotate, RotateDirection, Rover, displayRover } from "./area";

describe('movement', () => {
    it('moves N', () => {
        const area: Area = { nePoint: { x: 5, y: 5 }, rovers: [
            {
                position: { x: 1, y: 1 },
                orientation: Orientation.N
            }
        ] };
        const newRover = move(area, area.rovers[0]);
        expect(newRover.position.x).toEqual(1);
        expect(newRover.position.y).toEqual(2);
        expect(newRover.orientation).toEqual(Orientation.N);
    });
    it('moves W', () => {
        const area: Area = { nePoint: { x: 5, y: 5 }, rovers: [
            {
                position: { x: 1, y: 1 },
                orientation: Orientation.W
            }
        ] };
        const newRover = move(area, area.rovers[0]);
        expect(newRover.position.x).toEqual(0);
        expect(newRover.position.y).toEqual(1);
        expect(newRover.orientation).toEqual(Orientation.W);
    });
    it('rotates', () => {
        const area: Area = { nePoint: { x: 5, y: 5 }, rovers: [
            {
                position: { x: 1, y: 1 },
                orientation: Orientation.W
            }
        ] };
        const newRover = rotate(area.rovers[0], RotateDirection.R);
        expect(newRover.position.x).toEqual(1);
        expect(newRover.position.y).toEqual(1);
        expect(newRover.orientation).toEqual(Orientation.N);
    });
    it('constrains', () => {
        const area: Area = { nePoint: { x: 5, y: 5 }, rovers: [
            {
                position: { x: 5, y: 1 },
                orientation: Orientation.E
            }
        ] };
        const newRover = move(area, area.rovers[0]);
        expect(newRover.position.x).toEqual(5);
        expect(newRover.position.y).toEqual(1);
        expect(newRover.orientation).toEqual(Orientation.E);
    });
    it('displays', () => {
        const rover: Rover = { position: { x: 1, y: 2 }, orientation: Orientation.N };
        const disp = displayRover(rover);
        expect(disp).toBe('1 2 N');
    });
});