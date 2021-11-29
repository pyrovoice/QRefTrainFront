import {
    Component, Input, ElementRef, AfterViewInit, ViewChild, Pipe, PipeTransform
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { CanvasDrawer } from './canvas-drawer.helper';

export enum PlayerClass {
    CHASER = "0", BEATER = "1", KEEPER = "2", SEEKER =" 3"
}

export class Moveable {
    position: Coordinates
}

export class Coordinates{
    x: number;
    y: number;
}

export class Team {
    teamColor: string;
    facingTop: boolean;
}

export class Human extends Moveable {
    name: string;
    playerClass: PlayerClass;
    hasBall: boolean;
    team: Team
}

export class Controls {
    selectedPlayers: Human[];
    team1: Team;
    team2: Team;
}

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styles: ['canvas { border: 1px solid #000; background-image: url("/assets/quidditch_haflfield.png"); background-repeat:no-repeat; background-size: 100%;}']
})
export class CanvasComponent implements AfterViewInit {

    contextMenuPosition = { x: 0, y: 0 };
    @ViewChild('canvas') public canvas: ElementRef;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    blueTeam: Team = {facingTop: false, teamColor: "#0000ff"}
    redTeam: Team = {facingTop: true, teamColor: "#ff0000"}
    humans: Human[] = [{name:"Red Chaser 3", team: this.redTeam, playerClass: PlayerClass.CHASER, hasBall: false, position: { x: 401, y: 158 }},
    { name:"Red Beater 1", team: this.redTeam, playerClass: PlayerClass.BEATER, hasBall: true, position: { x: 342, y: 650 } },
    { name:"Red Beater 2", team: this.redTeam, playerClass: PlayerClass.BEATER, hasBall: false, position: { x: 446, y: 650 } },
    { name:"Red Keeper", team: this.redTeam, playerClass: PlayerClass.KEEPER, hasBall: true, position: { x: 398, y: 700 } },
    { name:"Red Chaser 2", team: this.redTeam, playerClass: PlayerClass.CHASER, hasBall: false, position: { x: 670, y: 604 } },
    { name:"Red Chaser 1", team: this.redTeam, playerClass: PlayerClass.CHASER, hasBall: false, position: { x: 99, y: 588 } },

    { name:"Blue Chaser 1", team: this.blueTeam, playerClass: PlayerClass.CHASER, hasBall: false, position: { x: 123, y: 559 } },
    { name:"Blue Chaser 2", team: this.blueTeam, playerClass: PlayerClass.CHASER, hasBall: false, position: { x: 643, y: 560 } },
    { name:"Blue Chaser 3", team: this.blueTeam, playerClass: PlayerClass.CHASER, hasBall: false, position: { x: 405, y: 582 } },
    { name:"Blue Keeper", team: this.blueTeam, playerClass: PlayerClass.KEEPER, hasBall: false, position: { x: 405, y: 373 } },
    { name:"Blue Beater 1", team: this.blueTeam, playerClass: PlayerClass.BEATER, hasBall: true, position: { x: 278, y: 501 } },
    { name:"Blue Beater 2", team: this.blueTeam, playerClass: PlayerClass.BEATER, hasBall: true, position: { x: 483, y: 501 } }]
    selectedMoveables: Human[]  = [];

    canvasDrawer: CanvasDrawer;
    controls: Controls = {selectedPlayers: this.selectedMoveables, team1: this.blueTeam, team2: this.redTeam}
    
    isMouseDown = false;
    lastMouseDown: {date: Date, clientX: number, clientY: number};
    lastMouseDownRightClick: {date: Date, clientX: number, clientY: number};
    lastMousePosition = {x: 0, y: 0};
    clickDelay = 100;
    menuPopDelay = 400;
    selectRange = 25;

    arrowFromTo: {from: Coordinates, to: Coordinates};

