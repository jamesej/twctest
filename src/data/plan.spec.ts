import { parsePlan, executePlan } from "./plan";
import { Orientation } from "./area";

describe('plan', () => {
    const desc = `5 5
    1 2 N
    LMLMLMLMM
    3 3 E
    MMRMMRMRRM`;

    it('parses', () => {
        const plan = parsePlan(desc);
        expect(plan.area.nePoint).toEqual({ x: 5, y: 5 });
        expect(plan.area.rovers[0]).toEqual({ position: { x: 1, y: 2 }, orientation: Orientation.N });
        expect(plan.area.rovers[1]).toEqual({ position: { x: 3, y: 3 }, orientation: Orientation.E });
        expect(plan.roverActions[0].length).toBe(9);
        expect(plan.roverActions[1].length).toBe(10);
    });
    it('executes', () => {
        const plan = parsePlan(desc);
        const newArea = executePlan(plan);
        expect(newArea.rovers[0]).toEqual({ position: { x: 1, y: 3 }, orientation: Orientation.N });
        expect(newArea.rovers[1]).toEqual({ position: { x: 5, y: 1 }, orientation: Orientation.E });
    });
});