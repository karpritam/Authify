# Authify
An authentication system
Authify is a full-stack authentication system built using Spring Boot and React, implementing modern security practices such as JWT-based authentication, email OTP verification, and password reset via email.

# Tech Stack
Backend

1. Java 21+
2. Spring Boot
3. Spring Security
4. JWT (JSON Web Tokens)
5. JavaMail Sender
6. RESTful APIs
7. MySQL(database) 

Frontend

1. React (Vite)
2. JavaScript
3. Tailwind CSS
4. Axios
5. React Router DOM

# Features

✅ User Registration & Login
✅ JWT Authentication & Authorization
✅ Email OTP Verification (Signup & Password Reset)
✅ Secure Password Reset Flow
✅ Role-based protected APIs
✅ Protected Routes in React

# Project Setup
Backend Setup (Spring Boot)
1. Create project using Spring Initializr
2. Open project in IntelliJ IDEA
   
Frontend Setup (React + Vite)
1. npm create vite
2. npm run dev

CSS Styling using Tailwind CSS
1. npm install -D tailwindcss@3 postcss autoprefixer
2. npx tailwindcss init -p

# 🔐 Authentication Flow

User registers → OTP sent to email

User verifies OTP → account activated

Login → JWT token issued

Token stored securely (localStorage)

Protected routes & APIs validated via JWT

Password reset via email OTP
