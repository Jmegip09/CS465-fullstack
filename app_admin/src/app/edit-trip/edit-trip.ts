import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) { }

  ngOnInit(): void {
    // Get tripCode from localStorage
    let tripCode = localStorage.getItem('tripCode');

    if (!tripCode) {
      alert('Something went wrong, could not find trip!');
      this.router.navigate(['']);
      return;
    }

    // Build the form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Load the trip data
    this.tripDataService.getTrip(tripCode).subscribe({
      next: (trip) => {
        this.editForm.patchValue(trip);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).subscribe({
        next: (trip) => {
          console.log('Trip updated:', trip);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  get f() { return this.editForm.controls; }
}
