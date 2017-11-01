import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoConflictStyleCompatibilityMode } from '@angular/material';
import { MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule, MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule, MatSelectModule, MatSortModule, MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [ NoConflictStyleCompatibilityMode,
    MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule, MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule, MatSelectModule, MatSortModule, MatProgressSpinnerModule
  ],
  exports: [
    MatToolbarModule, MatExpansionModule, MatListModule, MatGridListModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatTooltipModule, MatRippleModule, MatIconModule, MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule, MatSelectModule, MatSortModule, MatProgressSpinnerModule
  ],
})
export class MaterialModule { }
