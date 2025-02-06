import { Rule, RuleType } from '@midwayjs/validate';
const requiredString = RuleType.date().required();
export class StatisticsDTO {
    @Rule(requiredString)
    startDate: string;
    @Rule(requiredString)
    endDate: string;
}