import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { HeaderService } from 'src/app/services/header.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  userData$ = new Observable<User>();
  id: string = '';
  totalCalories: string = '';

  caloriesValue = this.headerService.totalCalories.subscribe((response) => {
    this.totalCalories = response;
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getUserData(this.id);
    });
  }
  getUserData(id: string) {
    this.userData$ = this.userService.getUserData(id);
  }
}
