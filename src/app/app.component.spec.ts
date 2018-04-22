import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SessionListComponent } from './components/session-list/session-list.component';
import { Component } from '@angular/core';
describe('AppComponent', () => {
    @Component({
        selector: 'app-session-list',
        template: ''
    })
    class MockSessionListComponent {}

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, MockSessionListComponent]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app');
    }));

    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain(
            'Welcome to app!'
        );
    }));
});
