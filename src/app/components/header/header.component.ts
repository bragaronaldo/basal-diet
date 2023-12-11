import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  imgUrl: string =
    'https://images.pexels.com/photos/19276436/pexels-photo-19276436/free-photo-of-elegante-sofisticado-moda-tendencia.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  name: string = 'José Carlos'
}