    public ngAfterViewInit() {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        var context = canvasEl.getContext('2d');
        if (context == null) {
            return;
        }
        this.canvasDrawer = new CanvasDrawer(context);
        this.updateCanvas();

        var ua = navigator.userAgent;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
            console.log("Phone detected")
            this.canvas.nativeElement.addEventListener('touchstart', this.handleTouchStart.bind(this));        
            this.canvas.nativeElement.addEventListener('touchmove',  this.handleTouchMove.bind(this));
            this.canvas.nativeElement.addEventListener('touchend',  this.handleTouchEnd.bind(this));
        }else{
            console.log("Mouse detected")
            this.canvas.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this));
            this.canvas.nativeElement.addEventListener('mouseup', this.onMouseUp.bind(this));
            this.canvas.nativeElement.addEventListener('mousemove', this.onMouseMove.bind(this));
            this.canvas.nativeElement.addEventListener("contextmenu", ( e:any )=> { e.preventDefault(); return false; } );
        }
    }

    onMouseDown(event: MouseEvent){
        var coordinates = this.getEventCoordinate(event);
        this.selectObject(coordinates.x, coordinates.y);
        if(event.button == 0){
            this.lastMouseDown = {date: new Date(), clientX: coordinates.x, clientY: coordinates.y};
            this.isMouseDown = true;
        }
        if(event.button == 2){
            this.lastMouseDownRightClick = {date: new Date(), clientX: coordinates.x, clientY: coordinates.y};
            event.preventDefault();
            event.stopPropagation();
        }
        this.updateCanvas();
    }

    onMouseUp(event: MouseEvent){
        var coordinates = this.getEventCoordinate(event);
        if(event.button == 0){
            this.isMouseDown = false;
        }
        if(event.button == 2){
            if(this.lastMouseDownRightClick.clientX == coordinates.x && this.lastMouseDownRightClick.clientY == coordinates.y  ){
                //this.openMenu(coordinates.x, coordinates.y);
            }else if(this.arrowFromTo != null){
                var closestResult = this.getClosestNear(this.arrowFromTo.to.x, this.arrowFromTo.to.y);
                if(closestResult && closestResult.distance < this.selectRange && closestResult.object !== undefined){
                    this.passBall(this.selectedMoveables[0], closestResult.object)
                }
                console.log("arrowNull")
                this.arrowFromTo = null;
            }
            this.lastMouseDownRightClick = null;
        }
        this.updateCanvas();
    }

    passBall(passing: Human, receiver: Human) {
        if(passing.hasBall && !receiver.hasBall 
            && (passing.playerClass == receiver.playerClass 
                || ((passing.playerClass == PlayerClass.KEEPER && receiver.playerClass == PlayerClass.CHASER) || (passing.playerClass == PlayerClass.CHASER && receiver.playerClass == PlayerClass.KEEPER)))){
            passing.hasBall = false;
            receiver.hasBall = true;
        }
    }

    onMouseMove(event: MouseEvent){
        var coordinates = this.getEventCoordinate(event);
        if(this.isMouseDown){
            this.moveSelected(coordinates.x - this.lastMousePosition.x, coordinates.y - this.lastMousePosition.y);
            this.updateCanvas();
        }else if(this.lastMouseDownRightClick && this.selectedMoveables.length > 0){
            this.updateArrowFromTo(this.selectedMoveables[0], coordinates);
            this.updateCanvas();
        }
        this.lastMousePosition = coordinates;
    }

    updateArrowFromTo(source: Human, target: Coordinates){
        console.log("update arrowFromTo")
        this.arrowFromTo = {from: source.position, to: target}
    }

    isLeftClick(event: TouchEvent | MouseEvent, x: number, y: number){
        if(((event instanceof TouchEvent && event.touches.length < 1) || (event instanceof MouseEvent && event.button == 0))
        && new Date().getTime() - this.lastMouseDown.date.getTime() < this.clickDelay 
        && x == this.lastMouseDown.clientX
        && y == this.lastMouseDown.clientY){
            return true;
        }else{
            return false;
        }
    }

    handleTouchStart(event: TouchEvent){
        var coordinates = this.getEventCoordinate(event);
        this.lastMousePosition = coordinates;
        this.lastMouseDown = {date: new Date(), clientX: this.lastMousePosition.x, clientY: this.lastMousePosition.y};
        this.isMouseDown = true;
        this.selectObject(coordinates.x, coordinates.y);
        setTimeout(() =>{
            //AKA if it's a long press
            if(this.isMouseDown && this.lastMousePosition == coordinates){
                this.openMenu(event.touches[0].clientX, event.touches[0].clientY);
            }
          }, this.menuPopDelay );
        this.updateCanvas();
    }

    handleTouchMove(event: TouchEvent){
        var coordinates = this.getEventCoordinate(event);
        if(this.isMouseDown && this.selectedMoveables.length > 0){
            event.preventDefault();
            this.moveSelected(coordinates.x - this.lastMousePosition.x, coordinates.y - this.lastMousePosition.y);
            this.updateCanvas();
        }
        this.lastMousePosition = coordinates;
    }

    handleTouchEnd(event: TouchEvent){
        this.isMouseDown = false;
        this.updateCanvas();
    }

    getEventCoordinate(event: TouchEvent | MouseEvent){
        var coordinates = {x: 0, y: 0};
        if(event instanceof TouchEvent){
            if(event.touches.length == 0){
                coordinates = this.lastMousePosition;
            }else{
                var touch = event.touches[0];
                coordinates = {x: touch.clientX, y: touch.clientY};
            }
        }
        if(event instanceof MouseEvent){
            coordinates = {x: event.offsetX, y: event.offsetY};
        }
        return {x: coordinates.x, y: coordinates.y}
    }

    onContextMenu(event: MouseEvent, trigger: MatMenuTrigger, data: any){
        this.openMenu(event.clientX, event.clientY);
    }

    openMenu(x: number, y: number){
        // @ts-ignore
        const triggerElement: HTMLElement = this.trigger._element.nativeElement;
        triggerElement.style.setProperty('left', `${x}px`);
        triggerElement.style.setProperty('position', 'fixed');
        triggerElement.style.setProperty('top', `${y}px`);
        triggerElement.style.setProperty('visibility', 'hidden');
        //this.trigger.menuData = { null };
        this.trigger.menu.focusFirstItem('mouse');
        this.trigger.openMenu();
    }

    selectObject(posX: number, posY: number){
        this.deselectEverything();
        var closestResult = this.getClosestNear(posX, posY);
        if(closestResult != null && closestResult.distance < this.selectRange && closestResult.object !== undefined){
            this.selectedMoveables.push(closestResult.object);
        }
    }

    deselectEverything(){
        this.selectedMoveables = [];
        this.controls.selectedPlayers = this.selectedMoveables;
    }

    getClosestNear(x: number, y: number){
        if(this.humans.length == 0){
            return null;
        }
        var object = this.humans[0];
        var lastDistance = 9999;
        this.humans.forEach(h =>{
            var distance = this.getDistance({x: x, y: y}, h.position);
            if(distance < lastDistance){
                object = h;
                lastDistance = distance;
            }
        })
        return {object: object, distance: lastDistance};
    }

    getDistance(posObject1: any, posObject2: any){
        return Math.abs(posObject1.x - posObject2.x) + Math.abs(posObject1.y - posObject2.y);
    }

    moveSelected(x: number, y: number){
        this.selectedMoveables.forEach(h => {
            h.position.x += x;
            h.position.y += y;
        })
    }

    // Needed because canvas draw from top left, meaning the 0,0 position of an object is not its center, but its corner
    getOffsetCoordinatesForHuman(posX: number, posY: number){
        return {x: posX + 1, y: posY + 1}
    }

    updateCanvas(){
        this.canvasDrawer.updateCanvas(this.humans, this.selectedMoveables, this.arrowFromTo);
    }

    deleteItem(item: any){
        console.log("Delete", item)
    }

    handleControlEmit(human: Human){
        if(human != null){
            this.humans.push(human)
        }
        this.updateCanvas();
    }
}
