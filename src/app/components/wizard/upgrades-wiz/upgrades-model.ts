import { Upgrades } from '../../../services/dto.interface';
import { NullableType } from '../../../util/nullableType';

export enum OptionEnum {
  firstClass = 1,
  bike = 2,
}

export const OptionsList: Array<Upgrades<NullableType<OptionEnum>>> = [
  {
    name: 'keine',
    value: null,
  },
  {
    name: '1.Klasse Upgrade',
    value: OptionEnum.firstClass,
  },
  {
    name: 'Fahrradmitnahme',
    value: OptionEnum.bike,
  },
];
