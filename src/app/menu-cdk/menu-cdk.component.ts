import { Component } from '@angular/core';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
  selector: 'app-menu-cdk',
  standalone: true,
  imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './menu-cdk.component.html',
  styleUrls: ['./menu-cdk.component.scss'],
})
export class MenuCdkComponent {
  isMenuOpen:boolean = false; // State for the menu
  selectedLabel: string = 'Please Select'; // Default label

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Toggle the menu state
  }

  handleMenuItemClick(itemLabel: string): void {
    this.selectedLabel = itemLabel; // Update the button label
    this.isMenuOpen = false; // Close the menu after an item is selected
  }
}
