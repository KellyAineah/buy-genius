**buy-genius** project:

---
# Buy Genius

The frontend of **Buy Genius**, a shopping guide platform that helps users perform marginal benefit and cost-benefit analysis across various products from different retailers. This project is built with **React** and styled using CSS modules.

**Live Demo**: [https://buy-genius.netlify.app](https://buy-genius.netlify.app)

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Overview

The **Buy Genius Frontend** is a React-based user interface that allows users to interact with the Buy Genius platform. The app features product searches, user authentication, profile management, and product filtering based on various criteria. It integrates with the Flask backend for API services and user management.

## Project Structure

```bash
buy-genius/
├── node_modules/               # Installed dependencies
├── public/                     # Public assets (favicon, index.html, etc.)
├── src/                        # Source files for the React app
│   ├── Components/             # Reusable components
│   │   ├── About.js            # About page component
│   │   ├── AdminDashboard.js   # Admin dashboard for managing retailers
│   │   ├── AuthContext.js      # Context for authentication
│   │   ├── Footer.js           # Footer component
│   │   ├── Header.js           # Header component
│   │   ├── HomePage.js         # Homepage component
│   │   ├── Login.js            # Login form
│   │   ├── MyProducts.js       # View for products added by logged-in retailer
│   │   ├── Navbar.js           # Navigation bar
│   │   ├── ProductForm.js      # Form for adding a new product
│   │   ├── Products.js         # Product listing page
│   │   ├── Profile.js          # User profile page
│   │   ├── SearchHistory.js    # Search history component
│   │   ├── Signup.js           # Signup form
│   │   ├── Users.js            # Admin view for listing users
│   │   └── Wishlist.js         # User's wishlist component
│   ├── assets/                 # Static assets (e.g., images)
│   ├── App.css                 # Global CSS
│   ├── App.js                  # Main application component
│   ├── index.js                # Entry point of the app
│   └── Theme.css               # CSS for theming
├── package.json                # Project metadata and dependencies
├── README.md                   # Project documentation
└── .env                        # Environment variables
```

## Technologies

- **React**: JavaScript library for building the user interface.
- **CSS Modules**: For scoped and modular CSS.

## Features

- **User Authentication**: Allows users to sign up, log in, and manage their accounts.
- **Product Search and Filtering**: Users can search and filter products by category, price, and delivery cost.
- **Retailer Management**: Admins can approve or reject retailer requests.
- **Profile Management**: Users can view and edit their profile.
- **Admin Dashboard**: Allows admins to manage users and retailers.
- **Wishlist**: Users can save and remove products to their wishlist.

## Installation

1. **Clone the repository**:

   ```bash
   git clone git@github.com:KellyAineah/buy-genius.git
   cd buy-genius
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables)).

4. **Run the application**:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

## Environment Variables

You will need to create a `.env` file in the root of your project with the following contents:

```bash
REACT_APP_API_URL=http://127.0.0.1:5000
```

- `REACT_APP_API_URL`: The base URL for your Flask backend API.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

### `npm run build`

Builds the app for production into the `build` folder.


## Deployment

The frontend is deployed on Netlify at [https://buy-genius.netlify.app](https://buy-genius.netlify.app).


## Contributing

To contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your branch.
4. Open a pull request for review.

---
