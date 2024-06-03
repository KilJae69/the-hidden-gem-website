# Hidden Gem

## Description

Hidden Gem is a website where users can explore and rent 8 unique luxury cabins. Each cabin offers a cozy and comfortable retreat, perfect for anyone looking to escape to nature. The site features detailed cabin listings, beautiful photos, and an easy booking process to help users find their ideal getaway.

This project was done as part of Jonas Schmedtmann NextJS course with additional refactoring.

This project is not a finished or polished product, as I still need to fully integrate CMS for hotel staff, and polish the website.

## Features

- User Authentication: Users can log in with their Google and GitHub accounts.
- View Availability: Users can view available booking dates for each cabin.
- Booking Management: Users can book a cabin, as well as edit and delete their reservations.
- Profile Update Requirement: Users need to fully update their profiles before making a booking.
- ...

## Notable Technologies Used

- Next.js 14 App Router: A React meta framework for building server-side rendered and statically generated web applications.
- Tailwind CSS: A utility-first CSS framework for styling.
- NextAuth.js: Authentication for Next.js applications.
- Supabase: An open-source Firebase alternative for backend services.
- Zod: A TypeScript-first schema declaration and validation library.
- React Hook Form: A library for managing form state and validation.
- Swiper: A modern mobile touch slider.
- Day Picker: A date picker component for React.
- ESLint: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Shadcn UI: A library of accessible, unstyled UI components.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v18.x or higher)
- npm or yarn

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/KilJae69/the-hidden-gem-website.git
   cd hidden-gem-website

   ```

2. **Install dependancies**

   npm install

3. **Set Up Env Variables**

   Create a .env.local file in the root directory and add the following variables:

   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   NEXTAUTH_URL=your_next_auth_url
   NEXTAUTH_SECRET=your_next_auth_secret
   AUTH_GOOGLE_ID=your_google_oauth_id
   AUTH_GOOGLE_SECRET=your_google_secre
   AUTH_GITHUB_ID=your_github_id
   AUTH_GITHUB_SECRET=your_github_secret

### Running the App

1. **Start the development server**

   npm run dev

2. **Production build**

   npm run build
   npm run start

## Contact

If you want to contact me you can reach me at <adi.toromanovic@outlook.com>
