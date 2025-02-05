import { Rule, RuleType } from '@midwayjs/validate';
const requiredString = RuleType.string().required();
export class MaterialsDTO {
    @Rule(requiredString.min(1).max(32))
    name: string;
    @Rule(requiredString.min(1).max(255))
    link: string;
    @Rule(requiredString.min(1).max(255))
    description: string;
    @Rule(requiredString.min(1).max(16))
    type: string;
}
export class UpdateMaterialsDTO {
    @Rule(requiredString.min(1).max(200))
    materialsId: string;
    @Rule(RuleType.string().min(1).max(32))
    name: string;
    @Rule(RuleType.string().min(1).max(255))
    link: string;
    @Rule(RuleType.string().min(1).max(255))
    description: string;
    @Rule(RuleType.string().min(1).max(16))
    type: string;
    @Rule(RuleType.number().min(0).max(1))
    validFlag: number;
}