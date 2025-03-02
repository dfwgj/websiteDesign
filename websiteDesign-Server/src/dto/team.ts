import { Rule, RuleType, getSchema } from '@midwayjs/validate';
const requiredString = RuleType.string().required();
export class PlayerDTO {
  @Rule(requiredString.length(11))
  studentId: string;
  @Rule(requiredString.min(1).max(16))
  name: string;
}
export class TeamDTO {
  @Rule(RuleType.string().min(1).max(200))
  teamId: string;
  @Rule(RuleType.string().min(1).max(200))
  userId: string;
  @Rule(requiredString.min(1).max(16))
  name: string;
  @Rule(requiredString.min(1).max(16))
  model: string;
  @Rule(requiredString.min(1).max(16))
  direction: string;
  @Rule(requiredString.min(1).max(64))
  opusName: string;
  @Rule(RuleType.array().required().items(getSchema(PlayerDTO)))
  players: PlayerDTO[];
}
export class TeamUpdateDTO {
  @Rule(requiredString.min(1).max(200))
  teamId: string;
  @Rule(RuleType.string().min(1).max(16))
  name: string;
  @Rule(RuleType.string().min(1).max(16))
  model: string;
  @Rule(RuleType.string().min(1).max(16))
  direction: string;
  @Rule(RuleType.string().min(1).max(64))
  opusName: string;
  @Rule(RuleType.number().min(0).max(5))
  stateFlag: number;
}
export class LeaderDTO {
  @Rule(requiredString.min(1).max(200))
  teamId: string;
  @Rule(requiredString.min(1).max(200))
  studentId: string;
}