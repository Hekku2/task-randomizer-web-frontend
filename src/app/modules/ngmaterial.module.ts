import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
} from '@angular/material';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatDividerModule,
        MatCardModule,
        MatSelectModule,
        MatExpansionModule,
        MatTableModule
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatDividerModule,
        MatCardModule,
        MatSelectModule,
        MatExpansionModule,
        MatTableModule
    ]
})
export class MaterialAppModule {}
