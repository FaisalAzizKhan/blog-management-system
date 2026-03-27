# Issue Tracker Dashboard

A lightweight **Issue Tracking System** where users can create issues,
assign them to other users, and collaborate through comments.

The system provides a **dashboard view of assigned issues and user
activity**, allowing teams to track progress and discussions
efficiently.

The project is built using a **modern full-stack TypeScript
architecture**:

**Frontend:** React + TypeScript + Vite + Tailwind CSS\
**State/Data:** Redux Toolkit + TenStack Query\
**Backend:** Node.js with ElysiaJS (TypeScript)\
**Database:** PostgreSQL \
**ORM:** Prisma ORM\
**Validation:** Zod

------------------------------------------------------------------------

# Features

## Issue Management

-   Create new issues
-   Assign issues to other users
-   View issue details
-   Track issue status and priority

## Dashboard

Each user has a dashboard that shows:

-   Issues **assigned to them**
-   Issues **they created**
-   **Recent comments activity**

## Comments System

Users can comment on issues to discuss progress, updates, or solutions.

## Issue Filters

Users can filter issues by:

-   Status (Open, In Progress, Closed, Review)
-   Priority (Low, Medium, High)

## Activity Visibility

Users can view:

-   All comments they have made
-   All issues they are assigned to

------------------------------------------------------------------------

# Tech Stack

## Frontend

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   React Router
-   Redux Toolkit
-   React Query
-   Axios
-   Zod
-   React Toastify
-   React Icons

## Backend

-   Node.js
-   ElysiaJS (TypeScript)
-   Zod validation
-   Prisma ORM

## Database

-   PostgreSQL or SQLite

------------------------------------------------------------------------

# Architecture Overview

The application follows a **separation of concerns architecture**.

### Frontend

Handles UI rendering, routing, and state management.

### Backend

Handles API logic, validation, and database access.

### Database

Stores users, issues, and comments.

### Data Flow

User → React UI → API Request → Elysia Backend → Prisma ORM → Database

------------------------------------------------------------------------

# Project Flow

## 1. Issue Creation

A user creates a new issue and assigns it to another user.

Example fields:

-   title
-   description
-   status
-   priority
-   assignee

The issue is stored in the database using Prisma.

## 2. Issue Assignment

The assigned user will see the issue in their **dashboard**.

Dashboard shows:

-   Assigned issues
-   Created issues
-   Comment activity

## 3. Issue Discussion

Users can comment on issues.

Comments store:

-   comment text
-   issue ID
-   user ID
-   timestamp

## 4. Issue Tracking

Users can track progress using status values:

-   Open
-   In Progress
-   Review
-   Closed

------------------------------------------------------------------------

# Folder Structure

## Frontend

src/ - components/ - pages/ - store/ - service/ - types/ - utils/

**components**\
Reusable UI components.

**pages**\
Application routes.

**store**\
Redux Toolkit slices and state management.

**service**\
Axios API calls.

**types**\
Shared TypeScript interfaces.

**utils**\
Helper functions.

------------------------------------------------------------------------

## Backend

src/ - controllers/ - routes/ - services/ - schemas/ - prisma/ - utils/

**controllers**\
Handles API requests.

**routes**\
Defines Elysia routes.

**services**\
Business logic layer.

**schemas**\
Zod validation schemas.

**prisma**\
Prisma client and database schema.

**utils**\
Helper utilities.

------------------------------------------------------------------------

# Database Design

The system uses **PostgreSQL with Prisma ORM** to manage relational data
between users, issues, and comments.

## Core Entities

-   Users
-   Issues
-   Issue Comments

### Relationships

-   A **user can create many issues**
-   A **user can be assigned many issues**
-   An **issue can have many comments**
-   A **user can write many comments**

------------------------------------------------------------------------

# Prisma Schema Models

## Users

Represents application users who can create issues, be assigned issues,
and comment on issues.

Fields:

-   users_id (UUID - Primary Key)
-   email (Unique)
-   phone (Optional)
-   first_name
-   last_name
-   full_name
-   password
-   profile_image
-   created_at
-   updated_at
-   is_deleted
-   is_active

Relationships:

-   Issues created by the user
-   Issues assigned to the user
-   Comments written by the user

------------------------------------------------------------------------

## Issue

Represents a task or issue in the system.

Fields:

-   issue_id (UUID - Primary Key)
-   title
-   variant
-   description
-   labels (array)
-   status
-   priority
-   assignee
-   created_at
-   is_opened

Relationships:

-   Created by a user
-   Assigned to a user
-   Contains many comments

------------------------------------------------------------------------

## Issue Comment

Stores discussion and updates for an issue.

Fields:

-   issue_comment_id (UUID - Primary Key)
-   comment
-   created_at

Relationships:

-   Belongs to an issue
-   Written by a user

------------------------------------------------------------------------

# Enums

## Status

-   OPEN
-   IN_PROGRESS
-   REVIEW
-   CLOSED

## Priority

-   LOW
-   MEDIUM
-   HIGH

------------------------------------------------------------------------

# Installation

## Clone Repository

git clone `<repository_url>`{=html}


------------------------------------------------------------------------

# Frontend Setup

Install dependencies

bun install

bun run start

Frontend runs on:

http://localhost:5173

------------------------------------------------------------------------

# Backend Setup

cd backend

bun install

bun run start

Backend runs on:

http://localhost:5020

------------------------------------------------------------------------

# State Management

Redux Toolkit handles:

-   Authentication state
-   Global UI state

React Query handles:

-   API data fetching
-   caching
-   background refetching

------------------------------------------------------------------------

# Validation

Zod is used for:

-   Form validation
-   API request validation
-   Schema validation

------------------------------------------------------------------------

# Error Handling

The application includes:

-   API error responses
-   UI error notifications (React Toastify)
-   Validation errors via Zod

------------------------------------------------------------------------

# Future Improvements

-   With more time and resources, the following enhancements could be added to improve the Issue Tracker Dashboard:

# Advanced Filtering & Sorting

-   Filter issues by multiple labels, users, and date ranges.
-   Sort issues by priority, status, creation date, or last activity.

# Search Functionality

-   Global search for issues, comments, and users.
-   Full-text search on issue titles and descriptions.

# Notifications & Real-Time Updates

-   Email or in-app notifications for new comments, assignments, and status changes.
-   WebSocket or SignalR integration for real-time updates on dashboards and comments.

# User Roles & Permissions

-   Granular role-based access control (Admin, Manager, Developer, Viewer).
-   Restrict access to specific projects or actions based on roles.

# Project & Milestone Management

-   Organize issues into projects or sprints.
-   Track milestones and deadlines visually.

# Issue History & Audit Logs

-   Maintain a detailed change log for each issue (status changes, reassignment, edits).
-   Audit logs for security and accountability.

# Attachments & Rich Media Support

-   Allow users to attach files, images, or code snippets to issues or comments.
-   Preview attachments directly within the dashboard.

# UI/UX Enhancements

-   Dark mode toggle.
-   Drag-and-drop Kanban board for issue status tracking.
-   Customizable dashboards per user preferences.

# Analytics & Reporting

-   Generate reports for completed issues, team performance, and bottlenecks.
-   Charts and graphs for visual insights into project health.

# Mobile Support

-   Fully responsive design for mobile and tablet devices.
-   Option to build a mobile app version for on-the-go issue management.

# Integration with External Tools

-   Slack, Microsoft Teams, or email integrations for notifications.
-   GitHub/GitLab integration to link commits or pull requests to issues.

# Enhanced Security & Performance

-   Rate-limiting, API throttling, and audit trails.
-   Optimize database queries for large-scale issue tracking.