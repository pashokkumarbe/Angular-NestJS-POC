import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AppService } from '../app.service';

import { AccountService, AlertService } from '../_services';
 

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private appService: AppService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({ 
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        const userdata: any = {
            email: this.f.username.value,
            pwd: this.f.password.value
        }; 
        this.appService.emailExist(userdata).subscribe((data: any) => {
            if (!data) { 
                this.appService.postUserData(userdata).subscribe((data: any) => {
                    if (!data) {
                        this.loading = false;
                        return;
                    }
                    alert('Registration successful');
                    this.router.navigate(['../login'], { relativeTo: this.route });
                    this.loading = false;
                }, (err: any) => {
                    console.log(err);
                    this.loading = false;
                }); 
                return;
            }
            alert(' Email Id already exists');            
            this.loading = false;
        }, (err: any) => {
            console.log(err);
            this.loading = false;
        });
 
    }
}