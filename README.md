<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DeepScan — README</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #04060f;
    --surface: #0b0f1e;
    --surface2: #111827;
    --accent: #00f5c4;
    --accent2: #ff3c6e;
    --accent3: #7c5cfc;
    --text: #e2e8f0;
    --muted: #64748b;
    --border: #1e2d40;
    --glow: 0 0 30px rgba(0, 245, 196, 0.15);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    line-height: 1.7;
    overflow-x: hidden;
  }

  /* Scanline overlay */
  body::before {
    content: '';
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,196,0.01) 2px, rgba(0,245,196,0.01) 4px);
    pointer-events: none;
    z-index: 1000;
  }

  /* Noise grain */
  body::after {
    content: '';
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 999;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    border-bottom: 1px solid var(--border);
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 70% 50%, rgba(124,92,252,0.08) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 20% 80%, rgba(0,245,196,0.06) 0%, transparent 70%),
      radial-gradient(ellipse 50% 40% at 80% 10%, rgba(255,60,110,0.05) 0%, transparent 70%);
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,245,196,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,245,196,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    padding: 4rem 2rem;
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
  }

  .badge-row {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    animation: fadeUp 0.6s ease both;
  }

  .badge {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    padding: 0.25rem 0.75rem;
    border-radius: 2px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .badge-green { background: rgba(0,245,196,0.1); color: var(--accent); border: 1px solid rgba(0,245,196,0.3); }
  .badge-red { background: rgba(255,60,110,0.1); color: var(--accent2); border: 1px solid rgba(255,60,110,0.3); }
  .badge-purple { background: rgba(124,92,252,0.1); color: var(--accent3); border: 1px solid rgba(124,92,252,0.3); }
  .badge-blue { background: rgba(59,130,246,0.1); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); }

  .hero-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: var(--accent);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    animation: fadeUp 0.6s 0.1s ease both;
  }

  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(4rem, 10vw, 8rem);
    line-height: 0.9;
    letter-spacing: 0.02em;
    color: #fff;
    margin-bottom: 0.25rem;
    animation: fadeUp 0.6s 0.2s ease both;
  }

  .hero-title span {
    color: var(--accent);
    text-shadow: 0 0 40px rgba(0,245,196,0.4);
  }

  .hero-subtitle {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(1.5rem, 4vw, 2.8rem);
    color: var(--muted);
    letter-spacing: 0.05em;
    margin-bottom: 2rem;
    animation: fadeUp 0.6s 0.3s ease both;
  }

  .hero-desc {
    max-width: 600px;
    color: var(--muted);
    font-size: 1rem;
    margin-bottom: 2.5rem;
    animation: fadeUp 0.6s 0.4s ease both;
  }

  .hero-desc strong { color: var(--text); }

  .scan-line {
    width: 100%;
    max-width: 500px;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), transparent);
    margin-bottom: 2rem;
    animation: scanRight 2s ease infinite;
  }

  @keyframes scanRight {
    0% { width: 0; opacity: 1; }
    70% { opacity: 1; }
    100% { width: 100%; opacity: 0; }
  }

  /* Stats bar */
  .stats-bar {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 1.5rem 0;
    border-top: 1px solid var(--border);
    animation: fadeUp 0.6s 0.5s ease both;
  }

  .stat { display: flex; flex-direction: column; }
  .stat-val {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    color: var(--accent);
    line-height: 1;
  }
  .stat-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* ── SECTIONS ── */
  section {
    padding: 5rem 0;
    border-bottom: 1px solid var(--border);
    animation: fadeUp 0.6s ease both;
  }

  .section-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: var(--accent);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .section-label::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: var(--accent);
  }

  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    letter-spacing: 0.03em;
    color: #fff;
    margin-bottom: 2rem;
  }

  .section-title span { color: var(--accent); }

  /* ── TEAM CARDS ── */
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .team-card {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s;
  }

  .team-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent3));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .team-card:hover { border-color: rgba(0,245,196,0.3); }
  .team-card:hover::before { transform: scaleX(1); }

  .team-role {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    color: var(--accent);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .team-name {
    font-weight: 500;
    color: #fff;
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
  }

  .team-id {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: var(--muted);
  }

  /* ── WORKFLOW ── */
  .workflow {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
  }

  .workflow::before {
    content: '';
    position: absolute;
    left: 24px;
    top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, var(--accent), var(--accent3), transparent);
  }

  .workflow-step {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    padding: 1.5rem 0;
    position: relative;
  }

  .step-num {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    background: var(--surface);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: var(--accent);
    position: relative;
    z-index: 1;
  }

  .step-content {}
  .step-title {
    font-weight: 500;
    color: #fff;
    margin-bottom: 0.25rem;
  }

  .step-desc {
    color: var(--muted);
    font-size: 0.9rem;
  }

  /* ── ARCHITECTURE ── */
  .arch-diagram {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
  }

  .arch-diagram::after {
    content: 'SYSTEM ARCHITECTURE';
    position: absolute;
    top: 1rem; right: 1rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.55rem;
    color: var(--muted);
    letter-spacing: 0.15em;
  }

  .arch-layer {
    margin-bottom: 1.5rem;
  }

  .arch-layer-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    color: var(--muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  .arch-boxes {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .arch-box {
    padding: 0.6rem 1.2rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    border: 1px solid;
    border-radius: 2px;
    white-space: nowrap;
  }

  .arch-box.frontend { border-color: rgba(96,165,250,0.4); color: #60a5fa; background: rgba(96,165,250,0.05); }
  .arch-box.backend { border-color: rgba(0,245,196,0.4); color: var(--accent); background: rgba(0,245,196,0.05); }
  .arch-box.model { border-color: rgba(124,92,252,0.4); color: var(--accent3); background: rgba(124,92,252,0.05); }
  .arch-box.data { border-color: rgba(255,60,110,0.4); color: var(--accent2); background: rgba(255,60,110,0.05); }

  .arch-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0;
  }

  .arch-arrow svg {
    opacity: 0.4;
  }

  .arch-connector {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .arch-connector::before,
  .arch-connector::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── FEATURES ── */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }

  .feature-item {
    background: var(--surface);
    padding: 1.5rem;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    transition: background 0.2s;
  }

  .feature-item:hover { background: var(--surface2); }

  .feature-icon {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    background: var(--surface2);
    border: 1px solid var(--border);
  }

  .feature-text {}
  .feature-name {
    font-weight: 500;
    color: #fff;
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
  }

  .feature-desc {
    color: var(--muted);
    font-size: 0.8rem;
  }

  /* ── TECH STACK ── */
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-pill {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    padding: 0.4rem 1rem;
    border: 1px solid var(--border);
    color: var(--text);
    background: var(--surface);
    transition: all 0.2s;
    cursor: default;
  }

  .tech-pill:hover {
    border-color: var(--accent);
    color: var(--accent);
    box-shadow: var(--glow);
  }

  /* ── STATUS TERMINAL ── */
  .terminal {
    background: #000;
    border: 1px solid var(--border);
    overflow: hidden;
    font-family: 'Space Mono', monospace;
  }

  .terminal-bar {
    background: var(--surface2);
    padding: 0.6rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1px solid var(--border);
  }

  .terminal-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
  }

  .dot-red { background: #ff5f57; }
  .dot-yellow { background: #febc2e; }
  .dot-green { background: #28c840; }

  .terminal-title {
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.05em;
    margin-left: 0.5rem;
  }

  .terminal-body {
    padding: 1.5rem;
    font-size: 0.78rem;
    line-height: 2;
  }

  .t-prompt { color: var(--accent); }
  .t-cmd { color: #fff; }
  .t-out { color: var(--muted); }
  .t-ok { color: #28c840; }
  .t-warn { color: #febc2e; }
  .t-err { color: var(--accent2); }
  .t-cyan { color: #7dd3fc; }

  .cursor {
    display: inline-block;
    width: 8px;
    height: 1em;
    background: var(--accent);
    vertical-align: text-bottom;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }

  /* ── SCOPE TABLE ── */
  .scope-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.88rem;
  }

  .scope-table th {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }

  .scope-table td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(30,45,64,0.5);
    vertical-align: top;
    color: var(--text);
  }

  .scope-table tr:hover td { background: rgba(0,245,196,0.02); }

  .check { color: var(--accent); }
  .cross { color: var(--accent2); }

  /* ── OUTCOME CARDS ── */
  .outcome-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }

  .outcome-card {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
  }

  .outcome-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 2px;
    background: linear-gradient(90deg, var(--accent3), var(--accent));
  }

  .outcome-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
  .outcome-title { font-weight: 500; color: #fff; margin-bottom: 0.4rem; }
  .outcome-desc { color: var(--muted); font-size: 0.85rem; }

  /* ── FOOTER ── */
  footer {
    padding: 4rem 0 2rem;
    text-align: center;
  }

  .footer-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }

  .footer-sub {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: var(--border);
    letter-spacing: 0.15em;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Probability meter */
  .prob-meter {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .prob-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    flex-shrink: 0;
  }

  .prob-bar-wrap {
    flex: 1;
    height: 4px;
    background: var(--surface2);
    position: relative;
  }

  .prob-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    width: 72%;
    box-shadow: 0 0 10px rgba(0,245,196,0.4);
    transition: width 1s ease;
  }

  .prob-val {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.8rem;
    color: var(--accent);
    flex-shrink: 0;
  }

  .result-tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    padding: 0.3rem 0.75rem;
    background: rgba(255,60,110,0.1);
    color: var(--accent2);
    border: 1px solid rgba(255,60,110,0.3);
    flex-shrink: 0;
  }

  hr.divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 2rem 0;
  }
</style>
</head>
<body>

<!-- ── HERO ── -->
<div class="hero">
  <div class="hero-bg"></div>
  <div class="hero-grid"></div>
  <div class="hero-content">
    <div class="badge-row">
      <span class="badge badge-green">● Active Development</span>
      <span class="badge badge-red">AI Detection</span>
      <span class="badge badge-purple">v1.0 Light</span>
      <span class="badge badge-blue">Academic Project</span>
    </div>
    <div class="hero-eyebrow">// Project Synopsis — 2FH | CSA Dept.</div>
    <h1 class="hero-title">DEEP<span>SCAN</span></h1>
    <div class="hero-subtitle">AI-Generated Media Verifier</div>
    <p class="hero-desc">A <strong>lightweight, web-based system</strong> that detects whether uploaded images or video frames are AI-generated or real — powered by pre-trained models, artifact analysis, and metadata forensics.</p>
    <div class="scan-line"></div>
    <div class="stats-bar">
      <div class="stat">
        <span class="stat-val">4</span>
        <span class="stat-label">Team Members</span>
      </div>
      <div class="stat">
        <span class="stat-val">72%</span>
        <span class="stat-label">Demo Confidence Score</span>
      </div>
      <div class="stat">
        <span class="stat-val">8</span>
        <span class="stat-label">Impl. Phases</span>
      </div>
      <div class="stat">
        <span class="stat-val">3</span>
        <span class="stat-label">Core Detection Layers</span>
      </div>
    </div>
  </div>
</div>

<!-- ── LIVE STATUS TERMINAL ── -->
<section>
  <div class="container">
    <div class="section-label">System Status</div>
    <h2 class="section-title">Project <span>Status</span></h2>
    <div class="terminal">
      <div class="terminal-bar">
        <div class="terminal-dot dot-red"></div>
        <div class="terminal-dot dot-yellow"></div>
        <div class="terminal-dot dot-green"></div>
        <span class="terminal-title">deepscan — project-status.sh</span>
      </div>
      <div class="terminal-body">
        <div><span class="t-prompt">$ </span><span class="t-cmd">deepscan --status --verbose</span></div>
        <div class="t-out">Initializing DeepScan v1.0 (Light Edition)...</div>
        <br>
        <div><span class="t-cyan">[ PROJECT ]</span>   Deepfake / AI-Generated Media Verifier</div>
        <div><span class="t-cyan">[ STATUS  ]</span>   <span class="t-ok">▶ IN DEVELOPMENT</span></div>
        <div><span class="t-cyan">[ PHASE   ]</span>   Architecture Design &amp; Backend Setup</div>
        <div><span class="t-cyan">[ SECTION ]</span>   2FH — Computer Science &amp; Application</div>
        <br>
        <div><span class="t-prompt">$ </span><span class="t-cmd">deepscan --checklist</span></div>
        <div><span class="t-ok">  ✔</span> Requirement analysis ....................... DONE</div>
        <div><span class="t-ok">  ✔</span> Dataset selection ......................... DONE</div>
        <div><span class="t-warn">  ◑</span> System architecture design ............... IN PROGRESS</div>
        <div><span class="t-warn">  ◑</span> Backend development ....................... IN PROGRESS</div>
        <div><span class="t-err">  ✗</span> Frontend development ...................... PENDING</div>
        <div><span class="t-err">  ✗</span> Integration &amp; Testing ..................... PENDING</div>
        <div><span class="t-err">  ✗</span> Deployment &amp; Documentation ............... PENDING</div>
        <br>
        <div><span class="t-cyan">[ MENTOR  ]</span>   Mr. Abhishek Singh (Technical Trainer)</div>
        <div><span class="t-cyan">[ GUIDE   ]</span>   Mr. Sanjay Madaan</div>
        <br>
        <div><span class="t-prompt">$ </span><span class="t-cmd">_</span><span class="cursor"></span></div>
      </div>
    </div>
  </div>
</section>

<!-- ── ABOUT ── -->
<section>
  <div class="container">
    <div class="section-label">Overview</div>
    <h2 class="section-title">What is <span>DeepScan?</span></h2>
    <p style="color:var(--muted); max-width:680px; margin-bottom:2rem;">
      DeepScan addresses one of the most pressing digital threats of our era — the proliferation of AI-generated synthetic media. By analyzing visual artifacts, abnormal patterns, texture inconsistencies, and metadata, it provides users with an accessible, real-time probability score indicating whether a piece of media is real or machine-made.
    </p>

    <!-- Live demo of the output format -->
    <div class="prob-meter">
      <span class="prob-label">AI Confidence</span>
      <div class="prob-bar-wrap">
        <div class="prob-bar-fill"></div>
      </div>
      <span class="prob-val">72%</span>
      <span class="result-tag">⚠ SYNTHETIC</span>
    </div>
    <p style="font-family:'Space Mono',monospace; font-size:0.65rem; color:var(--muted);">↑ Example output — probability meter displayed to end users</p>
  </div>
</section>

<!-- ── WORKFLOW ── -->
<section>
  <div class="container">
    <div class="section-label">Detection Pipeline</div>
    <h2 class="section-title">Workflow <span>&amp; Pipeline</span></h2>
    <div class="workflow">
      <div class="workflow-step">
        <div class="step-num">01</div>
        <div class="step-content">
          <div class="step-title">User Media Upload</div>
          <div class="step-desc">User uploads an image or single video frame via the web interface. Accepted formats: JPEG, PNG, WebP, MP4 frame extraction. File size validated client-side before submission.</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">02</div>
        <div class="step-content">
          <div class="step-title">Preprocessing &amp; Normalization</div>
          <div class="step-desc">The backend resizes the input to a standard resolution, applies pixel normalization, strips and preserves metadata (EXIF, ICC profile), and prepares the tensor for model inference.</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">03</div>
        <div class="step-content">
          <div class="step-title">Artifact Analysis</div>
          <div class="step-desc">A heuristic pass scans for GAN fingerprints — texture uniformity anomalies, frequency-domain irregularities, unnatural skin tones, edge sharpness inconsistencies, and implausible lighting gradients.</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">04</div>
        <div class="step-content">
          <div class="step-title">Model Inference</div>
          <div class="step-desc">A pre-trained lightweight CNN / EfficientNet-based classifier runs inference on the preprocessed image tensor, producing a raw logit score for real vs. synthetic classification.</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">05</div>
        <div class="step-content">
          <div class="step-title">Metadata Forensics</div>
          <div class="step-desc">EXIF data is cross-referenced: absence of camera metadata, inconsistent timestamps, or missing GPS/device fields are weighted as synthetic signals alongside the model score.</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">06</div>
        <div class="step-content">
          <div class="step-title">Probability Aggregation</div>
          <div class="step-desc">Scores from the model inference, artifact scan, and metadata analysis are fused using a weighted ensemble to produce a single AI-generation probability percentage.</div>
        </div>
      </div>
      <div class="workflow-step">
        <div class="step-num">07</div>
        <div class="step-content">
          <div class="step-title">Result Display</div>
          <div class="step-desc">The frontend renders the probability score, verdict label (Real / Synthetic), and a brief explanation of the primary detection signals. Results are shown in under 3 seconds.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── SYSTEM ARCHITECTURE ── -->
<section>
  <div class="container">
    <div class="section-label">Technical Design</div>
    <h2 class="section-title">System <span>Architecture</span></h2>
    <div class="arch-diagram">

      <!-- Layer 1: Client -->
      <div class="arch-layer">
        <div class="arch-layer-label">// Layer 1 — Presentation (Client)</div>
        <div class="arch-boxes">
          <div class="arch-box frontend">HTML / CSS / JS</div>
          <div class="arch-box frontend">Upload Widget</div>
          <div class="arch-box frontend">Result Renderer</div>
          <div class="arch-box frontend">Probability Meter UI</div>
        </div>
      </div>

      <div class="arch-arrow">
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <line x1="8" y1="0" x2="8" y2="18" stroke="#00f5c4" stroke-width="1"/>
          <polyline points="4,14 8,20 12,14" stroke="#00f5c4" stroke-width="1" fill="none"/>
        </svg>
      </div>

      <!-- Layer 2: API Gateway -->
      <div class="arch-layer">
        <div class="arch-layer-label">// Layer 2 — API Gateway (Flask / Django REST)</div>
        <div class="arch-boxes">
          <div class="arch-box backend">REST Endpoint /verify</div>
          <div class="arch-box backend">File Validator</div>
          <div class="arch-box backend">Auth Middleware</div>
          <div class="arch-box backend">Response Serializer</div>
        </div>
      </div>

      <div class="arch-arrow">
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <line x1="8" y1="0" x2="8" y2="18" stroke="#7c5cfc" stroke-width="1"/>
          <polyline points="4,14 8,20 12,14" stroke="#7c5cfc" stroke-width="1" fill="none"/>
        </svg>
      </div>

      <!-- Layer 3: Processing -->
      <div class="arch-layer">
        <div class="arch-layer-label">// Layer 3 — Detection Engine (OpenCV + Python)</div>
        <div class="arch-boxes">
          <div class="arch-box backend">Preprocessor</div>
          <div class="arch-box backend">Metadata Parser (EXIF)</div>
          <div class="arch-box backend">Artifact Heuristics</div>
          <div class="arch-box backend">Score Aggregator</div>
        </div>
      </div>

      <div class="arch-arrow">
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <line x1="8" y1="0" x2="8" y2="18" stroke="#ff3c6e" stroke-width="1"/>
          <polyline points="4,14 8,20 12,14" stroke="#ff3c6e" stroke-width="1" fill="none"/>
        </svg>
      </div>

      <!-- Layer 4: Model -->
      <div class="arch-layer">
        <div class="arch-layer-label">// Layer 4 — ML Model (TensorFlow / PyTorch)</div>
        <div class="arch-boxes">
          <div class="arch-box model">Pre-trained CNN Classifier</div>
          <div class="arch-box model">Feature Extractor</div>
          <div class="arch-box model">Inference Engine</div>
        </div>
      </div>

      <div class="arch-arrow">
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <line x1="8" y1="0" x2="8" y2="18" stroke="#64748b" stroke-width="1"/>
          <polyline points="4,14 8,20 12,14" stroke="#64748b" stroke-width="1" fill="none"/>
        </svg>
      </div>

      <!-- Layer 5: Data -->
      <div class="arch-layer" style="margin-bottom:0">
        <div class="arch-layer-label">// Layer 5 — Data Sources</div>
        <div class="arch-boxes">
          <div class="arch-box data">Public Deepfake Datasets</div>
          <div class="arch-box data">AI Image Datasets</div>
          <div class="arch-box data">Real Image Corpora</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── SCOPE ── -->
<section>
  <div class="container">
    <div class="section-label">Boundaries</div>
    <h2 class="section-title">Project <span>Scope</span></h2>
    <table class="scope-table">
      <thead>
        <tr>
          <th>Feature / Capability</th>
          <th>Included</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Detection of AI-generated / deepfake images</td>
          <td class="check">✔ Yes</td>
          <td style="color:var(--muted); font-size:0.85rem;">Core feature — static images &amp; single frames</td>
        </tr>
        <tr>
          <td>Image artifact &amp; metadata analysis</td>
          <td class="check">✔ Yes</td>
          <td style="color:var(--muted); font-size:0.85rem;">EXIF extraction + heuristic scan</td>
        </tr>
        <tr>
          <td>Probability score output</td>
          <td class="check">✔ Yes</td>
          <td style="color:var(--muted); font-size:0.85rem;">0–100% confidence display</td>
        </tr>
        <tr>
          <td>Clean web-based UI</td>
          <td class="check">✔ Yes</td>
          <td style="color:var(--muted); font-size:0.85rem;">Responsive, no account required</td>
        </tr>
        <tr>
          <td>Real-time video deepfake detection</td>
          <td class="cross">✗ No</td>
          <td style="color:var(--muted); font-size:0.85rem;">Out of scope — light version only</td>
        </tr>
        <tr>
          <td>Legal / forensic-grade accuracy</td>
          <td class="cross">✗ No</td>
          <td style="color:var(--muted); font-size:0.85rem;">Academic &amp; demonstrative purpose</td>
        </tr>
        <tr>
          <td>Future AI model coverage</td>
          <td class="cross">✗ No</td>
          <td style="color:var(--muted); font-size:0.85rem;">Limited to models available at time of training</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<!-- ── FEATURES ── -->
<section>
  <div class="container">
    <div class="section-label">Capabilities</div>
    <h2 class="section-title">Core <span>Features</span></h2>
    <div class="features-grid">
      <div class="feature-item">
        <div class="feature-icon">🔍</div>
        <div class="feature-text">
          <div class="feature-name">Image Upload &amp; Verification</div>
          <div class="feature-desc">Drag-and-drop or click to upload — instant verification pipeline triggered on submission.</div>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🧠</div>
        <div class="feature-text">
          <div class="feature-name">Lightweight Deepfake Detection</div>
          <div class="feature-desc">Optimized CNN model runs inference in milliseconds — no GPU required for demo.</div>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">📊</div>
        <div class="feature-text">
          <div class="feature-name">AI Probability Score</div>
          <div class="feature-desc">Clear 0–100% confidence meter tells users exactly how likely the media is synthetic.</div>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🔎</div>
        <div class="feature-text">
          <div class="feature-name">Metadata Analysis</div>
          <div class="feature-desc">EXIF data forensics — missing camera info, timestamp anomalies flagged as synthetic signals.</div>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🎨</div>
        <div class="feature-text">
          <div class="feature-name">Clean User Interface</div>
          <div class="feature-desc">Designed for non-technical users. No jargon, just a clear verdict and confidence score.</div>
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">⚡</div>
        <div class="feature-text">
          <div class="feature-name">Fast Processing</div>
          <div class="feature-desc">End-to-end pipeline completes in under 3 seconds for standard image inputs.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── TECH STACK ── -->
<section>
  <div class="container">
    <div class="section-label">Technologies</div>
    <h2 class="section-title">Tech <span>Stack</span></h2>
    <p style="color:var(--muted); margin-bottom:1.5rem; font-size:0.9rem;">Hover over a technology to highlight it.</p>
    <div class="tech-stack">
      <span class="tech-pill">Python</span>
      <span class="tech-pill">TensorFlow</span>
      <span class="tech-pill">PyTorch</span>
      <span class="tech-pill">OpenCV</span>
      <span class="tech-pill">Flask</span>
      <span class="tech-pill">Django</span>
      <span class="tech-pill">HTML5</span>
      <span class="tech-pill">CSS3</span>
      <span class="tech-pill">JavaScript</span>
      <span class="tech-pill">EXIF.js</span>
      <span class="tech-pill">EfficientNet</span>
      <span class="tech-pill">NumPy</span>
      <span class="tech-pill">Pillow</span>
      <span class="tech-pill">REST API</span>
    </div>
  </div>
</section>

<!-- ── EXPECTED OUTCOMES ── -->
<section>
  <div class="container">
    <div class="section-label">Deliverables</div>
    <h2 class="section-title">Expected <span>Outcomes</span></h2>
    <div class="outcome-grid">
      <div class="outcome-card">
        <div class="outcome-icon">🎯</div>
        <div class="outcome-title">Detection Accuracy</div>
        <div class="outcome-desc">Functional system capable of detecting AI-generated images with reasonable academic-grade accuracy using pre-trained models.</div>
      </div>
      <div class="outcome-card">
        <div class="outcome-icon">📈</div>
        <div class="outcome-title">Probability Verdict</div>
        <div class="outcome-desc">Clear probability-based verification results displayed with a visual meter, label, and brief explanation of detection signals.</div>
      </div>
      <div class="outcome-card">
        <div class="outcome-icon">🌐</div>
        <div class="outcome-title">Public Awareness Tool</div>
        <div class="outcome-desc">A web app accessible to non-technical users that helps them distinguish synthetic media from real content.</div>
      </div>
    </div>
  </div>
</section>

<!-- ── TEAM ── -->
<section>
  <div class="container">
    <div class="section-label">Contributors</div>
    <h2 class="section-title">The <span>Team</span></h2>
    <div class="team-grid">
      <div class="team-card">
        <div class="team-role">Frontend Dev &amp; UI Design</div>
        <div class="team-name">Harshita Nagpal</div>
        <div class="team-id">12515990016</div>
      </div>
      <div class="team-card">
        <div class="team-role">Backend &amp; Image Processing</div>
        <div class="team-name">Arpita Raj</div>
        <div class="team-id">12515990007</div>
      </div>
      <div class="team-card">
        <div class="team-role">Model Integration &amp; Testing</div>
        <div class="team-name">Naman Singh</div>
        <div class="team-id">12515990024</div>
      </div>
      <div class="team-card">
        <div class="team-role">Documentation &amp; Analysis</div>
        <div class="team-name">Anurag Singh</div>
        <div class="team-id">12515990006</div>
      </div>
    </div>
    <hr class="divider">
    <div style="display:flex; gap:2rem; flex-wrap:wrap;">
      <div>
        <div style="font-family:'Space Mono',monospace; font-size:0.6rem; color:var(--muted); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:0.3rem;">Project Supervisor</div>
        <div style="color:#fff; font-weight:500;">Mr. Abhishek Singh</div>
        <div style="color:var(--muted); font-size:0.85rem;">Technical Trainer</div>
      </div>
      <div>
        <div style="font-family:'Space Mono',monospace; font-size:0.6rem; color:var(--muted); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:0.3rem;">Submitted To</div>
        <div style="color:#fff; font-weight:500;">Mr. Sanjay Madaan</div>
        <div style="color:var(--muted); font-size:0.85rem;">Department Guide</div>
      </div>
    </div>
  </div>
</section>

<!-- ── REFERENCES ── -->
<section>
  <div class="container">
    <div class="section-label">Sources</div>
    <h2 class="section-title">References <span>&amp; Resources</span></h2>
    <div class="terminal">
      <div class="terminal-bar">
        <div class="terminal-dot dot-red"></div>
        <div class="terminal-dot dot-yellow"></div>
        <div class="terminal-dot dot-green"></div>
        <span class="terminal-title">references.md</span>
      </div>
      <div class="terminal-body">
        <div><span class="t-prompt">[1] </span><span class="t-cmd">Research papers on Deepfake Detection</span></div>
        <div><span class="t-prompt">[2] </span><span class="t-cmd">Open-source AI-generated image detection models</span></div>
        <div><span class="t-prompt">[3] </span><span class="t-cmd">IEEE and ACM digital libraries</span></div>
        <div><span class="t-prompt">[4] </span><span class="t-cmd">Online resources — computer vision &amp; deep learning documentation</span></div>
        <div><span class="t-prompt">[5] </span><span class="t-cmd">Public deepfake &amp; AI-generated image datasets (Kaggle, FaceForensics++)</span></div>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="container">
    <div class="footer-title">DEEPSCAN — Light Edition</div>
    <div class="footer-sub">Department of Computer Science &amp; Application · Section 2FH · Academic Project 2024–25</div>
  </div>
</footer>

</body>
</html>
