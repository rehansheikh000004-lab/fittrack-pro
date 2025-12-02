export default function WorkoutCard({ w, onDelete }) {
  return (
    <div className="card workout-card">
      <h3>{w.exercise}</h3>
      <p><b>Sets:</b> {w.sets} | <b>Reps:</b> {w.reps}</p>
      <p><b>Weight:</b> {w.weight} kg</p>

      <button className="delete-btn" onClick={() => onDelete(w._id)}>
        Delete
      </button>
    </div>
  );
}
