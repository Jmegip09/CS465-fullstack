import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-trip.html'
})
export class AddTripComponent {

  tripForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tripService: TripDataService,
    private router: Router
  ) {
    this.tripForm = this.fb.group({
      code: [''],
      name: [''],
      length: [''],
      start: [''],
      resort: [''],
      perPerson: [''],
      image: [''],
      description: ['']
    });
  }

  onSubmit() {
    this.tripService.addTrip(this.tripForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);  // go back to list
      },
      error: (err: any) => console.error(err)
    });
  }
}
