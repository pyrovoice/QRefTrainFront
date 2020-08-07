import { Question } from './question';

export class ImportResult{
  questionsAdded: Question[];
  questionsRemoved: Question[];
  questionsUntouched: Question[];
}
