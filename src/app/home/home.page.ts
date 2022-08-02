import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  moneyTransactions: any;
  constructor(
    public firebaseService: FirebaseService
  ) {
    this.firebaseService.get_transactions().subscribe((res) => {
      this.moneyTransactions = res.map(e => {
        return {
          id: e.payload.doc.id,
          type: e.payload.doc.data()['type'],
          title: e.payload.doc.data()['title'],
          subTitle: e.payload.doc.data()['subTitle'],
          amount: e.payload.doc.data()['amount'],
        }
      })
      console.log(this.moneyTransactions);
  }, (err:any) => {
    console.log(err);
  })
}
delete_transaction(transactionId){
  this.firebaseService.delete_transaction(transactionId).then((res:any) =>{
    console.log(res)
  })
}

//First Calcu


display = '0';
firstval: number = null;
operator: any = null;
newCursor = false;
isc = false;
ispoint = false;

click(val: any) {
  switch (val) {
    case 'ac':
        this.display = '0';
        this.firstval = null;
        this.operator = null;
        this.newCursor = false;
        break;
    case 'C':
      this.display = '0';
      this.isc = false;
      break;
    case 'X':
      this.addoperator('X');
      break;
    case '-':
      this.addoperator('-');
      break;
    case '+':
      this.addoperator('+');
      break;
    case '/':
      this.addoperator('/');
      break;
    case '=':
      if (this.firstval !== null && this.operator !== null) {
        this.calclast();
      }
      this.operator = null;
      break;
    case '0':
      this.addnumber('0');
      break;
    case '1':
      this.addnumber('1');
      break;
    case '2':
      this.addnumber('2');
      break;
    case '3':
      this.addnumber('3');
      break;
    case '4':
      this.addnumber('4');
      break;
    case '5':
      this.addnumber('5');
      break;
    case '6':
      this.addnumber('6');
      break;
    case '7':
      this.addnumber('7');
      break;
    case '8':
      this.addnumber('8');
      break;
    case '9':
      this.addnumber('9');
      break;
    case '.':
      this.addpoint();
      break;
  }
}

addpoint() {
  if (this.ispoint == false) {
    this.ispoint = true;
  } else {
    this.ispoint = false;
  }
}

addnumber(nbr: string) {
  if (nbr == '0') {
    if (this.newCursor == true) {
      this.display = nbr;
      this.newCursor = false;
    } else if (this.display != '0') {
      if (this.ispoint == true) {
        this.display =  nbr;
      } else {
        this.display = this.display.toString() + nbr;
      }
    } else if (this.display == '0') {
      if (this.ispoint == true) {
        this.display =  nbr;
      }
    }
  } else {
    if (this.newCursor == true) {
      this.display = nbr;
      this.newCursor = false;
    } else if (this.display == '0') {
      if (this.ispoint == true) {
        if (this.display.toString().indexOf('.') > -1) {
          this.display = this.display.toString() + nbr;
        } else {
          this.display =  nbr;
        }
      } else {
        this.display = nbr;
      }
    } else {
      if (this.ispoint == true) {
        if (this.display.toString().indexOf('.') > -1) {
          this.display = this.display.toString() + nbr;
        } else {
          this.display =  nbr;
        }
      } else {
        this.display = this.display.toString() + nbr;
      }
    }
  }
  this.isc = true;
}

addoperator(op: string) {
  if (this.newCursor == false) {
    if (this.firstval == null) {
      if (this.ispoint == true ) {
        this.firstval = parseFloat(this.display);
      } else {
        this.firstval = parseInt(this.display, 0);
      }
    }
    if (this.firstval != null && this.operator != null) {
      this.calclast();
    }
  }
  this.ispoint = false;
  this.operator = op;
  this.newCursor = true;
}
calclast() {
  switch (this.operator) {
    case '%':
      this.addpercent();
      break;
    case 'X':
      if (this.ispoint == true) {
        this.firstval = (this.firstval * parseFloat(this.display));
      } else {
        this.firstval = (this.firstval * parseInt(this.display, 0));
      }
      break;
    case '-':
      if (this.ispoint == true) {
        this.firstval = (this.firstval - parseFloat(this.display));
      } else {
        this.firstval = (this.firstval - parseInt(this.display, 0));
      }
      break;
    case '+':
      if (this.ispoint == true) {
        this.firstval = (this.firstval + parseFloat(this.display));
      } else {
        this.firstval = (this.firstval + parseInt(this.display, 0));
      }
      break;
    case '/':
      if (this.ispoint == true) {
        this.firstval = (this.firstval / parseFloat(this.display));
      } else {
        this.firstval = (this.firstval / parseInt(this.display, 0));
      }
      break;  
  }
  this.display = this.firstval.toString();
}
  

  addpercent() {
    this.ispoint = false;
    const dispval = parseInt(this.display, 0) / 100;
    this.display = dispval.toString();
  }

/*value = '0';
newInput = true;
oldValue = '0';
lastOperator = 'X';
numberGroup = [
  [7, 8, 9, 'X'],  
  [4, 5, 6, '-'], 
  [1, 2, 3, '+'],
  [0, 'C', '/','=']
]; 

btnPress(symbol) {
  console.log(symbol);
  if (Number(symbol)) {
    console.log('is a number');
    if (this.newInput)
      this.value = '' + symbol;
    else
      this.value += '' + symbol;
      this.newInput = false;
  }
  else if (symbol == 'C') {
    this.value = '0';
    this.newInput = true;
  }
  else if (symbol == '='){
    if (this.lastOperator == 'X')
      this.value = '' + (parseInt(this.oldValue) * parseInt(this.value));
    else if (this.lastOperator == '-')
      this.value = '' + (parseInt(this.oldValue) - parseInt(this.value));
    else if (this.lastOperator == '+')
      this.value = '' + (parseInt(this.oldValue) + parseInt(this.value));
    else if (this.lastOperator == '/')
      this.value = '' + (parseInt(this.oldValue) / parseInt(this.value));
  }
  else {
    this.newInput = true;
    this.oldValue = this.value ;
    this.lastOperator = symbol;
  }
}*/
}