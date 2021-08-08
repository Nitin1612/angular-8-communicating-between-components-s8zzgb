import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService } from '../_services/index';

@Component({ selector: 'home', templateUrl: 'home.component.html' })
export class HomeComponent implements OnDestroy{
    values;
    name;
    inInput(value: string) {
        this.name = value;
      }
    onInput(value: string) {
        this.values = value;
      }
      messages: any[] = [];    
    

    subscription: Subscription;
    

    constructor(private messageService: MessageService) {
        // subscribe to home component messages
        this.subscription = this.messageService.getMessage().subscribe(message => {
          if (message) {
            this.messages.push(message);
          } else {
            // clear messages when empty message received
            this.messages = [];
          }
        }); }
        

    sendMessage():void {
        // send message to subscribers via observable subject
        this.messageService.sendMessage(this.name+':'+this.values);
        
    }

    clearMessages(): void {
        // clear messages
        this.messageService.clearMessages();
    }
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
    
}


