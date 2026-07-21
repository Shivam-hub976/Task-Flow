# TaskFlow - Enterprise Kanban Board

**Live Deployment:** https://your-task-flow.vercel.app

TaskFlow is a state-driven, high-performance Kanban task management application built with modern React.js. This project demonstrates advanced component architecture, client-side state persistence, and complex user interactions.

---

## Core Features

- **Drag-and-Drop Architecture:** Fluidly move tasks between columns (To Do, In Progress, Done) using a robust drag-and-drop context.
- **Inline Editing:** Click directly on any task text to instantly transform it into an editable input field, demonstrating localized component state.
- **Real-Time Data Filtering:** Global search bar that instantly filters the task array based on status and text input.
- **Priority System:** Assign High, Medium, or Low priorities to tasks, mapped to dynamic, conditional Tailwind CSS styling.
- **State Persistence:** Hooks directly into the browser's `localStorage`. Data survives hard refreshes and browser closures.
- **Enterprise UX/UI:** 100 Lighthouse score optimized. Fully mobile-responsive, semantic HTML structure, and accessible screen-reader labels.

---

## Technical Architecture

This application deprecates direct DOM manipulation in favor of declarative React state management.

- **Single Source of Truth:** The core `tasks` array is managed in the parent `App.jsx` using the `useState` hook.
- **Prop Drilling:** Data and state-mutating functions (like `handleEditTask` and `handleDeleteTask`) are passed down the component tree to the modular `TaskCard.jsx` child component.
- **Effect Hook (`useEffect`):** Actively listens for mutations in the `tasks` state and automatically serializes the data to `localStorage`.

---

## Tech Stack & Packages

- **Core Framework:** React 18
- **Build Tool:** Vite (Migrated from deprecated Create-React-App)
- **Styling:** Tailwind CSS (via `@tailwindcss/vite` plugin)
- **Drag and Drop:** `@hello-pangea/dnd` (Modern, React 18 compatible fork of `react-beautiful-dnd`)
- **Icons & Visuals:** Unsplash API (Header), Custom Inline SVG (Favicon)

---

_Created By Shivam_
