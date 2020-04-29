import { QuestionSubject } from '../enum/question-topic.enum';
import { NationalGoverningBody } from './national-governing-body.model';
import { Answer } from './answer.model';

export class Question {
    public publicId: Number;
    public questionSubject: QuestionSubject;
    public URLVideo?: String;
    public questionText: String;
    public answerExplanation?: String;
    public NGB: NationalGoverningBody;
    public isRetired: boolean;
    public answers: Answer[];
}
