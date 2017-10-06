import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoConflictStyleCompatibilityMode } from '@angular/material';
import { MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule,MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule, MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [ NoConflictStyleCompatibilityMode,
	MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule,MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule, MatSelectModule
  ],
  exports: [
	MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule,MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule, MatSelectModule
  ],
})
export class MaterialModule { }