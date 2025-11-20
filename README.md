# CharityPlate — Connecting Donors with Charities

CharityPlate is a platform designed to reduce food waste, support NGOs, and make donations easier.
Donors can contribute food or money, while charities can receive, manage, and track donations in real time.

---

## Features

### User Management

* Email + OTP verification
* Secure login & authentication (JWT)
* Role-based access (`donor`, `charity`)
* Password reset with email link

### Charity & Donation Features

* Add and manage charity profiles
* Upload charity images
* Receive food or money donations
* Track total donations and plates received
* Display charity rating, reviews, and details
* Search, filter, and sort charities
* Distance-based listing (optional)

### Search & Filtering

* Search charities by name
* Filter by type:

  * `food`
  * `money`
  * `both`
* Sort by:

  * rating
  * distance
  * price per plate
  * recent updates

### Location & Geospatial Support

* GeoJSON point structure
* (Optional) distance-based search

### Frontend Dashboard

* React + Tailwind + ShadCN UI
* Donor dashboard
* Charity dashboard
* Fully responsive with modern UI

---

## Tech Stack

### Frontend

* React / Next.js
* TailwindCSS
* ShadCN UI
* Axios

### Backend

* Node.js
* Express
* Mongoose + MongoDB

### Authentication

* JWT
* OTP via Nodemailer (Gmail SMTP)

### Email Services

* Verification email
* Welcome email
* Password reset email

---

## Project Structure

```
CharityPlate/
│── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Charity.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── charityController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── charityRoutes.js
│   ├── utils/
│   │   ├── emailService.js
│   ├── server.js
│
│── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   ├── package.json
│
│── README.md
│── .env
```

---

## Environment Variables

Create a `.env` file in the backend folder:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=yourSecretKey
JWT_EXPIRE=1d

EMAIL_USER=yourEmail@gmail.com
EMAIL_PASSWORD=yourGmailAppPassword
CLIENT_URL=http://localhost:3000
```

Use a Gmail app password instead of your real Gmail password.

---

## Running the Project

### Backend

```bash
cd backend
npm install
npm start
```

Runs on: **[http://localhost:5000](http://localhost:5000)**

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on: **[http://localhost:3000](http://localhost:3000)**

---

## API Endpoints (Summary)

### Auth

| Method | Endpoint                          | Description               |
| ------ | --------------------------------- | ------------------------- |
| POST   | `/api/auth/register`              | Register user + send OTP  |
| POST   | `/api/auth/verify-otp`            | Verify email              |
| POST   | `/api/auth/login`                 | Login                     |
| POST   | `/api/auth/forgot-password`       | Send password reset email |
| POST   | `/api/auth/reset-password/:token` | Reset password            |

### Charities

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| POST   | `/api/charity`     | Create a charity                 |
| GET    | `/api/charity`     | Get all charities (with filters) |
| GET    | `/api/charity/:id` | Get single charity               |
| PUT    | `/api/charity/:id` | Update charity                   |
| DELETE | `/api/charity/:id` | Disable charity                  |

Filters Supported:

* `?type=food | money | both`
* `?sortBy=rating | distance | pricePerPlate`
* `?search=name`

---

## Charity Schema (Overview)

```js
{
  userId: ObjectId,
  name: String,
  address: String,
  pricePerPlate: Number,
  type: "food" | "money" | "both",
  rating: Number,
  reviews: String,
  totalDonationsReceived: Number,
  totalPlatesReceived: Number,
  image: String,
  isActive: Boolean
}
```

---

## Contributing

Contributions are welcome.
Feel free to open issues or submit pull requests.

---

