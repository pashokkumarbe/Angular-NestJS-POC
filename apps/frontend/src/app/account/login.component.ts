import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { AccountService, AlertService } from '../_services';
import { AppService } from '../app.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
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
            password: ['', Validators.required]
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
        this.appService.login(userdata).subscribe((data: any) => {
            if (!data) {
                this.loading = false;
                alert('Invalid Email Id or Password');
                return;
            }  
            localStorage.setItem('user', JSON.stringify(data)); 
            this.router.navigateByUrl('/');
            this.accountService.setUserData(data);
            this.loading = false;
        }, (err: any) => {
            console.log(err); 
            this.loading = false;
        });
    }
}