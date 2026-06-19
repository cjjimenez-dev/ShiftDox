# ShiftDox - The Ultimate Document Conversion Suite

ShiftDox is a fast, highly secure, and beautifully designed serverless document conversion application. It features a premium glassmorphic frontend built with React and a highly scalable serverless backend hosted on Vercel.

## ✨ Features
- **Premium Dark UI:** Stunning glassmorphism design with fluid micro-animations powered by Framer Motion.
- **Serverless Architecture:** No traditional backend required. All API routes run natively on Vercel Serverless Functions (Node.js).
- **Google Authentication:** Secure, one-click login and registration via `@react-oauth/google`.
- **Drag & Drop Conversions:** Easy file uploading with dedicated tools for specific conversions.
- **8 Dedicated Conversion Tools:** 
  - PDF to Word & Word to PDF
  - PDF to Excel & Excel to PDF
  - PDF to PPT & PPT to PDF
  - PDF to JPG & JPG to PDF
- **CloudConvert Engine:** Files are securely processed in a sandboxed environment using the CloudConvert API.

## 🛠 Tech Stack
### **Frontend**
- **Framework:** React 19 (via Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Vanilla CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM v7
- **Auth:** Google OAuth 2.0 (`@react-oauth/google`)

### **Backend & Infrastructure**
- **Hosting / Platform:** Vercel
- **API Runtime:** Vercel Serverless Functions (Node.js)
- **Form Parsing:** Formidable
- **Conversion API:** CloudConvert Node.js SDK

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A [CloudConvert API Key](https://cloudconvert.com/api/v2)
- A Google Cloud OAuth Client ID

### Installation
1. Clone the repository and navigate into the `frontend` folder:
```bash
git clone https://github.com/your-username/ShiftDox.git
cd ShiftDox/frontend
```

2. Install all dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory and add your keys:
```env
CLOUDCONVERT_API_KEY=your_cloudconvert_api_key_here
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
```

### Running Locally
To test the entire app (including the Vercel serverless functions) locally, it is recommended to use the Vercel CLI:
```bash
npx vercel dev
```
*(Alternatively, you can just run `npm run dev` to test the UI without the backend).*

## 🌐 Deployment
This application is fully optimized for **Vercel**. 
Simply link your GitHub repository to Vercel, set the **Root Directory** to `frontend`, and add your Environment Variables (`CLOUDCONVERT_API_KEY` and `VITE_GOOGLE_CLIENT_ID`) in the Vercel Dashboard. Vercel will automatically compile the React app and host the API serverless functions!
