import {User} from "./user";
import {Bonus} from "./bonus";
import {TaskType} from "./taskType";
import {Complexity} from "./complexity";
export class Task {
    id : number;
    taskType : TaskType;
    complexity : Complexity;
    creator : User;
    performer : User;
    bonus : Bonus;
    hasSubtasks : boolean;
    parentId : boolean;
    step : boolean;
    description : String;
    status : String;
    prize : boolean;
    closeTo: Date;

    constructor(id? : number, taskType? : TaskType, complexity? : Complexity, creator? : User,
                performer? : User, bonus?: Bonus, hasSubtasks? : boolean, parentId? : boolean,
                step? : boolean, description? : String, status ?: String, prize ?: boolean, closeTo ?: Date) {
        this.id = id;
        this.taskType = taskType;
        this.complexity = complexity;
        this.creator = creator;
        this.performer = performer;
        this.bonus = bonus;
        this.status = status;
        this.hasSubtasks = hasSubtasks;
        this.parentId = parentId;
        this.step = step;
        this.description = description;
        this.prize = prize;
        this.closeTo = closeTo;
    }
}