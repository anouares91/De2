# سينما ليلية (Nocturnal Cinema) - Interactive Elements Implementation Plan

Adding semantic HTML interactive elements across the platform: a dedicated alert trigger button on the main screen (Dashboard) that initiates a cinematic modal and toast alert, and a film review & critique submission form on the Explore screen with input fields and a submit button.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following product decisions were confirmed during the interactive interview:
> - **Alert Presentation on Main Screen**: Cinematic in-app modal and toast alert (avoiding intrusive browser-native blocking alerts while delivering dramatic cinema atmosphere and immediate feedback).
> - **Screen and Purpose of the Form**: Film review and critic evaluation form placed on the Explore screen, allowing users to submit cinematic thoughts, select a rating, and dynamically see their review published.
> - **Semantic HTML**: Both features utilize native, semantic HTML elements (`<form>`, `<input>`, `<textarea>`, `<button type="submit">`, `<label>`) with robust event handlers and accessibility attributes.

---

### 1. Overview & Core Concept

- **What It Does**:
  1. **Main Screen (Dashboard) Interactive Alert**: An interactive action button on the Dashboard ("تنبيه العرض الحصري / استدعاء التنبيه السينمائي") that activates a dramatic in-app cinematic notification alert modal with soundwave pulse aesthetics, mystery coin bonus, and dismissal actions, accompanied by an ephemeral top toast alert.
  2. **Explore Screen Interactive Form**: A dedicated, semantic HTML film critique submission form (`<form onSubmit={...}>`) featuring an film selection/name input (`<input type="text">`), critique textarea (`<textarea>`), rating radio/star selectors, and an explicit HTML submit button (`<button type="submit">`) with live validation, submission feedback, and dynamic list updating.
- **Target Audience**: Film lovers, night-owl streaming members, and film critics on Nocturnal Cinema.
- **Key Value**: Provides direct user participation, instant feedback loops, and fulfills all HTML interactive requirements seamlessly within the existing dark cinema aesthetic.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  - **Alert Flow (Dashboard)**:
    1. User navigates to the Dashboard.
    2. User clicks the prominent interactive alert button ("استدعاء تنبيه منتصف الليل").
    3. A dramatic, frosted modal backdrop reveals a cinematic announcement ("تنبيه سينمائي عاجل: تم إطلاق تذكرة العرض الليلي الخاص!").
    4. User can claim a bonus (+50 كوينز) or dismiss, with an immediate confirmation toast alert.
  - **Review Form Flow (Explore)**:
    1. User browses titles in the Explore screen.
    2. User views the "إضافة تقييم ونقد سينمائي" section featuring a clean, responsive HTML `<form>`.
    3. User fills in the film title, reviewer notes, and selects rating stars.
    4. On clicking `<button type="submit">`, the form validates inputs, presents a success alert/toast, and appends the new review to the live community critique reel.

- **Visual Identity & Theme**:
  - Palette: Dominant deep obsidian `#0b0d19` / `#131524`, crimson accents `#e50914` / `#f43f5e`, and gold highlights `#feb700`.
  - Typography: Cairo / Plus Jakarta Sans Arabic typography with high legibility.
  - Form Fields: Rich obsidian input containers with focus rings (`focus:ring-2 focus:ring-[#f43f5e]`), clean labels (`<label>`), and clear placeholders.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: In-App Modal & Toast Alert vs Native `window.alert`**:
  - *Chosen Approach*: Rich in-app cinematic modal dialog and toast notification.
  - *Why*: In-iframe web apps and modern mobile web experiences degrade heavily with blocking native `window.alert()`. A bespoke in-app alert preserves RTL typography, dark cinema ambiance, audio-visual flair, and interactive rewards.
  - *Fallback Consideration*: An optional secondary trigger toggle can allow firing a standard notification if testing specifically demands it.
- **Decision 2: Semantic HTML Form Architecture**:
  - *Chosen Approach*: Standard HTML `<form>` with native `required` attributes, controlled React inputs, and `<button type="submit">`.
  - *Why*: Satisfies standard browser accessibility, enables Enter-key submission, and adheres strictly to the HTML-based specification in the prompt.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                       App Container                         │
│  ├── Toast Notification System (alerts & feedback)          │
│  └── Global State: user, coins, watchlist, reviews          │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌──────────────────────────────┐      ┌──────────────────────────────┐
│       Dashboard Screen       │      │        Explore Screen        │
│ ┌──────────────────────────┐ │      │ ┌──────────────────────────┐ │
│ │  HTML Alert Button       │ │      │ │  HTML Review Form        │ │
│ │  <button onClick={...}>  │ │      │ │  <form onSubmit={...}>   │ │
│ └────────────┬─────────────┘ │      │ │    <input ... />         │ │
│              ▼               │      │ │    <textarea ... />      │ │
│   Cinematic Alert Modal      │      │ │    <button type="submit" │ │
│   (State: showAlertModal)    │      │ └────────────┬─────────────┘ │
│   • Bonus coins action       │      │              ▼               │
│   • Soundwave visual effect  │      │ Live Community Reviews Feed  │
│   • Dismiss button           │      │ (State: reviewsList)         │
└──────────────────────────────┘      └──────────────────────────────┘
```

- **Interactive State Model**:
  - `showAlertModal: boolean`: Controls the visibility of the cinematic alert on the Dashboard.
  - `reviews: FilmReview[]`: Array of critiques, pre-populated with realistic cinema reviews and updated upon form submission.
  - `formData: { filmTitle: string, reviewerName: string, comment: string, rating: number }`: Controlled state for the HTML form on Explore screen.
