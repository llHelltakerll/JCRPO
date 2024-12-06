// src/App.jsx
import React from "react";
import {createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider} from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import Profile from "./pages/Profile";
import Home from "./pages/Home"; // Для главной страницы
import Thread from "./pages/Thread"; // Для страницы темы
import Post from "./pages/Post";
import Layout from "./components/Layout";
import {UserProvider} from "./context/UserContext"; // Для страницы поста

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route exact path="/" component={<Layout />} >
            <Route index element={<Home />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="profile" element={<Profile />} />
            <Route path="thread/:id" element={<Thread />} />
            <Route path="post/:id" element={<Post />} />
        </Route>
    )
)


const App = () => {
    return (
        <UserProvider><RouterProvider router={router}></RouterProvider></UserProvider>
    );
};

export default App;
