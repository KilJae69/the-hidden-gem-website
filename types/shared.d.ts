

export interface Booking {
  id: number;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  cabinId: number;
  guestId: number;
  cabins: {
    name: string;
    image: string;
  };
}

export interface Cabin {
  id: number;
  created_at: Date;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export interface Country {
  name: string;
  flag: string;
}

export interface Settings {
  minBookingLength: number;
  maxBookingLength: number;
  breakfastPrice: number;
}


