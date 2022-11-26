import { Player } from './player.model';
export class Team {
    public name: string;
    public color: string;
    public isA: boolean;
    public players: Player[] = [];
}