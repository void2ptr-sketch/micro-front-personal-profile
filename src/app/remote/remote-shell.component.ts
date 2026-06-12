import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-personal-profile-remote-shell',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styles: ':host { display: block; }',
})
export class RemoteShellComponent {}
