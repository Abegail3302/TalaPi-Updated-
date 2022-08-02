import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})
export class TodolistPage implements OnInit {

  isOpen : boolean = false;
  tasks : any[] = [];
  newTask : string;
  constructor(private alertController: AlertController) { }

      async presentAlert() {
      const alert = await this.alertController.create({
      header: 'Notice!',
      subHeader: 'from the team',
      message: 'Sorry! The Calculator feature can only be accessed if you are on the Moneythor page.',
      buttons: ['OK']
    });
    await alert.present();
  }

  addNewTask(){
    var task = {
      isChecked : false,
      content : this.newTask
    }
    this.newTask = '';
    this.tasks.push(task);
  }
  ngOnInit() {
  }
onCheck(event, i ){
  this.tasks[i].isChecked = event.detail.checked;
}
deleteTask(i){
  this.tasks.splice(i, 1);
}
}

