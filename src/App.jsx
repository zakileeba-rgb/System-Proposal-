import { useEffect, useState } from 'react';
import { fetchItems, updateItem } from './firestore-functions';

function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fetchItems();
      setServices(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateItem(id, { visitStatus: newStatus });
    setServices(prev => 
      prev.map(item => item.id === id ? { ...item, visitStatus: newStatus } : item)
    );
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading provider schedule...</div>;

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Pet Care Provider Daily Schedule</h1>
      {services.length === 0 ? (
        <p>No active bookings found.</p>
      ) : (
        services.map((item) => (
          <div 
            key={item.id} 
            style={{ 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px', 
              padding: '16px', 
              marginBottom: '16px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <h2 style={{ marginTop: 0, color: '#111827' }}>{item.serviceType} — {item.petName} ({item.petType})</h2>
            <p><strong>Customer:</strong> {item.customerName}</p>
            <p><strong>Time Slot:</strong> {item.timeSlot} ({item.frequency})</p>
            <p><strong>Payment Status:</strong> <span style={{ color: 'green', fontWeight: 'bold' }}>{item.status}</span></p>
            
            <p>
              <strong>Visit Status:</strong> 
              <select 
                value={item.visitStatus} 
                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                style={{ marginLeft: '10px', padding: '4px 8px', borderRadius: '4px' }}
              >
                <option value="Pending">Pending</option>
                <option value="Arrived">Arrived</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </p>

            <p style={{ background: '#f3f4f6', padding: '10px', borderRadius: '6px', fontSize: '14px' }}>
              <strong>Notes:</strong> {item.notes}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;