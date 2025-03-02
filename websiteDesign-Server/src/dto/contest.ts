import { Rule, RuleType, getSchema } from '@midwayjs/validate';
const requiredString = RuleType.string().required();
export class ContestDateDTO {
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
}
export class ContestAwardsDTO {
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
}
export class ContestDirectionDTO {
  @Rule(RuleType.string().min(1).max(200))
  id: string;
  @Rule(RuleType.string().min(1).max(16))
  name: string;
  @Rule(RuleType.string().min(1).max(400))
  txt: string;
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
  @Rule(RuleType.array().items(getSchema(ContestDateDTO)))
  date: ContestDateDTO[];
  @Rule(RuleType.array().items(getSchema(ContestAwardsDTO)))
  awards: ContestAwardsDTO[];
  @Rule(RuleType.array().items(getSchema(ContestDirectionDTO)))
  direction: ContestDirectionDTO[];
}

export class ContestInfoDTO {
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
export class startContestDTO {
  @Rule(requiredString.min(1).max(200))
  id: string;
}
export class updateContestDTO {
  @Rule(requiredString.min(1).max(200))
  id: string;
  @Rule(getSchema(ContestInfoDTO))
  info: ContestInfoDTO;
  @Rule(RuleType.array())
  date: ContestDateDTO[];
  @Rule(RuleType.array())
  awards: ContestAwardsDTO[];
  @Rule(RuleType.array().items(getSchema(ContestDirectionDTO)))
  direction: ContestDirectionDTO[];
}
