# Task Board

Task Board is a task manager for organizing school, work, and personal projects. Create tasks, set due dates, and track what’s pending, completed, or overdue.

## Features

- Sign in with a demo account to access the dashboard.
- Add, edit, complete, and delete tasks. Deleting a task asks for confirmation.
- Filter tasks by status and see total, pending, and completed counts.
- Set optional due dates and spot overdue pending tasks.
- Keep tasks across refreshes in the same browser using local storage.

## Run locally

With Node.js installed, open the project folder in PowerShell and run:

```powershell
npm.cmd ci
npm.cmd run dev
```

Open the Local URL printed in the terminal.

## Live links

https://annengendo25-design.github.io/task-board/

## Demo login

- Email: `demo@taskboard.com`
- Password: `task123`

The demo sign-in runs in the browser. Tasks are stored locally in that browser.

## Run the tests

```powershell
node --test tests/reducers.test.mjs
```

The four tests cover adding, updating, and deleting tasks, plus updating Redux state on login and logout.

## Built with

React, Redux Toolkit, React Router, Vite, and CSS.