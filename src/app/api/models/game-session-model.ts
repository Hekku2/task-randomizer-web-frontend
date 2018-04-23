/* tslint:disable */
import { ErrandModel } from './errand-model';
export interface GameSessionModel {
  id?: string;
  gameName?: string;
  errands?: Array<ErrandModel>;
  players?: Array<string>;
}
