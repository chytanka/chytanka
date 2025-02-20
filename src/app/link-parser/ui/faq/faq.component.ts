import { Component, inject } from '@angular/core';
import { LangService } from '../../../shared/data-access/lang.service';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss', '../../../shared/ui/@styles/details.scss'],
    standalone: false
})
export class FaqComponent {
  public lang = inject(LangService)

  gistLinkHref: string = `<a href="//gist.github.com" target="_blank" rel="noopener noreferrer">Github Gist</a>, <a href="//rentry.co/" target="_blank" rel="noopener noreferrer">Rentry</a>`
}
