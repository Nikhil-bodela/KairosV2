import { useState, useEffect } from 'react';
import { Zap, Search, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import './IgniteHelp.css';

export default function IgniteHelp() {
  const [userEmail, setUserEmail] = useState('');
  const [showInstantHelp, setShowInstantHelp] = useState(false);
  const [loadingSolutions, setLoadingSolutions] = useState(false);
  const [suggestedSolutions, setSuggestedSolutions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Ticket form state
  const [ticketForm, setTicketForm] = useState({
    topic: '',
    description: '',
    priority: 'Medium'
  });

  // Topics/Categories
  const topics = [
    'Login & Account Issues',
    'Project Submission Problems',
    'Learning Standards Questions',
    'Technical Errors',
    'Feature Requests',
    'General Questions',
    'Other'
  ];

  // Priority levels
  const priorities = [
    { value: 'Low', label: 'Low - Can wait a few days', color: 'priority-low' },
    { value: 'Medium', label: 'Medium - Need help soon', color: 'priority-medium' },
    { value: 'High', label: 'High - Urgent assistance needed', color: 'priority-high' }
  ];

  // Sample solutions database - Replace with API call
  const solutionsDatabase = {
    'Login & Account Issues': [
      {
        title: 'Cannot log in to my account',
        solution: 'Try resetting your password using the "Forgot Password" link. If that doesn\'t work, clear your browser cache and try again.',
        helpfulCount: 45
      },
      {
        title: 'Password reset link not working',
        solution: 'Check your spam folder for the reset email. If you still don\'t see it, make sure you\'re using the correct email address associated with your account.',
        helpfulCount: 32
      }
    ],
    'Project Submission Problems': [
      {
        title: 'Submit button is not responding',
        solution: 'Make sure all required fields are filled out. Try refreshing the page and checking your internet connection. If the problem persists, save your work and try using a different browser.',
        helpfulCount: 58
      },
      {
        title: 'Uploaded files not showing',
        solution: 'Ensure your files are in the correct format (PDF, DOC, DOCX) and under the 10MB size limit. Try uploading one file at a time.',
        helpfulCount: 41
      }
    ],
    'Technical Errors': [
      {
        title: 'Page keeps loading/freezing',
        solution: 'Clear your browser cache and cookies. Try disabling browser extensions temporarily. Make sure you\'re using the latest version of Chrome, Firefox, or Edge.',
        helpfulCount: 67
      },
      {
        title: 'Error messages when saving',
        solution: 'Check your internet connection. Try saving your work in smaller sections. If the error mentions "timeout", wait a minute and try again.',
        helpfulCount: 29
      }
    ]
  };

  useEffect(() => {
    // Load user email
    setUserEmail('teacher1@gmail.com'); // Replace with actual user email
  }, []);

  // Get instant help solutions
  const handleInstantHelp = () => {
    if (!ticketForm.topic) {
      alert('Please select a topic first!');
      return;
    }

    setLoadingSolutions(true);
    setShowInstantHelp(true);

    // Simulate API call - Replace with actual backend call
    setTimeout(() => {
      const solutions = solutionsDatabase[ticketForm.topic] || [];
      setSuggestedSolutions(solutions);
      setLoadingSolutions(false);
    }, 800);
  };

  // Create ticket
  const handleCreateTicket = () => {
    if (!ticketForm.topic || !ticketForm.description) {
      alert('Please fill in all required fields!');
      return;
    }

    // TODO: Call backend API
    // google.script.run
    //   .withSuccessHandler((result) => {
    //     if (result.success) {
    //       setShowSuccess(true);
    //       setTimeout(() => setShowSuccess(false), 3000);
    //       setTicketForm({ topic: '', description: '', priority: 'Medium' });
    //       setShowInstantHelp(false);
    //     }
    //   })
    //   .createTicket(ticketForm);

    // For now, show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setTicketForm({ topic: '', description: '', priority: 'Medium' });
      setShowInstantHelp(false);
    }, 2000);
  };

  // Handle form changes
  const updateForm = (field, value) => {
    setTicketForm(prev => ({ ...prev, [field]: value }));
    // Hide instant help when user changes topic
    if (field === 'topic') {
      setShowInstantHelp(false);
    }
  };

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

      {/* Success Message */}
      {showSuccess && (
        <div className="success-banner">
          <CheckCircle size={20} />
          <span>Ticket created successfully! We'll get back to you soon.</span>
        </div>
      )}

      {/* Main Content */}
      <div className="ignite-content">
        <div className="section-header">
          <div>
            <h2 className="section-title">Need Help?</h2>
            <p className="section-subtitle">Describe your issue and we'll help you find a solution</p>
          </div>
        </div>

        <div className="help-layout">
          {/* Left Side - Create Ticket Form */}
          <div className="create-ticket-section">
            <div className="form-card">
              <h3 className="form-card-title">
                <AlertCircle size={20} />
                Create Support Ticket
              </h3>

              {/* Topic Selection */}
              <div className="form-group">
                <label className="form-label">
                  What do you need help with? <span className="required">*</span>
                </label>
                <select
                  value={ticketForm.topic}
                  onChange={(e) => updateForm('topic', e.target.value)}
                  className="form-select form-select-large"
                >
                  <option value="">Select a topic...</option>
                  {topics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">
                  Describe your issue <span className="required">*</span>
                </label>
                <textarea
                  value={ticketForm.description}
                  onChange={(e) => updateForm('description', e.target.value)}
                  placeholder="Please provide as much detail as possible about your problem..."
                  className="form-textarea"
                  rows="6"
                />
                <div className="char-count">
                  {ticketForm.description.length} characters
                </div>
              </div>

              {/* Priority */}
              <div className="form-group">
                <label className="form-label">
                  Priority Level <span className="required">*</span>
                </label>
                <div className="priority-options">
                  {priorities.map(priority => (
                    <label
                      key={priority.value}
                      className={`priority-option ${ticketForm.priority === priority.value ? 'selected' : ''} ${priority.color}`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={priority.value}
                        checked={ticketForm.priority === priority.value}
                        onChange={(e) => updateForm('priority', e.target.value)}
                      />
                      <div className="priority-label">
                        <strong>{priority.value}</strong>
                        <span>{priority.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button
                  onClick={handleInstantHelp}
                  className="btn-instant-help"
                  disabled={!ticketForm.topic}
                >
                  <Zap size={18} />
                  Instant Help
                </button>

                <button
                  onClick={handleCreateTicket}
                  className="btn-create-ticket"
                  disabled={!ticketForm.topic || !ticketForm.description}
                >
                  Create Ticket
                </button>
              </div>

              <div className="form-footer">
                <p className="help-text">
                  💡 Try <strong>Instant Help</strong> first to see if we already have a solution!
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Instant Help Solutions */}
          {showInstantHelp && (
            <div className="instant-help-section">
              <div className="solutions-card">
                <div className="solutions-header">
                  <h3 className="solutions-title">
                    <Zap size={20} />
                    Instant Solutions
                  </h3>
                  <button 
                    className="close-solutions"
                    onClick={() => setShowInstantHelp(false)}
                  >
                    ×
                  </button>
                </div>

                {loadingSolutions ? (
                  <div className="loading-solutions">
                    <div className="spinner"></div>
                    <p>Finding solutions for you...</p>
                  </div>
                ) : suggestedSolutions.length > 0 ? (
                  <>
                    <div className="solutions-intro">
                      <p>Here are some solutions that helped others with similar issues:</p>
                    </div>

                    <div className="solutions-list">
                      {suggestedSolutions.map((solution, index) => (
                        <div key={index} className="solution-item">
                          <div className="solution-header">
                            <h4 className="solution-title">{solution.title}</h4>
                            <div className="helpful-badge">
                              <CheckCircle size={14} />
                              {solution.helpfulCount} found helpful
                            </div>
                          </div>
                          <p className="solution-text">{solution.solution}</p>
                          <div className="solution-actions">
                            <button className="btn-solution-action">
                              This helped! ✓
                            </button>
                            <button className="btn-solution-action secondary">
                              Still need help
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="solutions-footer">
                      <p className="solutions-footer-text">
                        <strong>Still having issues?</strong> Create a ticket and our support team will assist you personally.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="no-solutions">
                    <Search size={40} className="no-solutions-icon" />
                    <h4>No instant solutions found</h4>
                    <p>Don't worry! Create a ticket and our support team will help you.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* View Past Tickets Link */}
        <div className="past-tickets-link">
          <Clock size={18} />
          <a href="#" onClick={(e) => { e.preventDefault(); /* TODO: Implement */ }}>
            View My Past Tickets
          </a>
        </div>
      </div>
    </div>
  );
}
