import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        FormComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to true', () => {
    component.submit();
    expect(component.submitted).toBeTruthy();
  });

  it('should call submit method', () => {
    fixture.detectChanges();
    spyOn(component, 'submit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.submit).toHaveBeenCalledTimes(0);
  });

  it('empty form should be invalid', () => {
    component.form.controls['name'].setValue('');
    component.form.controls['email'].setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.form.controls['name'].setValue('Paul');
    component.form.controls['email'].setValue('paul@test.fr');
    expect(component.form.valid).toBeTruthy();
  });
});
