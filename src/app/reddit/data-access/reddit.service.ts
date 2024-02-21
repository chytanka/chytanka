import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CompositionEpisode } from '../../common/common-read';

@Injectable({
  providedIn: 'root'
})
export class RedditService {

  constructor(private http: HttpClient) { }

  getComposition(postId: string): Observable<CompositionEpisode> {
    return this.http.get<any>(environment.redditHost + postId + '.json')
      .pipe(map((data: any) => { return this.map(data) }))
  }

  map(data: any): CompositionEpisode {

    const media_metadata = data[0].data.children[0].data.media_metadata

    const imgs = data[0]?.data.children[0]?.data?.gallery_data?.items
      ?? Object.keys(media_metadata).map(i => { return { media_id: i } });

    const post = data[0].data.children[0].data;
    const res: CompositionEpisode = {
      title: post.title,
      nsfw: post.thumbnail == "nsfw" || post.over_18,
      images: imgs.map((i: any): any => {
        const ext = (media_metadata[i.media_id]?.m).replace('image/', '');
        return {
          src: `https://i.redd.it/${i.media_id}.${ext ?? 'jpg'}`,
          height: (media_metadata[i.media_id]?.s).y,
          width: (media_metadata[i.media_id]?.s).x,
        }
      })

    }
    return res;
  }
}
