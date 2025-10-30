import { useState } from 'react';
import { X } from 'lucide-react';

export default function IgniteHelp() {
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample help items - customize as needed
  const helpItems = [
    {
      id: 1,
      title: 'Getting Started Guide',
      subject: 'Tutorial',
      status: 'Available',
      description: 'Learn how to use the platform effectively with step-by-step instructions.',
      details: 'This comprehensive guide will walk you through all the features of the platform, from creating your first project to collaborating with peers.'
    },
    {
      id: 2,
      title: 'Project Best Practices',
      subject: 'Guide',
      status: 'Available',
      description: 'Tips and strategies for creating outstanding projects.',
      details: 'Discover proven techniques for project planning, execution, and presentation that will help you achieve better results.'
    },
    {
      id: 3,
      title: 'Technical Support',
      subject: 'Support',
      status: 'Available',
      description: 'Get help with technical issues or platform questions.',
      details: 'Our support team is here to help you resolve any technical challenges you encounter while using the platform.'
    },
  ];

  const getStatusColor = (status) => {
    const statusLower = (status || '').toLowerCase();
    if (statusLower.includes('available')) return 'is-approve';
    if (statusLower.includes('pending')) return 'is-pending';
    if (statusLower.includes('unavailable')) return 'is-reject';
    return 'is-neutral';
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '32px',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            ⚡
          </div>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#111827',
              margin: '0',
              lineHeight: '1.2'
            }}>
              Ignite Help
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: '4px 0 0 0'
            }}>
              Get sparked! Access resources and support
            </p>
          </div>
        </div>

        {/* Help Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}>
          {helpItems.map((item) => (
            <div 
              key={item.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Card Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#111827',
                    margin: '0 0 8px 0',
                    lineHeight: '1.4'
                  }}>
                    {item.title}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    color: '#6b7280'
                  }}>
                    <span style={{
                      backgroundColor: '#f3f4f6',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontWeight: '500'
                    }}>
                      {item.subject}
                    </span>
                  </div>
                </div>
                <span 
                  className={`td-status-pill ${getStatusColor(item.status)}`}
                  style={{
                    fontSize: '12px',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.status}
                </span>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '14px',
                color: '#4b5563',
                lineHeight: '1.6',
                margin: '0 0 16px 0'
              }}>
                {item.description}
              </p>

              {/* Action Button */}
              <button
                onClick={() => handleViewDetails(item)}
                style={{
                  width: '100%',
                  backgroundColor: '#f97316',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f97316'}
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Details Panel (Sidebar) */}
        {selectedItem && (
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '400px',
            height: '100vh',
            backgroundColor: 'white',
            boxShadow: '-4px 0 6px rgba(0,0,0,0.1)',
            padding: '24px',
            overflowY: 'auto',
            zIndex: 1000
          }}>
            {/* Close Button */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <X size={20} color="#6b7280" />
            </button>

            {/* Details Content */}
            <div style={{ paddingTop: '20px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 12px 0',
                lineHeight: '1.3'
              }}>
                {selectedItem.title}
              </h2>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <span style={{
                  backgroundColor: '#f3f4f6',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280'
                }}>
                  {selectedItem.subject}
                </span>
                <span 
                  className={`td-status-pill ${getStatusColor(selectedItem.status)}`}
                  style={{
                    fontSize: '12px',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}
                >
                  {selectedItem.status}
                </span>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #fde68a'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#92400e',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  <strong>Quick Tip:</strong> {selectedItem.description}
                </p>
              </div>

              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 12px 0'
              }}>
                Details
              </h3>
              
              <p style={{
                fontSize: '14px',
                color: '#4b5563',
                lineHeight: '1.6',
                margin: '0 0 20px 0'
              }}>
                {selectedItem.details}
              </p>

              <button
                style={{
                  width: '100%',
                  backgroundColor: '#f97316',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '20px'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f97316'}
              >
                Get Help Now
              </button>
            </div>
          </div>
        )}

        {/* Overlay when details panel is open */}
        {selectedItem && (
          <div
            onClick={handleClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 999
            }}
          />
        )}

        {/* Add CSS for status pills */}
        <style>{`
          .td-status-pill.is-approve {
            background-color: #d1fae5;
            color: #065f46;
          }
          .td-status-pill.is-pending {
            background-color: #fef3c7;
            color: #92400e;
          }
          .td-status-pill.is-reject {
            background-color: #fee2e2;
            color: #991b1b;
          }
          .td-status-pill.is-neutral {
            background-color: #f3f4f6;
            color: #374151;
          }
        `}</style>
      </div>
    </div>
  );
}
