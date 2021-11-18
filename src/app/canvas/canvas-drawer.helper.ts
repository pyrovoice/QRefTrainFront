import {
    Human, Moveable, PlayerClass
} from './canvas.component';

export class CanvasDrawer{
    context: CanvasRenderingContext2D;

    width = 815;
    height = 752;
    playerSize = 14;
    ballSize = 8;
    ballDistanceToPlayerx = 20;
    playerHeadbandSize = 4;
    nameDistanceToPlayer = 30;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
      }

    updateCanvas(humans: Human[], selectedMoveables: Moveable[], arrowFromTo){
        this.context.clearRect(0, 0, this.width, this.height);
        humans.forEach(h => {
            this.drawPlayer(h, selectedMoveables);
        })
        if(arrowFromTo != null){
            this.drawArrow(arrowFromTo);
        }
    }

      drawPlayer(human: Human, selectedMoveables: Moveable[]) {
        if (!this.context) { return; }
        

        
        
        //var center = this.getOffsetCoordinatesForHuman(human.position.x, human.position.y);
        var center = {x: human.position.x, y: human.position.y}
        this.context.beginPath();
        this.context.arc(center.x, center.y, this.playerSize + 1, 0, 2 * Math.PI, false);
        this.context.lineWidth = this.playerHeadbandSize;
        this.context.strokeStyle = human.playerClass != PlayerClass.BEATER ? "#000000" : "#FFFFFF";
        this.context.stroke();

        if(selectedMoveables.indexOf(human) != -1){
            this.context.strokeStyle = "rgba(0, 0, 0, 0.3)";
            this.context.lineWidth = 1;
            this.context.strokeRect(center.x -20, center.y -20, 40, 40);
        }

        this.context.beginPath();
        this.context.arc(center.x, center.y, this.playerSize, 0, 2 * Math.PI, false);
        this.context.fillStyle = human.team.teamColor;
        this.context.fill();
        this.context.lineWidth = this.playerHeadbandSize;
        this.context.strokeStyle = this.getHeadbandColorForPosition(human.playerClass);
        this.context.stroke();

        if (human.hasBall) {
            this.context.beginPath();
            var ballOffset = human.team.facingTop ? this.ballDistanceToPlayerx : -this.ballDistanceToPlayerx;
            this.context.arc(center.x + 5, center.y - ballOffset, this.ballSize, 0, 2 * Math.PI, false);
            this.context.fillStyle = this.getBallColorForPosition(human.playerClass);
            this.context.fill();
            this.context.lineWidth = 1;
            this.context.strokeStyle = "#000000";
            this.context.stroke();
        }

        /* if(human.name != null && human.name != undefined ){
            this.context.lineWidth = 1;
            this.context.strokeStyle = "#000000";
            this.context.fillStyle  = "#FFFFFF";
            this.context.font = "30px Arial";
            this.context.textAlign = "center";
            this.context.fillText(human.name, center.x , center.y -20);
            this.context.strokeText(human.name, center.x, center.y -20);
        } */

        if(human.name != null && human.name != "" ){
            var nameOffest = human.team.facingTop ? this.nameDistanceToPlayer : -this.nameDistanceToPlayer;
            this.context.lineWidth = 1;
            this.context.strokeStyle  = "#000000";
            this.context.font = "12px Arial";
            this.context.textAlign = "center";
            this.context.strokeText(human.name.toUpperCase(), center.x, center.y +nameOffest);
        }
    }

    drawArrow(arrowFromTo){
        const dx = arrowFromTo.to.x - arrowFromTo.from.x;
        const dy = arrowFromTo.to.y - arrowFromTo.from.y;
        const headlen = Math.sqrt( dx * dx + dy * dy ) * 0.3; // length of head in pixels
        const angle = Math.atan2( dy, dx );
        this.context.beginPath();
        this.context.moveTo( arrowFromTo.from.x, arrowFromTo.from.y );
        this.context.lineTo( arrowFromTo.to.x, arrowFromTo.to.y );
        this.context.stroke();
        this.context.beginPath();
        this.context.moveTo( arrowFromTo.to.x - headlen * Math.cos( angle - Math.PI / 6 ), arrowFromTo.to.y - headlen * Math.sin( angle - Math.PI / 6 ) );
        this.context.lineTo( arrowFromTo.to.x, arrowFromTo.to.y );
        this.context.lineTo( arrowFromTo.to.x - headlen * Math.cos( angle + Math.PI / 6 ), arrowFromTo.to.y - headlen * Math.sin( angle + Math.PI / 6 ) );
        this.context.stroke();
    }

    getBallColorForPosition(playerClass: PlayerClass): string | CanvasGradient | CanvasPattern {
        switch (playerClass) {
            case PlayerClass.CHASER:
            case PlayerClass.KEEPER:
                return "#FFFFFF";
            case PlayerClass.BEATER:
                return "#FF0000";
            default:
                return "#000000";
        }
    }

    getHeadbandColorForPosition(playerClass: PlayerClass) {
        switch (playerClass) {
            case PlayerClass.CHASER:
                return "#FFFFFF";
            case PlayerClass.BEATER:
                return "#000000";
            case PlayerClass.KEEPER:
                return "#00ad34"
            case PlayerClass.SEEKER:
                return "#e8e846"
            default:
                return "#FFFFFF";
        }
    }
}