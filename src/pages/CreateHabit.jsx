import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const CreateHabit = () => {
    let btnClickSound = new Audio('/btnclick.mp3');
    const [habits, setHabits] = useState([]);
    const [habitTitle, setHabitTitle] = useState('');
    const [habitFrequency, setHabitFrequency] = useState('');
    const [habitGoal, setHabitGoal] = useState('');
    const [habitDate, setHabitDate] = useState('');
    const [habitDescription, setHabitDescription] = useState('');
    const [progress, setProgress] = useState(0)
    const [completed, setCompleted] = useState(false)

    // Load habits from localStorage when the component mounts
    useEffect(() => {
        const CurrentUser = JSON.parse(localStorage.getItem("CurrentUser"));
        if (CurrentUser) {
            const savedHabits = JSON.parse(localStorage.getItem(CurrentUser)) || [];
            setHabits(savedHabits);
        }
    }, []);

    function SaveHabit() {
        const CurrentUser = JSON.parse(localStorage.getItem("CurrentUser"));
        if (!CurrentUser) {
            console.error("No current user found in localStorage");
            return;
        }
        if (!habitTitle || !habitDate || !habitFrequency || !habitGoal || !habitDescription) {
            alert("Fill the complete Form.");
            return;
        }

        let newHabit = {
            Title: habitTitle,
            Frequency: habitFrequency,
            Goal: habitGoal,
            Date: habitDate,
            Description: habitDescription,
            progress: 0, // Initialize progress for each habit
            completed: false, // Mark as incomplete initially
        };
        

        // Add the new habit to the existing list
        const updatedHabits = [...habits, newHabit];
        setHabits(updatedHabits);

        // Save updated habits to localStorage immediately
        localStorage.setItem(CurrentUser, JSON.stringify(updatedHabits));

        btnClickSound.play()


        // Clear input fields after saving
        setHabitTitle('');
        setHabitFrequency('');
        setHabitGoal('');
        setHabitDate('');
        setHabitDescription('');

    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen w-full flex justify-center items-center bg-black">
                <div className="flex flex-col gap-6 w-full max-w-5xl p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col gap-4 md:w-1/2">
                            <input
                                value={habitTitle}
                                onChange={(e) => setHabitTitle(e.target.value)}
                                className="w-full h-12 px-4 outline-none bg-gray-800 border-2 border-white text-white placeholder-gray-400 rounded-lg"
                                type="text"
                                placeholder="Title"
                            />
                            <input
                                value={habitDate}
                                onChange={(e) => setHabitDate(e.target.value)}
                                className="w-full h-12 px-4 outline-none bg-gray-800 border-2 border-white text-white placeholder-gray-400 rounded-lg"
                                type="date"
                                placeholder="Date"
                            />
                            <input
                                value={habitFrequency}
                                onChange={(e) => setHabitFrequency(e.target.value)}
                                className="w-full h-12 px-4 outline-none bg-gray-800 border-2 border-white text-white placeholder-gray-400 rounded-lg"
                                type="text"
                                placeholder="Frequency"
                            />
                            <input
                                value={habitGoal}
                                onChange={(e) => setHabitGoal(e.target.value)}
                                className="w-full h-12 px-4 outline-none bg-gray-800 border-2 border-white text-white placeholder-gray-400 rounded-lg"
                                type="text"
                                placeholder="Goal"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <textarea
                                value={habitDescription}
                                onChange={(e) => setHabitDescription(e.target.value)}
                                className="w-full h-full px-4 py-2 outline-none bg-gray-800 border-2 border-white text-white placeholder-gray-400 rounded-lg resize-none"
                                placeholder="Description"
                            />
                        </div>
                    </div>
                    <button
                        className="w-full md:w-1/4 bg-white text-black py-3 font-semibold rounded-lg mx-auto hover:bg-gray-300 transition"
                        onClick={SaveHabit}
                    >
                        Create Habit
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreateHabit;
