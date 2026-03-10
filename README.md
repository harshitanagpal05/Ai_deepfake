<div align="center">

```
██████╗ ███████╗███████╗██████╗ ███████╗ █████╗ ██╗  ██╗███████╗
██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗██║ ██╔╝██╔════╝
██║  ██║█████╗  █████╗  ██████╔╝█████╗  ███████║█████╔╝ █████╗
██║  ██║██╔══╝  ██╔══╝  ██╔═══╝ ██╔══╝  ██╔══██║██╔═██╗ ██╔══╝
██████╔╝███████╗███████╗██║     ██║     ██║  ██║██║  ██╗███████╗
╚═════╝ ╚══════╝╚══════╝╚═╝     ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
                    AI-Generated Media Verifier
```

### 🔍 AI-Generated Media Verifier — Light Edition

[![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)](.)
[![Version](https://img.shields.io/badge/Version-1.0%20Light-blue?style=for-the-badge)](.)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](.)
[![MongoDB](https://img.shields.io/badge/MongoDB-Connected-brightgreen?style=for-the-badge&logo=mongodb)](.)
[![License](https://img.shields.io/badge/License-Academic-purple?style=for-the-badge)](.)

*A lightweight, web-based system that detects whether uploaded images are AI-generated or real.*

**Department of Computer Science & Engineering (CSED) · Section 2FH**

</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Workflow](#-workflow)
- [Tech Stack](#-tech-stack)
- [API Endpoints](#-api-endpoints)
- [Project Scope](#-project-scope)
- [Implementation Plan](#-implementation-plan)
- [Expected Outcomes](#-expected-outcomes)
- [Getting Started](#-getting-started)
- [Team](#-team)
- [References](#-references)

---

## 🧠 About the Project

**DeepScan** is a lightweight, web-based deepfake and AI-generated media verifier built as an academic project. As synthetic media becomes increasingly indistinguishable from reality, tools that help everyday users verify digital content are critical.

DeepScan analyzes uploaded images using a **3-layer detection pipeline**:
- **Visual Artifact Heuristics** — color variance, edge sharpness, brightness anomalies via Sharp
- **Metadata Forensics** — EXIF data cross-referencing, camera info, software detection
- **Weighted Score Aggregation** — combines all signals into a final probability score

The system outputs a **probability score** (e.g., `72% — Likely AI-Generated`) with a confidence rating and detailed breakdown — no technical expertise required.

> ⚠️ **Note:** This is a Light Version intended for academic and demonstration purposes. It does not provide legal or forensic-grade accuracy.

---

## ✨ Features

| Feature | Description | Status |
|---|---|---|
| 🖼️ **Image Upload & Verification** | Drag-and-drop or click to upload images for instant analysis | ✅ Done |
| 🤖 **Artifact Detection** | Heuristic scan — color variance, edge anomalies, brightness | ✅ Done |
| 📊 **AI Probability Score** | Clear 0–100% confidence score — *Real* or *Synthetic* verdict | ✅ Done |
| 🔎 **Metadata Forensics** | EXIF parsing — flags missing camera info, AI software, timestamps | ✅ Done |
| ⚖️ **Weighted Score Fusion** | Model + Artifact + Metadata scores combined intelligently | ✅ Done |
| 🗄️ **Result Logging** | Every scan saved to MongoDB with timestamp and breakdown | ✅ Done |
| 🎨 **React Component UI** | Built with reusable React components — responsive, fast, state-driven | ⏳ Pending |
| ⚡ **Fast Processing** | End-to-end pipeline completes in under 3 seconds | ✅ Done |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 1 — FRONTEND                       │
│      React.js  ·  Component UI  ·  Upload Widget  ·  Axios  │
└─────────────────────┬───────────────────────────────────────┘
                      │  HTTP Request (multipart/form-data)
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 LAYER 2 — API GATEWAY                       │
│      Node.js / Express.js  ·  Multer Validator  ·  Router   │
└──────────┬──────────────────────────────┬───────────────────┘
           │                              │
           ▼                              ▼
┌──────────────────────┐      ┌───────────────────────────────┐
│  METADATA FORENSICS  │      │     DETECTION ENGINE          │
│  EXIF Parser (exifr) │      │  Sharp Image Processor        │
│  Timestamp Checker   │      │  Color Variance Analysis      │
│  AI Software Flags   │      │  Edge Sharpness Heuristics    │
│  Camera Info Check   │      │  Brightness Anomaly Check     │
└──────────┬───────────┘      └──────────────┬────────────────┘
           │                                  │
           └──────────────┬───────────────────┘
                          │  Weighted Score Fusion
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  SCORE AGGREGATOR                           │
│   Model (50%) + Artifact (30%) + Metadata (20%)             │
│                  → Final Probability %                      │
│         → Verdict: REAL / UNCERTAIN / SYNTHETIC             │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
              Result returned to UI
         [ 72% — ⚠ LIKELY SYNTHETIC ]

          ┌────────────────────────┐
          │        MongoDB         │
          │  Store results & logs  │
          └────────────────────────┘
```

---

## 🔄 Workflow

```
User Uploads Image
       │
       ▼
┌─────────────┐
│  Validate   │  ← File type · Size limit · Multer
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Preprocess  │  ← Resize · Normalize · Extract Metadata
└──────┬──────┘
       │
       ├──────────────────────────┐
       ▼                          ▼
┌─────────────┐          ┌────────────────┐
│  Artifact   │          │    Metadata    │
│  Analysis   │          │   Forensics    │
│  (Sharp)    │          │   (exifr)      │
└──────┬──────┘          └───────┬────────┘
       │                          │
       └──────────┬───────────────┘
                  ▼
         ┌────────────────┐
         │Score Aggregator│  ← Weighted fusion
         └───────┬────────┘
                 │
                 ▼
         ┌──────────────┐
         │  Save to DB  │  ← MongoDB logging
         └───────┬──────┘
                 │
                 ▼
        Display Result to User
      ┌─────────────────────────┐
      │  Final Score: 72%       │
      │  Verdict: ⚠ SYNTHETIC   │
      │  Confidence: Medium     │
      │  Breakdown: shown       │
      └─────────────────────────┘
```

**Step-by-step:**

1. **Upload** — User submits an image via the web interface (JPEG, PNG, WEBP · max 5MB)
2. **Validate** — Multer checks file type and size before processing
3. **Artifact Analysis** — Sharp-based heuristics scan color variance, edge sharpness, brightness
4. **Metadata Forensics** — EXIF cross-referencing; missing/anomalous fields flagged as synthetic signals
5. **Score Fusion** — Weighted ensemble: Model 50% + Artifact 30% + Metadata 20%
6. **DB Logging** — Result saved to MongoDB with full breakdown and timestamp
7. **Result Display** — Score, verdict, confidence, and signal summary returned to frontend

---

## 🛠️ Tech Stack

**Frontend**
```
React.js    JavaScript (ES6+)    CSS3    Axios
```

**Backend**
```
Node.js    Express.js    Multer    REST API
```

**Image Analysis**
```
Sharp    exifr    Heuristic Artifact Detection
```

**Database**
```
MongoDB    Mongoose
```

**Tools**
```
Postman    VS Code    Git    GitHub
```

---

## 📡 API Endpoints

### `POST /api/analyze`
Upload an image for deepfake analysis.

**Request**
```
Body: form-data
Key:  image (type: File)
Allowed: .jpg · .jpeg · .png · .webp (max 5MB)
```

**Response**
```json
{
  "id": "69b03d5a06d049d960e7937c",
  "final_score": 72,
  "verdict": "LIKELY SYNTHETIC",
  "confidence": "Medium",
  "breakdown": {
    "model_score": 68,
    "artifact_score": 75,
    "metadata_score": 85
  },
  "flags": ["No EXIF data found — strong synthetic signal"],
  "analyzed_at": "2026-03-10T15:48:42.235Z"
}
```

### `GET /api/results`
Fetch last 20 scan results from database.

**Response**
```json
{
  "results": [ ...array of past scans... ]
}
```

---

## 📐 Project Scope

### ✅ In Scope
- Detection of AI-generated and deepfake **images**
- Analysis of image **visual artifacts** and **metadata**
- Display of **probability scores** with verdict and confidence
- Simple, clean **web-based user interface**
- **Result history** stored in MongoDB

### ❌ Out of Scope
- Real-time **video** deepfake detection
- **Legal or forensic-grade** accuracy
- Detection of **all future AI models**

---

## 📅 Implementation Plan

```
Phase 1  ██████████  Requirement Analysis & Problem Understanding   ✅ Done
Phase 2  ██████████  Dataset & Pre-trained Model Selection          ✅ Done
Phase 3  ██████████  System Architecture Design                     ✅ Done
Phase 4  ██████████  Backend Development                            ✅ Done
Phase 5  ░░░░░░░░░░  Frontend Development                           ⏳ Pending
Phase 6  ░░░░░░░░░░  Frontend–Backend Integration                   ⏳ Pending
Phase 7  ░░░░░░░░░░  Testing & Performance Evaluation               ⏳ Pending
Phase 8  ░░░░░░░░░░  Deployment & Documentation                     ⏳ Pending
```

---

## 🎯 Expected Outcomes

By project completion, DeepScan will:

- ✔ Detect AI-generated images with **reasonable academic-grade accuracy**
- ✔ Provide **probability-based verification results** with a visual confidence meter
- ✔ Help users understand whether media content is **real or synthetic**
- ✔ Serve as a **practical, educational tool** against digital misinformation

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB running locally on port 27017

### Backend Setup
```bash
cd deepscan-backend
npm install
node server.js
```

### Environment Variables
Create a `.env` file in `deepscan-backend/`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/deepscan
```

### Frontend Setup
```bash
cd deepscan-frontend
npm install
npm start
```

---

## 👥 Team

| Name | Role | ID |
|---|---|---|
| **Harshita Nagpal** | Frontend Development & Documentation | 12515990016 |
| **Arpita Raj** | Frontend Development & UI Design | 12515990007 |
| **Naman Singh** | Backend Development & Testing | 12515990024 |
| **Anurag Singh** | Backend Development & System Analysis | 12515990006 |

**Project Supervisor:** Mr. Abhishek Singh *(Technical Trainer)*
**Submitted To:** Mr. Sanjay Madaan

---

## 📚 References

1. Research papers on Deepfake Detection
2. Open-source AI-generated image detection models
3. IEEE and ACM digital libraries
4. Online resources — computer vision & deep learning documentation
5. Public deepfake & AI-generated image datasets (Kaggle, FaceForensics++)
6. Sharp.js documentation — image processing
7. exifr documentation — EXIF metadata parsing

---

<div align="center">

*Department of Computer Science & Engineering (CSED) · Section 2FH · Academic Project*

**DeepScan** — Fighting synthetic misinformation, one pixel at a time.

</div>
