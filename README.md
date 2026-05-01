# Transport Management System (TMS)

A professional, technical dashboard for managing Network Transport Resources, built using the ONF TAPI (Transport API) principles.

## 🚀 Overview

This project provides a robust interface for network engineers to provision, monitor, and decommission transport resources. It features a "Technical Blueprint" design aesthetic, focusing on clarity, precision, and high-density data management.

### Key Features
- **Resource Provisioning**: Create new transport paths with defined source, destination, and bandwidth.
- **Live Monitor**: Real-time inventory of all provisioned resources with status indicators.
- **Dynamic Configuration**: Update existing resource parameters (Status, Bandwidth) on the fly.
- **Status Lifecycle**: Manage resources through `ACTIVE`, `INACTIVE`, and `MAINTENANCE` states.
- **Technical UI**: A specialized dashboard built for engineering clarity using Tailwind CSS.

## 🛠 Tech Stack

### Frontend
- **React.js**: Functional components with Hooks.
- **Tailwind CSS**: Custom "Technical Blueprint" design system.
- **Lucide React**: Engineering-grade iconography.
- **State Management**: Local React state with optimized `useCallback` patterns.

### Backend
- **Java / Spring Boot**: Robust REST API for transport resource persistence.
- **Maven**: Dependency and build management.
- **H2/MySQL/PostgreSQL**: (Configurable database backend).

## 📂 Project Structure

```
.
├── transport-api/          # Java Spring Boot Backend
├── transport-frontend/     # React + Tailwind Frontend
├── run-backend.ps1        # PowerShell script to start Backend
├── run-frontend.ps1       # PowerShell script to start Frontend
└── RUN_BOTH_INSTRUCTIONS.txt # Comprehensive setup guide
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v16+)
- Java JDK 17+
- Maven

### Installation & Execution

1. **Start the Backend**:
   ```powershell
   ./run-backend.ps1
   ```
   *The API will be available at `http://localhost:8080`*

2. **Start the Frontend**:
   ```powershell
   ./run-frontend.ps1
   ```
   *The Dashboard will be available at `http://localhost:3000`*

## 📖 Viva / Examination Guide

This project is designed to be easily explained during a technical review:
- **Architecture**: Decoupled Client-Server architecture using RESTful principles.
- **UI Design**: Utility-first CSS (Tailwind) for a lightweight, performant frontend.
- **Protocol**: Inspired by ONF TAPI (Transport API) models for networking.
- **Clean Code**: Follows modern React patterns (Functional Components, Hooks, Prop-drilling avoidance).

---
Developed for the Networking Management Techniques Capstone Project.
