import { Component, OnInit } from '@angular/core'; 
import { User } from '../_models';
import { AccountService } from '../_services';
import { AppService } from '../app.service';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    user: User;
    products: any[] ;  
     
    constructor(private accountService: AccountService
        ,private appService: AppService,) {
        this.user = this.accountService.userValue;
    }

    ngOnInit(): void {
        this.loadProduct();
    }

    addProduct() {
        // alert(this.user.email);
        // let userdata = {
        //     type: "2",
        //     name: "Product A"
        // };         
        // this.appService.productcreate(userdata).subscribe((data: any) => { 
        //     console.log('data', data);
        // }, (err: any) => {
        //     console.log(err);
        // });
        // userdata = {
        //     type: "1",
        //     name: "Product B"
        // };         
        // this.appService.productcreate(userdata).subscribe((data: any) => { 
        //     console.log('data', data);
        // }, (err: any) => {
        //     console.log(err);
        // });
        // userdata = {
        //     type: "2",
        //     name: "Product C"
        // };         
        // this.appService.productcreate(userdata).subscribe((data: any) => { 
        //     console.log('data', data);
        // }, (err: any) => {
        //     console.log(err);
        // });
        // userdata = {
        //     type: "2",
        //     name: "Product D"
        // };         
        // this.appService.productcreate(userdata).subscribe((data: any) => { 
        //     console.log('data', data);
        // }, (err: any) => {
        //     console.log(err);
        // });
    } 

    loadProduct() {
        // alert(this.user.email);
        this.products = [];
        let userdata = {
            type: null
        };
        if(!(this.user.email === 'admin@gmail.com')) {
            userdata.type = 1;
        }
        this.appService.getproduct(userdata).subscribe((data: any) => { 
            this.products = [...data];
            console.log('data', data);
        }, (err: any) => {
            console.log(err);
        });
    } 

}