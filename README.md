# 💬 ChatBot Web App using ChatGPT 4.1 Mini API

A simple React-based chatbot web application that interacts with OpenAI's GPT-4.1 Mini model using the official OpenAI API.

## 🚀 Getting Started (Development Mode)

1. Create a `.env` file in the root directory:

```
example:
VITE_OPENAI_API_KEY=YOUR_API_KEY_HERE
```

⚠️ Do not include this file in version control (.gitignore should contain .env)

2. Install dependencies and start the development server:

```
cd ./chatGPT-chatbot
npm install
npm run dev
```

## 🐳 Running with Docker

1. Create a `.env` file in the root directory:

```
example:
VITE_OPENAI_API_KEY=YOUR_API_KEY_HERE
```

⚠️ Do not include this file in version control (.gitignore should contain .env)

```
# build
docker build -t gpt-chatbot .

# run
docker run -d -p 3000:80 gpt-chatbot
```

Then open:
http://localhost:3000

## 📦 Libraries Used

| Library                  | Description                                  |
| :----------------------- | :------------------------------------------- |
| Vite                     | Project bundler and development environment  |
| openai                   | Official SDK for OpenAI API requests         |
| react-syntax-highlighter | Syntax highlighting for code block rendering |
| Nginx(Docker)            | To serve static build in container           |
