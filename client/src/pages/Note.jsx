import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { axiosRequest } from "../axios";

const Note = () => {
  const [note, setNote] = useState()
  const token = JSON.parse(localStorage.getItem("token"));
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    async function fetchNotes() {
      const res = await axiosRequest.get(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNote(res.data)
    }
    fetchNotes();
  }, []);

  return (
    <div className="flex relative flex-col max-w-screen h-screen bg-cover bg-[url('https://images.unsplash.com/photo-1598620617148-c9e8ddee6711?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-no-repeat bg-center bg-blend-overlay">
      <Navbar type="home" />
      <div className="flex items-center flex-col gap-4 py-8 sm:px-6 rounded-xl text-center text-black w-full pl-5 lg:pl-[250px]  pr-5 lg:pr-[180px]">
        <h1 className="text-2xl font-bold lg:text-4xl">{note?.title}</h1>
        <span className="text-lg font-medium lg:text-xl">{note?.desc}</span>
        <p>{note?.content}</p>
      </div>
    </div>
  );
};

export default Note;
