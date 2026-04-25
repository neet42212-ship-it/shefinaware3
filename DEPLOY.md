# Deployment Guide - Shefinaware

This guide explains how to deploy the Shefinaware frontend and backend.

## 1. Backend Deployment (Render)

1.  **Create a MongoDB Atlas Cluster** (Recommended):
    *   Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    *   Create a free cluster and get your Connection String.
2.  **Deploy on Render**:
    *   Go to [Render](https://render.com/).
    *   Create a **New Web Service**.
    *   Connect your GitHub repository.
    *   Select the `backend` directory (if deploying separately) or use the `render.yaml` blueprint.
    *   **Environment Variables**:
        *   `GEMINI_API_KEY`: Your Google Gemini API Key.
        *   `MONGO_URI`: Your MongoDB Atlas connection string.
        *   `JWT_SECRET`: A random string for security.
        *   `PORT`: `5000`.

## 2. Frontend Deployment (Vercel)

1.  **Deploy on Vercel**:
    *   Go to [Vercel](https://vercel.com/).
    *   Create a **New Project**.
    *   Connect your GitHub repository.
    *   Select the `frontend` directory as the Root Directory.
    *   **Environment Variables**:
        *   `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://shefinaware-backend.onrender.com`).

## 3. Important Note on Data Persistence

The backend currently uses `database.json` by default. **Render's file system is ephemeral**, meaning all users registered while using `database.json` will be deleted whenever the server restarts.

**To fix this**, set the `MONGO_URI` environment variable in Render. The backend is already configured to automatically switch to MongoDB if that variable is present.
