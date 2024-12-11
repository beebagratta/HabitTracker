import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { createCookie } from 'react-router-dom';

const MainDashboard = () => {
    const [name, setName] = useState('');
    const [habits, setHabits] = useState([]);
    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        const userName = localStorage.getItem("CurrentUser");
        if (userName) {
            try {
                const parsedName = JSON.parse(userName);
                setName(parsedName);
                const savedHabits = localStorage.getItem(parsedName);
                if (savedHabits) {
                    const parsedHabits = JSON.parse(savedHabits);
                    setHabits(parsedHabits);
                    const completed = parsedHabits.filter(habit => habit.completed).length;
                    setCompletedCount(completed);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, []);
    const markAsDelete = (index) => {
        const updatedHabits = [...habits];
        updatedHabits.splice(index, 1)
        setHabits(updatedHabits)

        const currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
        localStorage.setItem(currentUser, JSON.stringify(updatedHabits));
    };

    const markAsComplete = (index, e) => {
        const updatedHabits = [...habits];
        const habit = updatedHabits[index];
        if (!habit.completed) {
            habit.progress = Math.min(habit.progress + 100, 100); // Update progress
            habit.completed = habit.progress === 100; // Check completion
            setHabits(updatedHabits);

            const currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
            localStorage.setItem(currentUser, JSON.stringify(updatedHabits));
            habit.completed = true
            if (habit.completed) setCompletedCount(prev => prev + 1);
            habit.completed = true

        }
        habit.completed = true
        
    };

    return (
        <div className="h-full w-screen bg-black">
            <div className="w-[90%] flex flex-col gap-4 mx-auto">
                <Navbar />
                <h1 className="font-bold text-xl">Welcome {name || "Guest"}</h1>
                <p className="text-white">{completedCount} of {habits.length} habits completed</p>

                <div className="w-full h-[90vh] flex gap-10 flex-wrap overflow-auto">
                    {habits && habits.length ? (
                        habits.map((habit, index) => (
                            <div
                                key={index}
                                className="relative border-[2px] border-white bg-[#ffffff0d] h-[26rem] w-[18em] rounded-lg p-4 overflow-auto leading-[32px] mx-auto shadow-white"
                            >
                                <div className="sticky top-0">
                                    <div className="w-full flex justify-between">
                                        <h2 className="font-bold">{habit.Frequency}</h2>
                                        <h2 className="font-bold">{habit.Date}</h2>
                                    </div>
                                    <div className="font-bold">{habit.Goal}</div>
                                </div>

                                <div>
                                    <h2 className="font-semibold">{habit.Title}</h2>
                                    <div>{habit.Description}</div>
                                </div>
                                <div className="w-full mt-4 flex items-center justify-between">
                                   
                                    <button className={"bg-white manageHabitButton"}
                                        onClick={(e) => markAsDelete(index)}
                                         >Delete</button>
                                    <button
                                        className={habit.completed ? "manageHabitButton bg-gray-400 " : "bg-white manageHabitButton"}
                                        onClick={(e) => markAsComplete(index, e)}
                                        disabled={habit.completed}
                                    >
                                        Complete
                                    </button>
                                </div>
                                <div
                                    style={{ width: `${habit.progress}%` }}
                                    className="h-4 mt-4 rounded bg-green-500 transition-all"
                                ></div>
                            </div>
                        ))
                    ) : (
                        <div>No Habits</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;
