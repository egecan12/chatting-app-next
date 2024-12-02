"use client";

import React, { useEffect, useState } from "react";
import { fetchRooms } from "../utils/fetchRooms";

type Room = {
  id: string;
  name: string;
  created_by: string;
};

export default function Lobby() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const roomsData = await fetchRooms();
        setRooms(roomsData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    getRooms();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Lobby</h1>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="grid grid-cols-1 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border p-4 rounded cursor-pointer"
            onClick={() => console.log(`Clicked on room ${room.id}`)}
          >
            {room.name}
          </div>
        ))}
      </div>
    </div>
  );
}
