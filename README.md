# Gadget Galaxy

Gadget Galaxy is a multi-vendor e-commerce website where buyers can easily purchase products, sellers can list and sell their items, and admins manage users and platform operations. Built using the MERN stack, it incorporates Firebase authentication, JWT-based authorization, and Cloudinary for product image uploads.

---

## Features

### **For Buyers**
- Browse a wide range of gadgets.
- Add products to the cart.
- Delete products from the cart.
- Manage a wish list by adding or removing items.
- Secure checkout and purchase process.
- View order history.

### **For Sellers**
- Effortlessly upload and manage products.
- Upload product images directly to Cloudinary.
- Track orders from buyers.
- User-friendly dashboard for managing inventory.

### **For Admins**
- Manage user roles (buyers, sellers, admins).
- Approve or reject product listings.
- Monitor and resolve disputes.
- Comprehensive dashboard for managing users and activities.

---

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase
- **Authorization**: JSON Web Tokens (JWT)
- **File Storage**: Cloudinary

---

## How to Run Locally

### Prerequisites

1. Node.js installed (v16 or higher).
2. MongoDB running locally or a MongoDB Atlas cluster.
3. Firebase project setup for authentication.
4. Cloudinary account for image uploads.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/gadget-galaxy.git
   cd project folder name
   ```

2. Install dependencies:
   ```bash
   npm install
   cd project folder name
   npm install
   cd ..
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     DB_CONNECT=your-mongo-connection-string
     ACCESS_TOKEN_SECRET=your-jwt-secret
     CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     FIREBASE_API_KEY=your-firebase-api-key
     FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
     FIREBASE_PROJECT_ID=your-firebase-project-id
     FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
     FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
     FIREBASE_APP_ID=your-firebase-app-id
     ```

4. Start the server:
   ```bash
   npm run start
   ```

5. Navigate to the client directory and start the React application:
   ```bash
   cd project folder
   npm start dev
   ```

6. Open your browser and visit `http://localhost:3000`.

---

## User Credentials

### **Buyer**
- Email: buyer01@gmail.com
- Password: buyer01@gmail

### **Seller**
- Email: seller01@gmail.com
- Password: seller01@gmail

### **Admin**
- Email: admin01@gmail.com
- Password: admin01@gmail

---

## Live Demo

🎉 **Explore Gadget Galaxy Now!** 🎉

- **Project Live Link**: [Gadget Galaxy](https://gadget-galaxy-bd.web.app/)
- **Developer Portfolio**: [Forid Hossain](https://forid-hossain.web.app/)

---

## Contribution

Feel free to submit issues or feature requests. Fork the repository, create a new branch, and open a pull request for contributions.

---

## License

This project is licensed under the [MIT License](LICENSE).