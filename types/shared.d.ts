export interface Booking {
    id: number;
    startDate: Date;
    endDate: Date;
    numNights: number;
    numGuests: number;
    cabinPrice: number;
    extrasPrice: number;
    totalPrice: number;
    status: string;
    hasBreakfast: boolean;
    isPaid: boolean;
    observations: string;
    cabinId: number;
    guestId: number;
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

export interface Guest {
    id: number;
    created_at: Date;
    fullName: string;
    email: string;
    nationalID: string;
    nationality: string;
    countryFlag: string;
}


export interface GuestUser {
    name: string;
    email: string;
    image: string;
    guestId: number;
}

export interface SessionGuestUser {
    user: GuestUser;
    expires: string;
}