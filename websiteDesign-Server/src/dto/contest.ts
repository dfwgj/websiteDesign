import { Rule, RuleType, getSchema } from '@midwayjs/validate';
const requiredString = RuleType.string().required();
export class DateDTO {
  @Rule(RuleType.string().min(1).max(200))
  id: string;
  @Rule(RuleType.string().min(1).max(16))
  name: string;
  @Rule(RuleType.date())
  date: Date;
  @Rule(RuleType.string().min(1).max(64))
  place: string;
  @Rule(RuleType.string().min(1).max(255))
  txt: string;
  @Rule(RuleType.number().min(0).max(1))
  validFlag: number;
}
export class ContestDateDTO {
  @Rule(RuleType.string().min(1).max(200))
  id: string;
  @Rule(RuleType.array().items(getSchema(DateDTO)))
  date: DateDTO[];
}

export class ContestGroupDTO {
  @Rule(RuleType.string().min(1).max(200))
  groupCode: string;
  @Rule(RuleType.string().min(1).max(16))
  groupName: string;
  @Rule(RuleType.string().min(0).max(200))
  groupRemark: string;
}
export class AwardsDTO {
  @Rule(RuleType.string().min(1).max(200))
  id: string;
  @Rule(RuleType.string().min(1).max(16))
  name: string;
  @Rule(RuleType.string().min(1).max(16))
  prize: string;
  @Rule(RuleType.string().min(1).max(16))
  amount: string;
  @Rule(RuleType.string().min(1).max(16))
  quantity: string;
  @Rule(RuleType.string().min(1).max(16))
  type: string;
  @Rule(RuleType.number().min(0).max(1))
  validFlag: number;
}
export class ContestAwardsDTO {
  @Rule(RuleType.string().min(1).max(200))
  id: string;
  @Rule(RuleType.array().items(getSchema(AwardsDTO)))
  award: AwardsDTO[];
}
export class DirectionDTO {
  @Rule(RuleType.string().min(1).max(200))
  id: string;
  @Rule(RuleType.string().min(1).max(16))
  name: string;
  @Rule(RuleType.string().min(1).max(400))
  txt: string;
  @Rule(RuleType.number().min(0).max(1))
  validFlag: number;
}
export class ContestDirectionDTO {
  @Rule(RuleType.string().min(1).max(200))
  id: string;
  @Rule(RuleType.array().items(getSchema(DirectionDTO)))
  direction: DirectionDTO[];
}
export class ContestDTO {
  @Rule(requiredString.min(1).max(32))
  name: string;
  @Rule(requiredString.min(1).max(64))
  topic: string;
  @Rule(requiredString.min(1).max(400))
  introduce: string;
  @Rule(requiredString.min(1).max(64))
  doubleKnots: string;
  @Rule(requiredString.min(1).max(64))
  organizers: string;
  @Rule(requiredString.min(1).max(64))
  contractors: string;
  @Rule(requiredString.min(1).max(4))
  year: string;
  @Rule(RuleType.array().items(getSchema(DateDTO)))
  date: DateDTO[];
  @Rule(RuleType.array().items(getSchema(AwardsDTO)))
  awards: AwardsDTO[];
  @Rule(RuleType.array().items(getSchema(DirectionDTO)))
  direction: DirectionDTO[];
}

export class updateContestInfoDTO {
  @Rule(RuleType.string().min(1).max(32))
  name: string;
  @Rule(RuleType.string().min(1).max(64))
  topic: string;
  @Rule(RuleType.string().min(1).max(400))
  introduce: string;
  @Rule(RuleType.string().min(1).max(64))
  doubleKnots: string;
  @Rule(RuleType.string().min(1).max(64))
  organizers: string;
  @Rule(RuleType.string().min(1).max(64))
  contractors: string;
  @Rule(RuleType.string().min(1).max(4))
  year: string;
}
export class ContestInfoDTO {
  @Rule(requiredString.min(1).max(200))
  id: string;
  @Rule(getSchema(updateContestInfoDTO))
  info: updateContestInfoDTO;
}
export class startContestDTO {
  @Rule(requiredString.min(1).max(200))
  id: string;
}
