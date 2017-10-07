import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoConflictStyleCompatibilityMode } from '@angular/material';
import { MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule,MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule, MatSelectModule, MatSortModule
} from '@angular/material';

@NgModule({
  imports: [ NoConflictStyleCompatibilityMode,
	MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule,MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule, MatSelectModule, MatSortModule
  ],
  exports: [
	MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule,MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule, MatSelectModule, MatSortModule
  ],
})
export class MaterialModule { }