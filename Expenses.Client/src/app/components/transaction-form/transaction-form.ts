import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transactionService';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionForm {

  transactionForm: FormGroup;
  incomeCategories = [
    'Salary',
    'Freelance',
    'Investment'
  ];
  expenseCategories = [
    'Food',
    'Transportation',
    'Entertainment'
  ];

  availableCategories: string[] = [];

  editMode = false;
  transactionId?: number;

  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {
    this.transactionForm = this.fb.group({     
          type: ['Expense', Validators.required],
          category: ['', Validators.required],
          amount: ['', [Validators.required, Validators.min(0)]]
    })
        
  }

  ngOnInit(): void {
    const type = this.transactionForm.get('type')?.value;
   this.updateAvailableCategories(type);

   const id = this.activatedRoute.snapshot.paramMap.get("id");
   if(id){
    this.editMode = true;
    this.transactionId = +id;

    this.loadTransaction(this.transactionId);
   }
  }

  onSubmit() {
    if(this.transactionForm.valid){
      const transaction = this.transactionForm.value;

      if(this.editMode && this.transactionId){
        this.transactionService.update(this.transactionId, transaction).subscribe({
          next: () => {
            this.router.navigate(['/transactions']);
          },
          error: (error) => {
            console.log('Error - ', error);
          }
        })
      }
      else {
        this.transactionService.create(transaction).subscribe({
          next: () => {
            this.router.navigate(['/transactions']);
          },
          error: (error) => {
            console.log('Error - ', error);
          }
        });
      }
    }
  }

  onTypeChange() {
    const type = this.transactionForm.get('type')?.value;
    this.updateAvailableCategories(type);
    this.transactionForm.patchValue({category:''});
  }

  loadTransaction(id: number){
    this.transactionService.getById(id).subscribe({
      next: (transaction) => {
        this.updateAvailableCategories(transaction.type);
        this.transactionForm.patchValue({
          type: transaction.type,
          category: transaction.category,
          amount: transaction.amount
        })
        
      },
      error: (error) => {
        console.log('Error - ', error);
      }
    })

  }

  updateAvailableCategories(type: string) {
    this.availableCategories = type === 'Expense' ? this.expenseCategories : this.incomeCategories;
    this.transactionForm.patchValue({category:''})
  }

  cancel() {
    this.router.navigate(['/transactions']);
  }

}
