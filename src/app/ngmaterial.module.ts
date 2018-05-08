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
    MatExpansionModule
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
        MatExpansionModule
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
        MatExpansionModule
    ]
})
export class MaterialAppModule {}
