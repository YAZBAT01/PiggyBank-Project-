import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../core/services/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authSrvSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const validValue = {
    fullName: 'Marco Rossi',
    email: 'marco@email.it',
    phone: '+39 331 456 7890',
    password: 'password123',
    confirmPassword: 'password123'
  };

  beforeEach(async () => {
    authSrvSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authSrvSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: {} } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should require a full name of at least 3 characters', () => {
    const fullName = component.registerForm.get('fullName');
    fullName?.setValue('Al');
    expect(fullName?.valid).toBeFalse();

    fullName?.setValue('Marco Rossi');
    expect(fullName?.valid).toBeTrue();
  });

  it('should require a valid email', () => {
    const email = component.registerForm.get('email');
    email?.setValue('not-an-email');
    expect(email?.valid).toBeFalse();

    email?.setValue('marco@email.it');
    expect(email?.valid).toBeTrue();
  });

  it('should require a valid phone number', () => {
    const phone = component.registerForm.get('phone');
    phone?.setValue('abc');
    expect(phone?.valid).toBeFalse();

    phone?.setValue('+39 331 456 7890');
    expect(phone?.valid).toBeTrue();
  });

  it('should require a password of at least 8 characters', () => {
    const password = component.registerForm.get('password');
    password?.setValue('1234567');
    expect(password?.valid).toBeFalse();

    password?.setValue('12345678');
    expect(password?.valid).toBeTrue();
  });

  it('should be invalid when password and confirmPassword do not match', () => {
    component.registerForm.setValue({ ...validValue, confirmPassword: 'different123' });
    expect(component.registerForm.errors?.['passwordMismatch']).toBeTrue();
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should be valid when password and confirmPassword match', () => {
    component.registerForm.setValue(validValue);
    expect(component.registerForm.valid).toBeTrue();
  });

  it('should not call authSrv.register when the form is invalid', () => {
    component.register();
    expect(authSrvSpy.register).not.toHaveBeenCalled();
  });

  it('should call authSrv.register and navigate to /products on success', () => {
    authSrvSpy.register.and.returnValue(
      of({ token: 'fake-token', user: { id: '1', fullName: 'Marco Rossi', email: 'marco@email.it' } })
    );

    component.registerForm.setValue(validValue);
    component.register();

    expect(authSrvSpy.register).toHaveBeenCalledWith({
      fullName: validValue.fullName,
      email: validValue.email,
      phone: validValue.phone,
      password: validValue.password
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/products']);
    expect(component.loading()).toBeFalse();
  });

  it('should navigate to the "dest" query param when present', () => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: { snapshot: { queryParams: { dest: '/cart' } } }
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    authSrvSpy.register.and.returnValue(
      of({ token: 'fake-token', user: { id: '1', fullName: 'Marco Rossi', email: 'marco@email.it' } })
    );

    component.registerForm.setValue(validValue);
    component.register();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cart']);
  });

  it('should set errorMessage and stop loading when register fails', () => {
    authSrvSpy.register.and.returnValue(
      throwError(() => ({ error: { message: 'Email già registrata' } }))
    );

    component.registerForm.setValue(validValue);
    component.register();

    expect(component.errorMessage()).toBe('Email già registrata');
    expect(component.loading()).toBeFalse();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should fall back to a default error message when the backend gives none', () => {
    authSrvSpy.register.and.returnValue(throwError(() => ({})));

    component.registerForm.setValue(validValue);
    component.register();

    expect(component.errorMessage()).toBe("Impossibile creare l'account. Riprova.");
  });

  it('should reset errorMessage when the form value changes', () => {
    component.errorMessage.set('Email già registrata');
    component.registerForm.get('email')?.setValue('altro@email.it');
    expect(component.errorMessage()).toBeNull();
  });
});