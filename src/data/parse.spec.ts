import { parseCoord, parseOrientation, parseAction } from "./parse";
import { Orientation, Area } from "./area";

describe('parsing', () => {
    const area: Area = { nePoint: { x: 10, y: 10 }, rovers: [
        {
            position: { x: 5, y: 5 },
            orientation: Orientation.N
        }
    ] };
    it('parses correct coord', () => {
        const [ coord, rest ] = parseCoord('3 4 Z D', area);
        expect(coord.x).toBe(3);
        expect(coord.y).toBe(4);
        expect(rest).toBe('Z D');
    });
    it('throws bad coord', () => {
        expect(() => parseCoord('3 q', area)).toThrow();
        expect(() => parseCoord('12 10', area)).toThrow();
        expect(() => parseCoord('1', area)).toThrow();
    });
    it('parses correct orientation', () => {
        const orient = parseOrientation('E');
        expect(orient).toBe(Orientation.E);
    });
    it('throws bad orientation', () => {
        expect(() => parseOrientation('Q')).toThrow();
        expect(() => parseOrientation('')).toThrow();
    });
    it('parses correct action', () => {
        const newRover = parseAction(area, 'L')(area.rovers[0]);
        expect(newRover.orientation).toBe(Orientation.W);
    });
    it('throws bad action', () => {
        expect(() => parseAction(area, 'X')).toThrow();
        expect(() => parseAction(area, '')).toThrow();
    });
});