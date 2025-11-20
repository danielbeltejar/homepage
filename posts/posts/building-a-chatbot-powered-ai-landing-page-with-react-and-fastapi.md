---
title: "Building a Chatbot-Powered AI Landing Page with React and FastAPI"
date: "2024-11-20"
author: "Daniel Beltejar"
---

## Introduction  
These days, in the fast-paced world of online shopping, adding chatbots to landing pages can really spice things up. They make the site more interactive and can help drive more sales. I built this full-stack app for a fictional car dealership to explore that idea. It features a React front-end, a FastAPI back-end with an AI chatbot powered by Ollama and Qwen3, and an API gateway for secure routing. Everything's deployed on Kubernetes with Helm charts, showcasing modern web dev practices like responsive Tailwind CSS, real-time chat, and scalable microservices.  

![Landing Page Screenshot](https://danielbeltejar.es/assets/images/posts/3/car-dealership-landing.webp)

In this post, I'll break down the codebase's architecture, how I set it up, the key features, and some lessons I learned along the way. Whether you're a dev curious about full-stack stuff or a business owner eyeing AI for customer chats, this should give you a solid overview.  

---

## The Setup  

### 1. Prerequisites  
You'll need Node.js for the front-end and Python for the back-end. Also, Docker and a Kubernetes cluster (like Minikube locally or EKS in the cloud). Helm for managing packages, Ollama to run the Qwen3 AI model, and some basic know-how with React, TypeScript, FastAPI, and Kubernetes.  

### 2. Project Structure  
I organized the code into three main folders:  
- **front/**: The React app built with Vite, Tailwind CSS, and components for the landing page and live chat.  
- **back/**: The FastAPI server that handles car data, chat history, and AI chats via Ollama.  
- **apigw/**: An API gateway (a custom Go service) that routes requests securely.  

Each part comes with Kubernetes configs for easy deployment, keeping things portable and scalable.  

### 3. Front-End Development  
I built this with React 18, TypeScript, and Vite for quick dev and builds. Styled it all with Tailwind CSS, adding custom neumorphic shadows and responsive grids. It has a car inventory grid, sorting options, and a floating chat widget. Everything connects to the back-end through REST APIs for car data and chat messages.  

### 4. Back-End Development  
FastAPI powers the REST endpoints for cars, chat, and health checks. The chat uses Ollama to run Qwen3, which acts as a car sales agent named Maria. It handles sessions with client IDs, bans bad users, and sends JSON responses. CORS is enabled for front-end requests.  

### 5. API Gateway and Deployment  
The API gateway routes `/api/*` to the back-end, adding security and abstraction. Kubernetes deployments use Helm charts with best practices like non-root users and read-only filesystems. Ingress handles SSL and load balancing. You can hook up CI/CD for automated deploys.  

### 6. Running Locally  
To start the back-end: `uvicorn main:app --host 0.0.0.0 --port 8000`. For the front-end: `npm run build && npm run serve`. For the whole thing, use Docker Compose or run it on Kubernetes locally.  

---

## Case Study: Implementing AI-Powered Chat for Car Sales  

### Scenario  
Picture this: a car dealership wants to create an online experience where people can browse cars, ask about financing, and chat with an AI sales rep for personalized tips.  

### Challenges  
Getting real-time chat working without WebSockets was tricky, I went with polling to keep it simple. Making sure the AI stayed in character and dealt with weird requests was another hurdle. Plus, managing sessions with client IDs and local storage across visits.  

### Solution  
The front-end's [`LiveChatContainer`](front/src/App.tsx) handles the chat UI, sending messages to the back-end's `/chat` endpoint. The back-end runs messages through Ollama, with rules to ban users trying to jailbreak the AI. Car data loads dynamically, and the chat even updates the UI with car colors for a cool visual effect.  

### Outcome  
Users can have natural chats, get car recs, and even open the chat from car cards. It boosts retention with a 24/7 AI agent. The setup scales for multiple chats at once.  

![Chat Interface](https://danielbeltejar.es/assets/images/posts/3/chatbot-interface.webp)

---

## Key Lessons  

1. **Modular Architecture Really Helps**: Splitting the front-end, back-end, and gateway into separate services made dev, testing, and deploying way easier. Helm charts kept everything consistent on Kubernetes.  

2. **Security Comes First**: Always add input checks, rate limits, and secure your API keys. The back-end's ban feature stops abuse, and Kubernetes policies lock down network access.  

3. **AI Integration Tips**: Set clear prompts for the AI to keep it consistent. Handle weird cases like bad JSON responses without breaking.  

4. **Performance Tweaks**: Lazy load images, compress with Brotli, and cache static files. Keep an eye on API times for smooth chats.  

5. **Focus on User Experience**: Responsive design and easy interactions, like that floating chat button, really boost engagement. Test on different devices for accessibility.  

---

## Final Thoughts  
This project was a fun way to mix modern web tech with AI for something engaging. From React components that look great on any screen to FastAPI endpoints chatting with AI, it covers a lot of ground. Running it on Kubernetes makes it reliable and ready to scale. If you're building something similar, start small, tweak based on feedback, and don't skimp on security or speed.  

Check out the code on GitHub and tweak it for your own projects!  

---

## References  
- [FastAPI Guide](https://fastapi.tiangolo.com/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Kubernetes Helm](https://helm.sh/)  
- [Ollama AI Models](https://ollama.ai/)  
- [Project Repository](https://github.com/danielbeltejar/landing-chatbot)