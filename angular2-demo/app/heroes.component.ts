import {Component} from 'angular2/core';

@Component({
    selector: 'heroes',
    template: `
        <h1>Captain America: Civil War</h1>
        <li *ngFor="#hero of heroes">
            {{ hero.name }} ({{ hero.team }})
        </li>
    `
})
export class HeroesComponent {
    heroes: IHero[];

    constructor() {
        this.heroes = this.getHeroesData();
    }

    private getHeroesData() {
        return [
            { name: 'Captain America', team: 'Blue' },
            { name: 'Iron Man', team: 'Red' },
            { name: 'War Machine', team: 'Red' },
            { name: 'Ant-Man', team: 'Blue' }
        ];
    }
}

interface IHero {
    name: string;
    team: string;
}
