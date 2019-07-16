import { Component, OnInit } from '@angular/core';


// test service
import { TestService } from './test.service';
import { Observable, of, from  } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
// test service

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit { // on init because of test service

    title = 'Olá Mundo!';

    // test service
    users$: Object;
    topTracks: any = [];
    albums: any = [];
    scopes: Array<string>;

    constructor( private testService: TestService ) {}

    ngOnInit() {
        console.log('ngOnInit');
        let tokenString = window.location.hash.match("access_token=(.*)&token_type");
        //this.testService.token = tokenString[1];
        this.testService.setToken(tokenString[1]);

        this.scopes = this.testService.scopes;



        const source = from([
            { name: 'Joe', age: 31, skills: ["html", "css"] },
            { name: 'Bob', age: 25, skills: ["html", "js"] }
        ]);

        const example = source.pipe(
            filter(person => person.skills[0] == "html")
        );

        const subscribe = example.subscribe(val => console.log(`Over 30: ${val.name}`));



    }

    getArtistsAlbums() {
        this.testService.getArtistsAlbums().subscribe(
            suc => {
                console.log(suc);
                this.albums = suc.items;
            },
            err => {
                console.log(err);
            }
        )
    }

    getMySavedSongs() {
        this.testService.getMySavedSongs().subscribe(
            suc => {
                console.log(suc);
            },
            err => {
                console.log(err);
            }
        )
    }

    getTopTracks() {
        this.testService.getTopTracks()
        .pipe(
            map( (data: any) => {
                this.topTracks = data.items;
                for (let i in data.items ) {
                    //console.log( data.items[i].popularity );
                } 
                //console.log(this.topTracks);
            }),
            filter(
                
                track => {
                    //console.log(track);
                    track.items.popularity >= 30
                }
            )
        )
        .subscribe(
            suc => {
                //console.log(suc);
                //this.topTracks = suc.items;
            },
            err => {
                console.log(err);
            }
        )
    }

}