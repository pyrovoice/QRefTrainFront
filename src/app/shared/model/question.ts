import { QuestionSubject } from '../enum/question-topic.enum';
import { NationalGoverningBody } from './national-governing-body.model';
import { Answer } from './answer.model';

export interface Question {
     publicId: String;
     questionSubject: QuestionSubject;
     URLVideo?: String;
     questionText: String;
     answerExplanation?: String;
     NGB: NationalGoverningBody;
     isRetired: boolean;
     answers: Answer[];
}
