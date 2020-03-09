import { Area, Action, Rover } from "./area";
import { parseCoord, parseOrientation, parseAction } from "./parse";
import _ from "lodash";

export interface Plan {
    area: Area;
    roverActions: Action[][];
}

export const parsePlan = (planDesc: string): Plan => {
    const lines = planDesc.split('\n');

    const areaDesc = lines.shift();
    if (!areaDesc) throw new Error('No area specification given');
    const [ areaNeCoord ] = parseCoord(areaDesc);

    const plan = { area: { nePoint: areaNeCoord, rovers: [] as Rover[] }, roverActions: [] as Action[][] };

    while (lines.length > 1) {
        const roverLine = lines.shift();
        const [ position, restOfLine ] = parseCoord(roverLine || '', plan.area);
        const orientation = parseOrientation(restOfLine);
        plan.area.rovers.push({ position, orientation });

        const actionLine = lines.shift();
        const actions = (actionLine || '').trim().split('').map(actionDesc => parseAction(plan.area, actionDesc));
        plan.roverActions.push(actions);
    }

    if (lines.length) throw new Error('Incomplete rover details: should be one line for initial rover position, one for rover actions.');

    return plan;
}

export const executePlan = (plan: Plan) => {
    const newArea = _.cloneDeep(plan.area);
    for (let i = 0; i < plan.roverActions.length; i++) {
        newArea.rovers[i] = plan.roverActions[i]
            .reduce((rover, action) => action(rover), plan.area.rovers[i]);
    }
    return newArea;
}