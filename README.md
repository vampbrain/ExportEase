# ExportEase 🚀

ExportEase is a comprehensive export management platform that helps businesses streamline their export operations with features like compliance checking, FAQ assistance, and delivery price estimation.

- Deployed Link - [@https://exportease1.vercel.app](https://exportease1.vercel.app)

## 🌟 Features

### 1. Compliance Assistant
- Upload and analyze export compliance documents
- Real-time compliance requirement checking
- Interactive Q&A system for compliance queries
- PDF document support
- Dark mode support

### 2. FAQ Chatbot
- Instant responses to common export-related queries
- Context-aware conversation handling
- Multi-language support
- Interactive UI with message history

### 3. Delivery Price Estimation
- Real-time shipping cost calculation
- Multiple carrier support
- Weight and dimension-based pricing
- International shipping rate estimation

## 🛠️ Tech Stack

### Frontend
- React + Vite
- TailwindCSS
- ShadcnUI Components
- ReactMarkdown
- Lucide Icons

### Backend
- Node.js (Primary Backend)
- FastAPI (ML/AI Services)
- PostgreSQL (Database)

## 📁 Project Structure

```
ExportEase/
├── Frontend/
│   └── client/           # React + Vite frontend
│       ├── src/
│       ├── components/
│       └── public/
├── Backend/
│   ├── node/            # Node.js backend
│   │   ├── routes/
├── compliance_assistant/  # FastAPI backend
│       └── app/
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- npm or yarn
- MongoDB

### Frontend Setup
```bash
cd Frontend/client
npm install
npm run dev
```

### Node.js Backend Setup
```bash
cd Backend
npm install
npm start
```

### FastAPI Backend Setup
```bash
cd compliance_assistant/app
pip install -r requirements.txt
uvicorn main:app --reload
```

## 💻 API Endpoints

### Node.js Backend

```
POST /api/users/login
POST /api/users/signup
```

### FastAPI Backend

```
POST /ask/
GET /health
POST /faq/start
POST /faq/end
```

## 🧪 Testing

```bash
# Frontend Tests
cd Frontend/client
npm test

# Backend Tests
cd Backend/node
npm test
```

## 📦 Deployment

### Frontend
```bash
cd Frontend/client
npm run build
```

### Backend
```bash
# Node.js
cd Backend/node
npm run build

# FastAPI
cd compliance_assistant/app
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- AI Developer - [@Bharati](https://github.com/vampbrain)
- AI Developer - [@Yogesh](https://github.com/Yogesh-005)
- Fullstack Developer - [@Tarun](https://github.com/jmt-genius)
- Fullstack Developer - [@Aswin](https://github.com/aswin-codes)

## 🙏 Acknowledgments

- [ShadcnUI](https://ui.shadcn.com/) for the beautiful UI components
- [FastAPI](https://fastapi.tiangolo.com/) for the ML backend
