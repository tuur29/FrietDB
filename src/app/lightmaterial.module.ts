import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoConflictStyleCompatibilityMode } from '@angular/material';
import { MatToolbarModule, MatListModule, MatSnackBarModule, MatDialogModule, MatTooltipModule, MatIconModule, MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule, MatProgressSpinnerModule, MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [ NoConflictStyleCompatibilityMode,
    MatToolbarModule, MatListModule, MatSnackBarModule, MatDialogModule, MatTooltipModule, MatIconModule, MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule, MatProgressSpinnerModule, MatCheckboxModule
  ],
  exports: [
    MatToolbarModule, MatListModule, MatSnackBarModule, MatDialogModule, MatTooltipModule, MatIconModule, MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule, MatProgressSpinnerModule, MatCheckboxModule
  ],
})
export class LightMaterialModule { }
