import { Rule, RuleType } from '@midwayjs/validate';
const requiredString = RuleType.string().required();
export class ContestDateDTO{
    @Rule(RuleType.date())
    spotDate:Date; 
    @Rule(RuleType.string().min(1).max(64))
    spotPlace:string; 
    @Rule(RuleType.date())
    submissionDate:Date; 
    @Rule(RuleType.string().min(1).max(64))
    submissionPlace:string; 
    @Rule(RuleType.date())
    preliminaryDate:Date; 
    @Rule(RuleType.string().min(1).max(64))
    preliminaryPlace:string; 
    @Rule(RuleType.date())
    finalDate:Date; 
    @Rule(RuleType.string().min(1).max(64))
    finalPlace:string;
} 
export class ContestAwardsDTO{
    @Rule(RuleType.string().min(1).max(16))
    name:string;
    @Rule(RuleType.string().min(1).max(16))
    prize:string;
    @Rule(RuleType.string().min(1).max(16))
    amount:string;
    @Rule(RuleType.string().min(1).max(16))
    model:string;
}
export class ContestDirectionDTO{
    @Rule(RuleType.string().min(1).max(16))
    name:string;
    @Rule(RuleType.string().min(1).max(400))
    txt:string;
}
export class ContestDTO {
    @Rule(requiredString.min(1).max(32))
    name:string;
    @Rule(requiredString.min(1).max(64))
    topic:string;
    @Rule(requiredString.min(1).max(400))
    introduce:string;
    @Rule(requiredString.min(1).max(64))
    doubleKnots:string;
    @Rule(requiredString.min(1).max(64))
    organizers:string;
    @Rule(requiredString.min(1).max(64))
    contractors:string;
    @Rule(requiredString.min(1).max(4))
    year:string;
    @Rule(RuleType.object())
    date:ContestDateDTO; 
    @Rule(RuleType.array())
    awards:ContestAwardsDTO[];
    @Rule(RuleType.array())
    direction:ContestDirectionDTO[];
}