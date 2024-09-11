import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  seats: any[] = [];
  numSeats: number = 1;
  bookedSeats: number[] = [];
  totalSeats: number = 80;
  seatsPerRow: number = 7;
  isDarkTheme: boolean = false;
  showNotification: boolean = false;
  notificationMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeSeats();
  }

  initializeSeats() {
    this.seats = Array(this.totalSeats)
      .fill(null)
      .map((_, index) => ({
        seatNumber: index + 1,
        isBooked: false,
        row: Math.floor(index / this.seatsPerRow) + 1,
      }));
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme');
  }

  bookSeats() {
    if (this.numSeats < 1 || this.numSeats > 7) {
      this.showNotificationMessage('You can book between 1 and 7 seats');
      return;
    }

    const availableSeats = this.findAvailableSeats(this.numSeats);
    if (availableSeats.length === 0) {
      this.showNotificationMessage('Not enough seats available');
      return;
    }

    this.bookedSeats = availableSeats.map((seat) => seat.seatNumber);
    availableSeats.forEach((seat) => (seat.isBooked = true));

    this.showNotificationMessage('Tickets successfully booked!');
  }

  findAvailableSeats(numSeats: number): any[] {
    for (
      let row = 1;
      row <= Math.ceil(this.totalSeats / this.seatsPerRow);
      row++
    ) {
      const availableInRow = this.seats.filter(
        (seat) => seat.row === row && !seat.isBooked
      );
      if (availableInRow.length >= numSeats) {
        return availableInRow.slice(0, numSeats);
      }
    }

    const availableSeats = this.seats.filter((seat) => !seat.isBooked);
    if (availableSeats.length >= numSeats) {
      return availableSeats.slice(0, numSeats);
    }

    return [];
  }

  showNotificationMessage(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  toggleSeat(seat: any) {
    if (!seat.isBooked) {
      seat.isBooked = true;
      this.bookedSeats.push(seat.seatNumber);
    } else {
      seat.isBooked = false;
      this.bookedSeats = this.bookedSeats.filter((s) => s !== seat.seatNumber);
    }
  }
}
