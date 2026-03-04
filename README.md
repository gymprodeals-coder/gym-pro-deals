# GymProDeals - Full-Stack Affiliate Web Application

A modern, scalable full-stack web application designed for aggregating fitness deals, built with Next.js (App Router), Node.js, Express, and MongoDB.

## Project Structure

\`\`\`
/gym-pro-deals
   ├── frontend/     # Next.js 14 App Router, Bootstrap 5
   └── backend/      # Node.js, Express, MongoDB
\`\`\`

## Key Features
- **Frontend**: Next.js App Router, SSR/SSG, dynamic Schema markup (JSON-LD), Cuelinks verified, Bootstrap 5 UI.
- **Backend**: Express REST API, MongoDB (Mongoose), Custom JWT-based Admin Authentication, Click tracking.

## Environment Variables

### Backend (\`backend/.env\`)
\`\`\`env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/gymprodeals?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=https://gymprodeals.vercel.app
SETUP_SECRET=secret_key_to_create_initial_admin
\`\`\`

### Frontend (\`frontend/.env.local\`)
\`\`\`env
NEXT_PUBLIC_API_URL=https://gymprodeals-backend.onrender.com
\`\`\`

## Local Development

### Backend 
1. \`cd backend\`
2. \`npm install\`
3. Create \`.env\` file based on the example above.
4. \`npm start\`
*(Ensure MongoDB is connected)*

**To create the first admin:**
Make a POST request to \`http://localhost:5000/api/admin/setup\` with JSON body:
\`\`\`json
{
  "email": "admin@gymprodeals.com",
  "password": "yourpassword123",
  "secret": "secret_key_to_create_initial_admin"
}
\`\`\`

### Frontend
1. \`cd frontend\`
2. \`npm install\`
3. Start the dev server: \`npm run dev\`
4. Visit \`http://localhost:3000\`

---

## Deployment Instructions

### Backend (Render / Heroku)
1. Commit your backend code to a Git repository.
2. In Render, create a new **Web Service**, select the repo, and set the Root Directory to \`backend\`.
3. Set **Build Command**: \`npm install\`
4. Set **Start Command**: \`node server.js\`
5. Add all Environment Variables from the \`backend/.env\` list into Render's Environment panel.
6. Deploy.

### Frontend (Vercel)
1. In Vercel, attach the same Git repository.
2. Set the Root Directory to \`frontend\`.
3. Framework Preset: Next.js
4. **Environment Variables**: Add \`NEXT_PUBLIC_API_URL\` pointing to your deployed Render backend URL.
5. Deploy.
