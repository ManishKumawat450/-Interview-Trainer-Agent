# Final project for the **EDUNET FOUNDATION - IBM SKILLSBUILD 4WEEKS INTERNSHIP ON AI & CLOUD TECHNOLOGIES - JUNE 2025**

# AI Interview Trainer Agent

An intelligent, AI Interview Trainer Agent (full-stack web application) designed to help job seekers prepare for interviews. This agent, built on **IBM Cloud**, uses the **watsonx.ai** platform with Retrieval-Augmented Generation (RAG) to provide a personalized and dynamic practice experience.

Demo Video : 

https://github.com/user-attachments/assets/2bd46b0b-2374-4be7-9f21-04cfb7aa4968



link of live project : [**Live Demo**](https://interview-trainer-agent.vercel.app/)

"The agent might not be able to respond because of token utilization."

Result of IBM Cloud : <img width="1919" height="971" alt="Screenshot 2025-08-01 225217" src="https://github.com/user-attachments/assets/ce645c8f-5753-441e-aaea-38db0397749a" />


## 📝 Project Overview

Problem Statement 

In today's competitive job market, generic interview preparation is no longer enough. This project solves that problem by providing an AI-powered agent, hosted on **IBM Cloud**, that acts as a personal interview coach. Users can specify their target job role and experience level, and the agent generates tailored technical, behavioral, and situational questions. It leverages web search to ensure the questions are current and relevant, and provides model answers and improvement tips for a complete feedback loop.

### Key Features

* **Personalized Sessions:** Questions are tailored based on the user's job role and experience.
* **Retrieval-Augmented Generation (RAG):** The agent uses web search to fetch real-time, relevant information, making the practice sessions highly practical.
* **Interactive Chat UI:** A clean, modern, and responsive user interface built with HTML, CSS, and JavaScript.
* **Full-Stack Architecture:** Features a Node.js backend proxy to securely communicate with the IBM Cloud API.
* **Live Deployment:** The entire application is deployed and publicly accessible via Vercel.

## 🛠️ Technology Stack

* **Frontend:** HTML5, CSS3, JavaScript
* **Backend:** Node.js, Express.js
* **Cloud & AI Service:** IBM Cloud with watsonx.ai (Agent Lab using an **IBM Granite LLM**)
* **Deployment:** Vercel
* **Credential Management:** Dotenv (`.env` file)
* **API Communication:** Axios

## 🚀 Getting Started

To run this project on your local machine, follow these steps.

### Prerequisites

* [Node.js](https://nodejs.org/en/) installed on your machine.
* An IBM Cloud account with a deployed watsonx.ai agent.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ManishKumawat450/-Interview-Trainer-Agent.git](https://github.com/ManishKumawat450/-Interview-Trainer-Agent.git)
    cd -Interview-Trainer-Agent
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    -   Create a new file named `.env` in the root of your project folder.
    -   Add your IBM Cloud credentials to this file:
        ```
        IBM_API_KEY=your_ibm_api_key_here
        IBM_SCORING_URL=your_watsonx_agent_scoring_url_here
        ```

4.  **Start the backend server:**
    ```bash
    node server.js
    ```
    Your proxy server will be running on `http://localhost:3000`.

5.  **Run the frontend:**
    -   The easiest way is to use a live server extension. If you're using VS Code, right-click on `index.html` and select "Open with Live Server".
    -   This will open the application in your browser, typically at `http://127.0.0.1:5500`.


## Conclusion

This project successfully demonstrates the creation of a full-stack AI application that solves a real-world problem. It showcases the integration of IBM's powerful watsonx.ai services with a modern web development stack and a secure, scalable deployment architecture.
