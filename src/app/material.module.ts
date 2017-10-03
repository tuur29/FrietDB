import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule,MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
	MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule,MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule
  ],
  exports: [
	MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule,MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule
  ],
})
export class MaterialModule { }