# 🥔 Potato Leaf Disease Classifier

This project provides a user-friendly website designed to help potato farmers diagnose leaf diseases. By uploading an image of a potato plant leaf, the system automatically classifies it into one of the following categories:

- ✅ Healthy  
- 🌫️ Early Blight  
- 🌧️ Late Blight  

---

## 🧠 About the Model

- **Convolutional Neural Network (CNN)** for image classification.
- **Trained on 1,500 images** (Healthy, Early Blight, Late Blight).
- **Validated on 400 images, tested on 300 images**—high accuracy in all phases.
- **Backend:** FastAPI serving the model via API.
- **Frontend:** React + Vite, styled with Material UI (MUI), requests handled by Axios.

---

## 💡 Features

- **Intuitive web interface** for uploading potato leaf images.
- **Fast and accurate disease prediction** using a trained CNN.

---

## 🚀 Quick Start: How to Run

1. **Clone the repository**
2. **Start the FastAPI backend:** Open the Anaconda Prompt and navigate to the directory of the cloned folder named fastapi within your repository. Run the command "uvicorn main:app --reload"
3. ,you will get an URL ,copy the URL and replace .env file with this URL in your frontend cloned folder.
 *(Keep the backend running—it will usually be at `http://localhost:8000`)*
3. **Start the React frontend:** Open your command prompt and navigate to frontend cloned folder and run command "npm run dev"
4. You will get an URL , paste in the browser and website is ready to take potato leaf image.
5. Note: If any command is not supported by your system, please follow the installation steps to ensure proper setup.


