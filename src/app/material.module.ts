import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoConflictStyleCompatibilityMode } from '@angular/material';
import { MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule,MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule
} from '@angular/material';

@NgModule({
  imports: [ NoConflictStyleCompatibilityMode,
	MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule,MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule
  ],
  exports: [
	MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule,MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule
  ],
})
export class MaterialModule { }