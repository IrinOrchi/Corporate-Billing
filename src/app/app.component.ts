import { Component, inject, isDevMode, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavComponent } from "./layouts/nav/nav.component";
import { LocalstorageService } from './Services/shared/essentials/localstorage.service';
import { SalesPersonData } from './layouts/nav/class/navbarResponse';
import { Title } from '@angular/platform-browser';
import { ModalService } from './Services/modal/modal.service';
import { SalesContactComponent } from "./components/sales-contact/sales-contact.component";
import { ModalComponent } from "./components/modal/modal.component";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { BackToTopComponent } from "./components/Shared/shared/back-to-top/back-to-top.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavComponent, SalesContactComponent, ModalComponent, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  localStorageService = inject(LocalstorageService)

  title = 'recruiter-registration';

  modalService = inject(ModalService);
  salesPersonData: SalesPersonData | null = null;
  isMinimalLayout = false;
  private lastNavState: any = null;

  constructor(private router: Router, private titleService: Title) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const nav = this.router.getCurrentNavigation();
        if (nav && nav.extras && nav.extras.state) {
          this.lastNavState = nav.extras.state;
        }
        if (this.router.url === '/register') {
          this.isMinimalLayout = true;
        } else if (
          (this.router.url === '/account-created-successfully' || this.router.url === '/account-updated-successfully') &&
          this.lastNavState && this.lastNavState.fromRegister
        ) {
          this.isMinimalLayout = true;
        } else {
          this.isMinimalLayout = false;
        }
      }
    });
  }

  ngOnInit(): void {
    // if (isDevMode()) {
    //   // user name testuser23jun 
    //   // company name Bdjobs internal test account--nid9 
    //   this.localStorageService.setItem('CompanyId', 'ZRL0PxY6')
    //   this.localStorageService.setItem('UserId', 'ZRc7PEg3')
    //   this.localStorageService.setItem('UserName', 'testuser23jun')
    // }
  }

  onNavbarDataLoaded(data: SalesPersonData) {
    this.salesPersonData = data;
  }

}

