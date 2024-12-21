import { Pipe, PipeTransform } from '@angular/core';
import { NullableType } from './nullableType';
import {
  OptionEnum,
  OptionsList,
} from '../components/wizard/upgrades-wiz/upgrades-model';

@Pipe({
  name: 'optionsPipe',
  standalone: true,
})
export class OptionsPipe implements PipeTransform {
  transform(value: NullableType<OptionEnum>): string {
    if (value) {
      return OptionsList[value].name;
    } else {
      return '';
    }
  }
}
