import React from 'react'
import ReactDOM from 'react-dom/client'
import IndividualTask from './IndividualTask.jsx'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Routes, Route}  from "react-router-dom"
import NotFound from './NotFound.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<IndividualTask />} />
        <Route path="/not-found" element = {<NotFound />} />
    </Routes>
    </BrowserRouter>
)
