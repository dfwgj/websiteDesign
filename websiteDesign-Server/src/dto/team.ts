import { Rule, RuleType } from '@midwayjs/validate';
const requiredString = RuleType.string().required();
export class TeamDTO {
    @Rule(RuleType.string().min(1).max(200))
    teamId: string;
    @Rule(RuleType.string().min(1).max(200))
    userId: string;
    @Rule(requiredString.min(0).max(16))
    name: string;
    @Rule(requiredString.min(0).max(16))
    model: string;
    @Rule(requiredString.min(0).max(16))
    direction: string;
    @Rule(RuleType.array())
    players: any;
}