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
[![NODE.JS](https://img.shields.io/badge/Python-3.10+-green?style=for-the-badge&logo=python)](.)
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
- [Project Scope](#-project-scope)
- [Implementation Plan](#-implementation-plan)
- [Expected Outcomes](#-expected-outcomes)
- [Team](#-team)
- [References](#-references)

---

## 🧠 About the Project

Deepfake is a **lightweight, web-based deepfake and AI-generated media verifier** built as an academic project. As synthetic media becomes increasingly indistinguishable from reality, tools that help everyday users verify digital content are critical.

DeepScan analyzes uploaded images using:
- **Pre-trained AI classification models** (CNN / EfficientNet-based)
- **Visual artifact heuristics** — texture inconsistencies, edge anomalies, frequency patterns
- **Metadata forensics** — EXIF data cross-referencing

The system outputs a **probability score** (e.g., `72% — Likely AI-Generated`) in a clean, user-friendly interface — no technical expertise required.

> ⚠️ **Note:** This is a Light Version intended for academic and demonstration purposes. It does not provide legal or forensic-grade accuracy.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖼️ **Image Upload & Verification** | Drag-and-drop or click to upload images for instant analysis |
| 🤖 **Lightweight Deepfake Detection** | Optimized pre-trained model — fast inference, no GPU required |
| 📊 **AI Probability Score** | Clear 0–100% confidence meter — *Real* or *Synthetic* verdict |
| 🔎 **Metadata Analysis** | EXIF forensics — flags missing camera info & timestamp anomalies |
| 🎨 **React Component UI** | Built with reusable React components — responsive, fast, and state-driven |
| ⚡ **Fast Processing** | End-to-end pipeline completes in under 3 seconds |

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
│      Node.js / Express.js  ·  File Validator  ·  Router     │
└──────────┬──────────────────────────────┬───────────────────┘
           │                              │
           ▼                              ▼
┌──────────────────────┐      ┌───────────────────────────────┐
│  METADATA FORENSICS  │      │     DETECTION ENGINE          │
│  EXIF Parser         │      │  Preprocessor (OpenCV)        │
│  Timestamp Checker   │      │  Artifact Heuristics          │
│  Device Info Flags   │      │  Feature Extractor            │
└──────────┬───────────┘      └──────────────┬────────────────┘
           │                                  │
           │               ┌──────────────────▼────────────────┐
           │               │         ML MODEL LAYER            │
           │               │   Pre-trained Deepfake Classifier  │
           │               │   OpenCV-based Inference           │
           │               └──────────────────┬────────────────┘
           │                                  │
           └──────────────┬───────────────────┘
                          │  Weighted Score Fusion
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  SCORE AGGREGATOR                           │
│          Model Score + Artifact Score + Metadata Score      │
│                  → Final Probability %                      │
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
│ Preprocess  │  ← Resize · Normalize · Extract Metadata
└──────┬──────┘
       │
       ├──────────────────────────┐
       ▼                          ▼
┌─────────────┐          ┌────────────────┐
│  ML Model   │          │ Artifact Scan  │
│  Inference  │          │ + EXIF Forensic│
└──────┬──────┘          └───────┬────────┘
       │                          │
       └──────────┬───────────────┘
                  ▼
         ┌────────────────┐
         │Score Aggregator│
         └───────┬────────┘
                 │
                 ▼
        Display Result to User
      ┌─────────────────────────┐
      │  Probability: 72%       │
      │  Verdict: ⚠ SYNTHETIC   │
      │  Source: AI-Generated   │
      └─────────────────────────┘
```

**Step-by-step:**

1. **Upload** — User submits an image or video frame via the web interface
2. **Preprocess** — Resize, normalize, strip and preserve EXIF metadata
3. **Artifact Analysis** — Heuristic scan for GAN fingerprints, texture anomalies, lighting inconsistencies
4. **Model Inference** — CNN classifier produces a real vs. synthetic logit score
5. **Metadata Forensics** — EXIF cross-referencing; missing/anomalous fields flagged as synthetic signals
6. **Score Fusion** — Weighted ensemble of model + heuristic + metadata scores
7. **Result Display** — Probability meter, verdict, and signal summary shown to user

---

## 🛠️ Tech Stack

**Frontend**
```
React.js    JavaScript (ES6+)    CSS3    HTML5
```

**Backend**
```
Node.js    Express.js    REST API
```

**Database**
```
MongoDB
```

**ML & Image Processing**
```
OpenCV    Pre-trained Deepfake Detection Model
```

**Dataset**
```
Sample real and AI-generated images (for testing)
```

---

## 📐 Project Scope

### ✅ In Scope
- Detection of AI-generated and deepfake **images**
- Analysis of image **visual artifacts** and **metadata**
- Display of **probability scores** (Real / Synthetic verdict)
- Simple, clean **web-based user interface**

### ❌ Out of Scope
- Real-time **video** deepfake detection
- **Legal or forensic-grade** accuracy
- Detection of **all future AI models**

---

## 📅 Implementation Plan

```
Phase 1  ██████████  Requirement Analysis & Problem Understanding   ✅ Done
Phase 2  ██████████  Dataset & Pre-trained Model Selection          ✅ Done
Phase 3  ████████░░  System Architecture Design                     🔄 In Progress
Phase 4  ██████░░░░  Backend Development                            🔄 In Progress
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

---

<div align="center">

*Department of Computer Science & Engineering (CSED) · Section 2FH · Academic Project*

**Deepfake AI Verifier** — Fighting synthetic misinformation, one pixel at a time.

</div>
