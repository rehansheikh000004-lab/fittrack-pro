import { useEffect, useState } from "react";
import client from "../api/axiosClient";
import WorkoutCard from "../components/WorkoutCard";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("ft_user"));
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: ""
  });

  // Fetch workouts on load
  const loadWorkouts = async () => {
    const res = await client.get(`/api/workouts/${user.id}`);
    setWorkouts(res.data);
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  // Add new workout
  const addWorkout = async (e) => {
    e.preventDefault();
    await client.post("/api/workouts/add", {
      userId: user.id,
      ...form
    });
    setForm({ exercise: "", sets: "", reps: "", weight: "" });
    loadWorkouts();
  };

  // Delete workout
  const deleteWorkout = async (id) => {
    await client.delete(`/api/workouts/${id}`);
    loadWorkouts();
  };

  return (
    <div className="dash">
      <h2>Welcome, {user.username}</h2>

      <form className="add-box" onSubmit={addWorkout}>
        <input placeholder="Exercise" value={form.exercise}
          onChange={e => setForm({ ...form, exercise: e.target.value })} />
        <input placeholder="Sets" value={form.sets}
          onChange={e => setForm({ ...form, sets: e.target.value })} />
        <input placeholder="Reps" value={form.reps}
          onChange={e => setForm({ ...form, reps: e.target.value })} />
        <input placeholder="Weight (kg)" value={form.weight}
          onChange={e => setForm({ ...form, weight: e.target.value })} />
        <button>Add Workout</button>
      </form>

      <div className="workout-list">
        {workouts.map(w => (
          <WorkoutCard key={w._id} w={w} onDelete={deleteWorkout} />
        ))}
      </div>
    </div>
  );
}
