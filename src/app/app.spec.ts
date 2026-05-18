import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should be 4', () => {
    // Arrange
    const num1 = 2;
    const num2 = 2;
    // Act
    const result = num1 + num2;
    // Assert
    expect(result).toBe(4);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should render router-outlet with css classes', () => {  
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const divElement = compiled.querySelector('div');
    const mostHaveClasses = 'min-w-screen min-h-screen bg-slate-700 flex items-center justify-center px-5 py-5'.split(
      ' '
    );
    divElement?.classList.forEach(className => {
      expect(mostHaveClasses).toContain(className);
    });
    
  });

});
