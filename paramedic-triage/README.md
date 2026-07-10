# EMKF :Emergency Medicine Kenya Foundation

# Paramedic Triage Intake Application

A high-performance, offline-first mobile application built with **React Native (Expo)** and **TypeScript** for emergency medical personnel.

The application enables paramedics to capture critical patient triage information even in areas with poor or no internet connectivity. Every submission is stored locally and automatically synchronized with the server when network connectivity is restored.


## 📱 Features

### Triage Intake Form

- Patient Name
- Condition Description
- Priority Level (1–5)
- Status
  - Pending
  - In-Transit

### Validation

- Required patient name
- Required condition description
- Required priority
- Required status

### Priority Colour Coding

| Priority | Meaning | Colour |
|----------|----------|---------|
| 1 | Critical | 🔴 Dark Red |
| 2 | High | 🟠 Orange |
| 3 | Medium | 🟡 Yellow |
| 4 | Low | 🟢 Green |
| 5 | Stable | 🔵 Blue |

---

## Offline-First Architecture

The application never depends on immediate network availability.

Whenever a paramedic submits a triage record:

1. The record is saved immediately into SQLite.
2. The UI updates instantly.
3. If internet is unavailable:
   - The record is marked as **Pending Sync**.
4. When connectivity returns:
   - The Sync Service automatically uploads pending records.
5. Successfully uploaded records are marked as **Synced**.

This guarantees that **no patient information is lost**.

---

## Tech Stack

- React Native
- Expo SDK 54
- TypeScript
- React Hook Form
- SQLite (expo-sqlite)
- Redux
- NetInfo
- Jest

---

## Project Structure

src
│
├── components
│   ├── InputField.tsx
│   ├── PriorityCard.tsx
│   ├── StatusPicker.tsx
│   ├── SubmitButton.tsx
│   └── TriageCard.tsx
│
├── database
│   ├── database.ts
│   └── triageRepository.ts
│
├── hooks
│   └── useSync.ts
│
├── models
│   └── triage.ts
│
├── services
│   ├── api.ts
│   └── syncService.ts
│
├── screens
│   └── TriageScreen.tsx
│
├── store
│
└── tests


## Application Architecture

               User
                 │
                 ▼
         TriageScreen
                 │
                 ▼
        React Hook Form
                 │
                 ▼
      TriageRepository
                 │
                 ▼
             SQLite
                 │
                 ▼
        Pending Records
                 │
                 ▼
        Connectivity Hook
                 │
                 ▼
          Sync Service
                 │
                 ▼
           Mock API
                 │
                 ▼
         Mark As Synced
                 │
                 ▼
           Refresh UI

## Data Flow

### Online


User submits -> SQLite Save -> Upload -> Synced


### Offline

User submits -> SQLite Save -> Pending Sync -> Internet Restored -> Automatic Upload -> Synced


## Mock API

The assessment does not require a live backend.

A mock API service simulates:

- 2-second network delay
- Random upload failures
- Successful synchronization

This demonstrates the application's resilience under unreliable network conditions.


## Running the Project

Clone the repository:

git clone <repository-url>


Install dependencies:

npm install


## Run:

npx expo start

Android Emulator:
a

or

npx expo run:android

### Running Tests

npm test

## Design Decisions

- **SQLite** was chosen to guarantee local persistence while offline.
- **Repository Pattern** separates database logic from the UI.
- **Service Layer** encapsulates synchronization and networking concerns.
- **React Hook Form** provides lightweight and performant form management.
- **Redux** manages shared application state.
- **NetInfo** enables automatic synchronization when connectivity is restored.
- **Mock API** simulates unreliable network conditions without requiring a backend.

## Author

Jephat Maina
