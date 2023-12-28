import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private headerService: HeaderService) {}

  name: string = '';
  imgUrl: string = 'https://images.pexels.com/photos/19276436/pexels-photo-19276436/free-photo-of-elegante-sofisticado-moda-tendencia.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  ngOnInit(): void {
    this.headerService.onHeaderTextChanged.subscribe((newHeader: string) => {
      console.log("VAI");

      this.name = newHeader;
    });
  }
}
