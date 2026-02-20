import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../services/trip-data';
import { TripCardComponent } from '../trip-card/trip-card';
import { Trip } from '../models/trip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent, RouterLink],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private tripDataService: TripDataService) { }

  ngOnInit(): void {
    this.tripDataService.getTrips().subscribe(
      (trips: Trip[]) => { this.trips = trips; }
    );
  }
}
