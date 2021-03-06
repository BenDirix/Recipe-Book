import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    userSub: Subscription;
    isAuthenticated: boolean = false;

    constructor(private dataStorage: DataStorageService, private authService: AuthService, private router: Router) {

    }

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user // !user ? false : true;
            console.log(!user);
            console.log(!!user);
        });
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onSaveData() {
        this.dataStorage.saveRecipe().subscribe((response: Response) => console.log(response));
    }
    onLoadData() {
        this.dataStorage.loadRecipes().subscribe()
    }

    onLogout() {
        this.authService.logout();
        // this.router.navigate(['/']); // navigate is in authService logout
    }

}