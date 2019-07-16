import {
    Injectable
} from '@angular/core';
import {
    HttpClient,
    HttpHeaders
} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})


// get artists example
// https://stackoverflow.com/questions/45523889/spotify-api-giving-cors-error-even-after-adding-auth-token-to-get-artists-playl
export class TestService {

    token: string;
    headers: any;
    scopes: Array<string> = [
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-library-read",
        "user-read-private",
        "user-read-email",
        "user-top-read"
    ];

    rendezVous: string = '4a118edzJsiImCyPCZk6mY';

    public setToken(value: string) {
        this.token = value;
        this.headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }


    constructor(private http: HttpClient) {}

    getArtistsAlbums() {
/* 
        console.log(this.headers);
        console.log(this.token); */
        return this.http.get(
            'https://api.spotify.com/v1/artists/' + this.rendezVous + '/albums?include_groups=album,single', {
                headers: this.headers
            }
        )
    }

    getMySavedSongs() {
        return this.http.get('https://api.spotify.com/v1/me/tracks', {
            headers: this.headers
        })
    }

    getTopTracks() {
        return this.http.get('https://api.spotify.com/v1/me/top/tracks?limit=50', {
            headers: this.headers
        })
    }


}
//return this.http.get('https://jsonplaceholder.typicode.com/users')   