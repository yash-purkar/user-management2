# User Management App

This project demonstrates a simple user management system built with **Next.js**, **Shadcn**, **TanStack Query**, and **TanStack Table**. The application fetches user data from a public API, displays it in a table, and provides features like sorting, filtering, search, and pagination.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Shadcn](https://github.com/shadcn/ui)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Table Management**: [TanStack Table](https://tanstack.com/table)

## 🌍 Features

1. **Data Fetching**:

   - Fetches user data from [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users).
   - Uses **TanStack Query** to manage fetching, caching, and synchronization of data.

2. **Table Features**:

   - **Sorting**: Sort the data by any column (Name, Email, etc.).
   - **Filtering**: Filter rows based on column values (e.g., filter users by name or email).
   - **Search**: Global search bar that filters data across all columns.
   - **Pagination**: Implements pagination using **TanStack Table**..

3. **UI/UX**:
   - Clean design using **Shadcn** components.
   - Handles loading states and displays error messages if the data fetch fails.

## 🚀 Getting Started

Follow these steps to get the project running locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yash-purkar/user-management2.git
cd user-management2
```

### 2. Install Dependencies

```bast
npm install
```

### 2. Run the Development Server

```bast
npm run dev
```

Visit http://localhost:3000 to see the app in action.

## 📝 Approach & Challenges

**Approach:**

- The project was developed using Next.js to create a server-rendered React application.
- TanStack Query was utilized for efficient data fetching, caching, and state management.
- I used TanStack Table for handling table-related operations such as sorting, filtering, and pagination, without the need for dynamic routing.

**Challenges:**

- Implementing pagination with TanStack Table was a bit tricky but allowed for efficient navigation without the need for dynamic routes.
