// ========================================
// לוח הניהול - AdminDashboard
// ========================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2, Check } from 'lucide-react';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();

  // קריאת כל הנתונים מ-LocalStorage
  const [foodOrders, setFoodOrders] = useState(() =>
    JSON.parse(localStorage.getItem('foodOrders') || '[]')
  );
  const [reservations, setReservations] = useState(() =>
    JSON.parse(localStorage.getItem('reservations') || '[]')
  );
  const [contacts, setContacts] = useState(() =>
    JSON.parse(localStorage.getItem('contactMessages') || '[]')
  );
  const [cateringRequests, setCateringRequests] = useState(() =>
    JSON.parse(localStorage.getItem('cateringRequests') || '[]')
  );

  const [activeTab, setActiveTab] = useState('orders'); // לשונית פעילה

  // התנתקות
  function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  }

  // מחיקת פריט מרשימה
  function deleteItem(list, setList, key, id) {
    const updated = list.filter((item) => item.id !== id);
    setList(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  }

  // עדכון סטטוס
  function updateStatus(list, setList, key, id, newStatus) {
    const updated = list.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setList(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  }

  // חישוב סכום כל ההזמנות
  const totalRevenue = foodOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  return (
    <div className="admin-dashboard">
      {/* סרגל עליון */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-logo">
            <span>kitchen</span> <em>Admin</em>
          </div>
          <button className="btn btn-outline btn-sm" onClick={handleLogout}>
            <LogOut size={14} /> התנתק
          </button>
        </div>
      </header>

      <div className="admin-content">
        {/* סטטיסטיקות */}
        <div className="admin-stats">
          <div className="stat-card">
            <span className="stat-number">{foodOrders.length}</span>
            <span className="stat-label">הזמנות אוכל</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{reservations.length}</span>
            <span className="stat-label">הזמנות שולחן</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{contacts.length}</span>
            <span className="stat-label">פניות</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{cateringRequests.length}</span>
            <span className="stat-label">בקשות קייטרינג</span>
          </div>
          <div className="stat-card stat-card-gold">
            <span className="stat-number">₪{totalRevenue}</span>
            <span className="stat-label">סכום הזמנות</span>
          </div>
        </div>

        {/* לשוניות */}
        <div className="admin-tabs">
          {[
            { key: 'orders', label: 'הזמנות אוכל' },
            { key: 'reservations', label: 'הזמנות שולחן' },
            { key: 'contacts', label: 'פניות' },
            { key: 'catering', label: 'קייטרינג' },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`admin-tab ${activeTab === tab.key ? 'admin-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* תוכן לשונית - הזמנות אוכל */}
        {activeTab === 'orders' && (
          <div className="admin-table-wrap">
            <h3 className="admin-table-title">הזמנות אוכל ({foodOrders.length})</h3>
            {foodOrders.length === 0 ? (
              <p className="admin-empty">אין הזמנות עדיין</p>
            ) : (
              <div className="table-scroll">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>מספר הזמנה</th>
                      <th>שם לקוח</th>
                      <th>טלפון</th>
                      <th>סכום</th>
                      <th>סטטוס</th>
                      <th>פעולות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer?.fullName}</td>
                        <td>{order.customer?.phone}</td>
                        <td>₪{order.totalPrice}</td>
                        <td>
                          <span className={`status-badge ${order.status === 'הושלם' ? 'status-done' : 'status-pending'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="table-actions">
                          <button
                            className="action-btn action-complete"
                            onClick={() => updateStatus(foodOrders, setFoodOrders, 'foodOrders', order.id, 'הושלם')}
                            aria-label="סמן כהושלם"
                            title="סמן כהושלם"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            className="action-btn action-delete"
                            onClick={() => deleteItem(foodOrders, setFoodOrders, 'foodOrders', order.id)}
                            aria-label="מחק"
                            title="מחק"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* הזמנות שולחן */}
        {activeTab === 'reservations' && (
          <div className="admin-table-wrap">
            <h3 className="admin-table-title">הזמנות שולחן ({reservations.length})</h3>
            {reservations.length === 0 ? (
              <p className="admin-empty">אין הזמנות עדיין</p>
            ) : (
              <div className="table-scroll">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>מספר אישור</th>
                      <th>שם</th>
                      <th>טלפון</th>
                      <th>תאריך</th>
                      <th>שעה</th>
                      <th>סועדים</th>
                      <th>סטטוס</th>
                      <th>פעולות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((r) => (
                      <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.fullName}</td>
                        <td>{r.phone}</td>
                        <td>{r.date}</td>
                        <td>{r.time}</td>
                        <td>{r.guests}</td>
                        <td>
                          <span className={`status-badge ${r.status === 'מאושר' ? 'status-done' : 'status-pending'}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="table-actions">
                          <button className="action-btn action-complete" onClick={() => updateStatus(reservations, setReservations, 'reservations', r.id, 'מאושר')} title="אשר">
                            <Check size={14} />
                          </button>
                          <button className="action-btn action-delete" onClick={() => deleteItem(reservations, setReservations, 'reservations', r.id)} title="מחק">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* פניות */}
        {activeTab === 'contacts' && (
          <div className="admin-table-wrap">
            <h3 className="admin-table-title">פניות ({contacts.length})</h3>
            {contacts.length === 0 ? (
              <p className="admin-empty">אין פניות עדיין</p>
            ) : (
              <div className="table-scroll">
                <table className="admin-table">
                  <thead>
                    <tr><th>שם</th><th>טלפון</th><th>אימייל</th><th>נושא</th><th>הודעה</th><th>פעולות</th></tr>
                  </thead>
                  <tbody>
                    {contacts.map((c) => (
                      <tr key={c.id}>
                        <td>{c.fullName}</td>
                        <td>{c.phone}</td>
                        <td>{c.email}</td>
                        <td>{c.subject}</td>
                        <td className="message-cell">{c.message}</td>
                        <td className="table-actions">
                          <button className="action-btn action-delete" onClick={() => deleteItem(contacts, setContacts, 'contactMessages', c.id)} title="מחק">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* קייטרינג */}
        {activeTab === 'catering' && (
          <div className="admin-table-wrap">
            <h3 className="admin-table-title">בקשות קייטרינג ({cateringRequests.length})</h3>
            {cateringRequests.length === 0 ? (
              <p className="admin-empty">אין בקשות עדיין</p>
            ) : (
              <div className="table-scroll">
                <table className="admin-table">
                  <thead>
                    <tr><th>שם</th><th>טלפון</th><th>אימייל</th><th>תאריך</th><th>אורחים</th><th>חבילה</th><th>סטטוס</th><th>פעולות</th></tr>
                  </thead>
                  <tbody>
                    {cateringRequests.map((c) => (
                      <tr key={c.id}>
                        <td>{c.fullName}</td>
                        <td>{c.phone}</td>
                        <td>{c.email}</td>
                        <td>{c.eventDate}</td>
                        <td>{c.guests}</td>
                        <td>{c.packageName}</td>
                        <td>
                          <span className={`status-badge ${c.status === 'טופל' ? 'status-done' : 'status-pending'}`}>{c.status}</span>
                        </td>
                        <td className="table-actions">
                          <button className="action-btn action-complete" onClick={() => updateStatus(cateringRequests, setCateringRequests, 'cateringRequests', c.id, 'טופל')} title="סמן כטופל">
                            <Check size={14} />
                          </button>
                          <button className="action-btn action-delete" onClick={() => deleteItem(cateringRequests, setCateringRequests, 'cateringRequests', c.id)} title="מחק">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
