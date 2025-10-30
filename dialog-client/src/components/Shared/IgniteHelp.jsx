import { useState, useEffect } from 'react';
import { X, Plus, Search, Filter, AlertCircle } from 'lucide-react';
import './IgniteHelp.css';

export default function IgniteHelp() {
  const [view, setView] = useState('list'); // 'list', 'create', 'detail'
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  // New ticket form state
  const [newTicket, setNewTicket] = useState({
    title: '',
    category: 'Technical',
    priority: 'Medium',
    description: ''
  });

  // Sample tickets - Replace with actual API call
  const sampleTickets = [
    {
      id: 1,
      title: 'Unable to Submit Project',
      category: 'Technical',
      priority: 'High',
      status: 'Pending',
      created: '2025-10-29',
      creator: 'student1@gmail.com',
      description: 'Getting error when trying to submit my science project. The submit button is not responding.'
    },
    {
      id: 2,
      title: 'Need Help with Learning Standards',
      category: 'Academic',
      priority: 'Medium',
      status: 'In Progress',
      created: '2025-10-28',
      creator: 'teacher1@gmail.com',
      description: 'How do I align my project with multiple learning standards?'
    },
    {
      id: 3,
      title: 'Login Issues',
      category: 'Technical',
      priority: 'High',
      status: 'Resolved',
      created: '2025-10-27',
      creator: 'student2@gmail.com',
      description: 'Cannot access my account. Password reset not working.',
      resolution: 'Password reset link was sent. Issue resolved.'
    },
    {
      id: 4,
      title: 'Project Feedback Request',
      category: 'Academic',
      priority: 'Low',
      status: 'Resolved',
      created: '2025-10-26',
      creator: 'student3@gmail.com',
      description: 'Looking for feedback on my robotics project before final submission.',
      resolution: 'Feedback provided via email.'
    }
  ];

  useEffect(() => {
    // Simulate loading user info and tickets
    setTimeout(() => {
      setUserEmail('teacher1@gmail.com');
      setUserRole('Teacher');
      setTickets(sampleTickets);
      setLoading(false);
    }, 500);
  }, []);

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Get similar resolved tickets for reference
  const getSimilarResolvedTickets = (category) => {
    return tickets.filter(t => 
      t.category === category && 
      t.status === 'Resolved'
    ).slice(0, 3);
  };

  const handleCreateTicket = () => {
    const ticket = {
      id: tickets.length + 1,
      ...newTicket,
      status: 'Pending',
      created: new Date().toISOString().split('T')[0],
      creator: userEmail
    };
    
    setTickets([ticket, ...tickets]);
    setNewTicket({ title: '', category: 'Technical', priority: 'Medium', description: '' });
    setView('list');
    
    // TODO: Call backend API
    // google.script.run.createTicket(ticket);
  };

  const getStatusClass = (status) => {
    const statusLower = (status || '').toLowerCase();
    if (statusLower.includes('resolved') || statusLower.includes('closed')) return 'is-approve';
    if (statusLower.includes('progress')) return 'is-neutral';
    if (statusLower.includes('pending')) return 'is-pending';
    return 'is-reject';
  };

  const getPriorityClass = (priority) => {
    if (priority === 'High') return 'priority-high';
    if (priority === 'Medium') return 'priority-medium';
    return 'priority-low';
  };

  // CREATE TICKET VIEW
  if (view === 'create') {
    const similarTickets = getSimilarResolvedTickets(newTicket.category);
    
    return (
      <div className="ignite-container">
        <div className="ignite-header">
          <div className="ignite-menu">☰</div>
          <div className="ignite-email">{userEmail}</div>
        </div>

        <div className="ignite-hero">
          <h1 className="ignite-title">Get Sparked!</h1>
          <div className="ignite-logo">
            <svg viewBox="0 0 100 100" className="brain-bulb-icon">
              <circle cx="50" cy="50" r="35" fill="#f59e0b" opacity="0.2"/>
              <circle cx="50" cy="50" r="28" fill="#fbbf24"/>
              <path d="M35 40 L50 25 L65 40" stroke="#92400e" strokeWidth="3" fill="none"/>
              <path d="M40 50 L50 35 L60 50" stroke="#92400e" strokeWidth="3" fill="none"/>
              <path d="M45 60 L50 45 L55 60" stroke="#92400e" strokeWidth="3" fill="none"/>
            </svg>
          </div>
        </div>

        <div className="ignite-content">
          <div className="section-header">
            <h2 className="section-title">Create New Ticket</h2>
            <button onClick={() => setView('list')} className="btn-secondary">
              ← Back to Tickets
            </button>
          </div>

          <div className="create-ticket-form">
            <div className="form-group">
              <label className="form-label">Ticket Title *</label>
              <input
                type="text"
                value={newTicket.title}
                onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                placeholder="Brief description of your issue"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                  className="form-select"
                >
                  <option value="Technical">Technical</option>
                  <option value="Academic">Academic</option>
                  <option value="Account">Account</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority *</label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                  className="form-select"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                value={newTicket.description}
                onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                placeholder="Provide detailed information about your issue..."
                className="form-textarea"
                rows="6"
              />
            </div>

            <button 
              onClick={handleCreateTicket}
              disabled={!newTicket.title || !newTicket.description}
              className="btn-primary btn-create"
            >
              <Plus size={18} />
              Create Ticket
            </button>
          </div>

          {/* Similar Resolved Tickets */}
          {similarTickets.length > 0 && (
            <div className="similar-tickets-section">
              <div className="alert-info">
                <AlertCircle size={20} />
                <div>
                  <strong>Similar resolved tickets found!</strong>
                  <p>Check if these solved tickets help answer your question:</p>
                </div>
              </div>

              {similarTickets.map(ticket => (
                <div key={ticket.id} className="ticket-card-mini">
                  <div className="ticket-card-header">
                    <h4>{ticket.title}</h4>
                    <span className="status-pill is-approve">Resolved</span>
                  </div>
                  <p className="ticket-description">{ticket.description}</p>
                  {ticket.resolution && (
                    <div className="resolution-box">
                      <strong>Resolution:</strong> {ticket.resolution}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // TICKET DETAIL VIEW
  if (view === 'detail' && selectedTicket) {
    return (
      <div className="ignite-container">
        <div className="ignite-header">
          <div className="ignite-menu">☰</div>
          <div className="ignite-email">{userEmail}</div>
        </div>

        <div className="ignite-hero">
          <h1 className="ignite-title">Get Sparked!</h1>
          <div className="ignite-logo">
            <svg viewBox="0 0 100 100" className="brain-bulb-icon">
              <circle cx="50" cy="50" r="35" fill="#f59e0b" opacity="0.2"/>
              <circle cx="50" cy="50" r="28" fill="#fbbf24"/>
              <path d="M35 40 L50 25 L65 40" stroke="#92400e" strokeWidth="3" fill="none"/>
              <path d="M40 50 L50 35 L60 50" stroke="#92400e" strokeWidth="3" fill="none"/>
              <path d="M45 60 L50 45 L55 60" stroke="#92400e" strokeWidth="3" fill="none"/>
            </svg>
          </div>
        </div>

        <div className="ignite-content">
          <div className="section-header">
            <h2 className="section-title">Ticket Details</h2>
            <button onClick={() => setView('list')} className="btn-secondary">
              ← Back to Tickets
            </button>
          </div>

          <div className="ticket-detail">
            <div className="ticket-detail-header">
              <h2>{selectedTicket.title}</h2>
              <div className="ticket-badges">
                <span className={`status-pill ${getStatusClass(selectedTicket.status)}`}>
                  {selectedTicket.status}
                </span>
                <span className={`priority-badge ${getPriorityClass(selectedTicket.priority)}`}>
                  {selectedTicket.priority}
                </span>
              </div>
            </div>

            <div className="ticket-meta">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="category-badge">{selectedTicket.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Created:</span>
                <span>{selectedTicket.created}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Created by:</span>
                <span>{selectedTicket.creator}</span>
              </div>
            </div>

            <div className="ticket-section">
              <h3>Description</h3>
              <p>{selectedTicket.description}</p>
            </div>

            {selectedTicket.resolution && (
              <div className="ticket-section resolution-section">
                <h3>Resolution</h3>
                <p>{selectedTicket.resolution}</p>
              </div>
            )}

            {selectedTicket.status !== 'Resolved' && (
              <div className="ticket-actions">
                <button className="btn-primary">Update Ticket</button>
                <button className="btn-secondary">Add Comment</button>
                <button className="btn-success">Mark as Resolved</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // MAIN TICKET LIST VIEW (Default)
  return (
    <div className="ignite-container">
      {/* Header - Exact match to screenshot */}
      <div className="ignite-header">
        <div className="ignite-menu">☰</div>
        <div className="ignite-email">{userEmail}</div>
      </div>

      {/* Hero Section - Exact match to screenshot */}
      <div className="ignite-hero">
        <h1 className="ignite-title">Get Sparked!</h1>
        <div className="ignite-logo">
          <svg viewBox="0 0 100 100" className="brain-bulb-icon">
            <circle cx="50" cy="50" r="35" fill="#f59e0b" opacity="0.2"/>
            <circle cx="50" cy="50" r="28" fill="#fbbf24"/>
            <path d="M35 40 L50 25 L65 40" stroke="#92400e" strokeWidth="3" fill="none"/>
            <path d="M40 50 L50 35 L60 50" stroke="#92400e" strokeWidth="3" fill="none"/>
            <path d="M45 60 L50 45 L55 60" stroke="#92400e" strokeWidth="3" fill="none"/>
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="ignite-content">
        <div className="section-header">
          <h2 className="section-title">Support Tickets</h2>
          <button onClick={() => setView('create')} className="btn-primary">
            <Plus size={18} />
            New Ticket
          </button>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <Filter size={18} />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <select 
              value={filterPriority} 
              onChange={(e) => setFilterPriority(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Tickets List - Matching screenshot card style */}
        {loading ? (
          <div className="loading-state">Loading tickets...</div>
        ) : filteredTickets.length === 0 ? (
          <div className="empty-state">
            <p>No tickets found</p>
          </div>
        ) : (
          <div className="tickets-list">
            {filteredTickets.map(ticket => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-card-main">
                  <div className="ticket-info">
                    <div className="ticket-title">{ticket.title}</div>
                    <div className="ticket-meta-row">
                      <span className="category-badge">{ticket.category}</span>
                      <span className="separator">•</span>
                      <span className={`priority-badge ${getPriorityClass(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                      <span className="separator">•</span>
                      <span className="ticket-date">{ticket.created}</span>
                    </div>
                  </div>
                  <span className={`status-pill ${getStatusClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>

                <button 
                  className="review-btn"
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setView('detail');
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
