import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transactionService';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList implements OnInit{
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService, private cdr: ChangeDetectorRef,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadTransactions();
  }
  loadTransactions():void{

    this.transactionService.getAll().subscribe((data) => {
    console.log('DATA:', data);
    console.log('IS ARRAY:', Array.isArray(data));

    this.transactions = data;
    this.cdr.detectChanges();

    console.log('TRANSACTIONS:', this.transactions);
  });

  }

  getTotalIncome(): number {
    return this.transactions.filter(t => t.type === 'Income').reduce((sum,t) => sum + t.amount, 0);
  }

   getTotalExpanses(): number {
    return this.transactions.filter(t => t.type === 'Expanse').reduce((sum,t) => sum + t.amount, 0);
  }

  getNetBalance():number {
    return this.getTotalIncome() - this.getTotalExpanses();
  }

  editTransaction(transaction: Transaction){

    if(transaction.id)
    {
      this.router.navigate(['/edit/',transaction.id]);
    }
  }

  deleteTransaction(transaction: Transaction){
    console.log ('id to be deleted : ', transaction.id)
    if(transaction.id){
      if(confirm("Are you sure you want to delete this transaction?")){
        this.transactionService.delete(transaction.id).subscribe({
          next: () => {
            this.loadTransactions();
          },
          error: (error) => {
            console.log('Error - ', error);
          }
        })
      }

    }

  }
 
}
