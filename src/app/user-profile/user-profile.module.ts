import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './user-profile-component';
import {UserProfileService} from './service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [UserProfileComponent],
    exports: [UserProfileComponent],
    providers: [UserProfileService]
})
export class UserProfileModule {
}
