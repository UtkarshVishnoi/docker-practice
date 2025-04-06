# 🎮 Tic-Tac-Toe

A full-stack Tic-Tac-Toe game built with **React (frontend)** and **Node.js (backend)**, containerized using **Docker**, and deployed using **Kubernetes** on **Minikube**.

---

## 📦 Project Structure

- **Frontend** runs on port **5173**
- **Backend (Node.js server)** runs on port **5000**
- Dockerized into a single image
- Kubernetes setup with:
  - Deployment (3 replicas)
  - NodePort Service
  - Horizontal Pod Autoscaler (HPA)

---

## ☸️ Kubernetes Setup

### 1. **Deployment**
- Runs 3 replicas of the combined frontend-backend container.
- Resource requests and limits are defined.

### 2. **Horizontal Pod Autoscaler**
- Automatically scales pods between **2** and **5** replicas.
- Triggered when CPU utilization exceeds **50%**.

### 3. **Service**
- Exposes ports **5173** (frontend) and **5000** (backend) using **NodePort**.
- Accessible via Minikube IP and forwarded ports.

---

## 🚀 How to Run

### 1. **Start Minikube**
\`\`\`bash
minikube start --nodes 2
\`\`\`

### 2. **Apply Kubernetes Resources**
\`\`\`bash
kubectl apply -f ./k8s
\`\`\`


### 3. **Port Forwarding**
\`\`\`bash
kubectl port-forward service/tic-tac-toe-service 5173:5173 5000:5000
\`\`\`

### 4. **Access the App**

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## 🛠 Maintained By

**Utkarsh Vishnoi**  
Docker Hub: [utkarshvishnoi2004](https://hub.docker.com/u/utkarshvishnoi2004)