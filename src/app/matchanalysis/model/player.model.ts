import { PlayerPosition } from './player-position.enum';
import { PlayerSexe } from './player-sexe.enum';

export class Player {
    public readonly playerId: number;
    public playerNumber: number = 0;
    public playerSexe: PlayerSexe = PlayerSexe.Unknown;
    public playerPosition: PlayerPosition = PlayerPosition.Unknown;
    public playerName: string = "";
    
    constructor(playerId: number) {
        this.playerId = playerId;
    }

    public static getNewPlayer(playerId: number, pos: PlayerPosition): Player{
        let p = new Player(playerId);
        p.playerPosition = pos;
        return p;
    }
}