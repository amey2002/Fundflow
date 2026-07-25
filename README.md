# FundFlow

Online banking management system (Spring Boot + React).

Full project explanation, architecture, and workflows: **[DOCUMENTATION.md](./DOCUMENTATION.md)**

## Quick start

### Backend (port 8081)
```powershell
cd server/onlinebanking
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot"
.\mvnw.cmd spring-boot:run
```

Uses embedded H2 by default (no MySQL required).

### Frontend (port 3000)
```powershell
cd frontend
npm install
npm start
```

Open http://127.0.0.1:3000

## Core workflow
1. Sign up → verify OTP (shown on screen when email is disabled)
2. Log in → update profile (Aadhaar / PAN / mobile)
3. Request account opening
4. Admin approves and creates account
5. Check balance, transfer money, view statements
