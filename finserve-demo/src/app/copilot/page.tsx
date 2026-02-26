'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CLIENTS, QUICK_QUERIES, PENDING_CALL_CLIENT_ID } from '@/lib/mock-data';
import type { QueryRequest, QueryResponse } from '@/app/api/query/route';

function CoPilotInner() {
  const searchParams = useSearchParams();
  const clientParam = searchParams.get('client');
  // No client param = Billy is calling in; with a param = open that client directly
  const clientId = clientParam ?? PENDING_CALL_CLIENT_ID;
  const client = CLIENTS.find((c) => c.id === clientId) ?? CLIENTS[0];

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ 
    role: 'user' | 'assistant'; 
    content: string; 
    citations?: string[];
    confidence?: number;
  }>>([]);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [showClientContext, setShowClientContext] = useState(false);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show incoming call modal on client mount if no client param and not yet seen this session
  useEffect(() => {
    if (!clientParam && !sessionStorage.getItem('billyCallShown')) {
      // Delay showing the incoming call by 2.5 seconds
      const timer = setTimeout(() => {
        setShowIncomingCall(true);
        sessionStorage.setItem('billyCallShown', 'true');
      }, 2500);
      
      return () => clearTimeout(timer);
    } else if (clientParam) {
      // If client param exists, show context immediately
      setShowClientContext(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsRecording(false);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowClientDropdown(false);
      }
    };

    if (showClientDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showClientDropdown]);

  const toggleRecording = () => {
    if (!recognition) {
      alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  const handleAcceptCall = () => {
    setLoadingProfile(true);
    // Mark client as activated so the dashboard shows their record on return
    const stored = localStorage.getItem('activatedClients');
    const ids: string[] = stored ? JSON.parse(stored) : [];
    if (!ids.includes(client.id)) ids.push(client.id);
    localStorage.setItem('activatedClients', JSON.stringify(ids));
    localStorage.setItem('lastActivatedId', client.id);
    localStorage.setItem('lastActivatedAt', Date.now().toString());

    setTimeout(() => {
      setLoadingProfile(false);
      setShowIncomingCall(false);
      setShowClientContext(true); // Show client context after accepting call
    }, 1500);
  };

  if (!client) {
    return (
      <div className="page-container">
        <div className="card" style={{ maxWidth: 600, margin: '40px auto', textAlign: 'center', padding: 40 }}>
          <h2 style={{ marginBottom: 16 }}>Client Not Found</h2>
          <p style={{ marginBottom: 24, color: 'var(--gray-600)' }}>
            The requested client could not be found.
          </p>
          <Link href="/rm" className="btn btn-primary">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const quickQueries = QUICK_QUERIES[client.scenario as keyof typeof QUICK_QUERIES] || [];

  // Show incoming call alert
  if (showIncomingCall) {
    return (
      <div className="page-container">
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-in',
        }}>
          <div style={{
            background: 'white',
            borderRadius: 16,
            padding: 48,
            maxWidth: 500,
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            animation: 'slideUp 0.4s ease-out',
          }}>
            {/* Phone icon with pulse animation */}
            <div style={{
              width: 80,
              height: 80,
              margin: '0 auto 24px',
              background: 'var(--green)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulse 2s infinite',
            }}>
              <span style={{ fontSize: 40 }}>📞</span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 28,
              fontWeight: 600,
              color: 'var(--navy)',
              marginBottom: 12,
            }}>
              Incoming Call
            </h2>

            <div style={{
              fontSize: 18,
              fontWeight: 500,
              color: 'var(--gray-800)',
              marginBottom: 8,
            }}>
              {client.name}
            </div>

            <div style={{
              fontSize: 14,
              color: 'var(--gray-600)',
              marginBottom: 8,
            }}>
              {client.phone}
            </div>

            <div style={{
              fontSize: 13,
              color: 'var(--gray-500)',
              marginBottom: 32,
            }}>
              {client.department}
            </div>

            {loadingProfile ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  border: '4px solid var(--gray-200)',
                  borderTop: '4px solid var(--navy)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}></div>
                <div style={{ fontSize: 14, color: 'var(--gray-600)' }}>
                  Loading client profile...
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <Link href="/rm" className="btn btn-outline" style={{ minWidth: 140, padding: '14px 28px', fontSize: 16 }}>
                  Decline
                </Link>
                <button
                  onClick={handleAcceptCall}
                  className="btn btn-primary"
                  style={{
                    minWidth: 140,
                    padding: '14px 28px',
                    fontSize: 16,
                    background: 'var(--green)',
                    borderColor: 'var(--green)',
                  }}
                >
                  Accept Call
                </button>
              </div>
            )}
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes pulse {
              0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(45, 94, 64, 0.7);
              }
              50% {
                transform: scale(1.05);
                box-shadow: 0 0 0 20px rgba(45, 94, 64, 0);
              }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes pulse-dot {
              0%, 100% {
                opacity: 1;
                transform: scale(1);
              }
              50% {
                opacity: 0.5;
                transform: scale(1.2);
              }
            }
          `}</style>
        </div>
      </div>
    );
  }

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || query.trim();
    if (!textToSend || loading) return;

    setQuery('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setLoading(true);

    try {
      const payload: QueryRequest = {
        action: 'query',
        query: textToSend,
        session_id: sessionId,
      };

      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('API request failed');

      const data: QueryResponse = await res.json();
      
      // Update session ID for conversation continuity
      if (data.session_id) {
        setSessionId(data.session_id);
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.answer,
        citations: data.sources?.map(s => s.source) || [],
        confidence: data.validation?.confidence,
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendClick = () => handleSend();

  return (
    <div className="page-container">
      {/* Page header */}
      <div className="page-header-row fade-up">
        <div>
          <h1 className="page-title">AI Client Assistant</h1>
           </div>
        <Link href="/rm" className="btn btn-outline btn-sm">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Main content */}
      <div style={{ display: 'grid', gridTemplateColumns: showClientContext ? '380px 1fr' : '1fr', gap: 16 }} className="fade-up-1">
        
        {/* Client Profile Sidebar */}
        {showClientContext && (
          <div className="card">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="card-title">Client Profile</div>
              <button
                onClick={() => setShowClientContext(false)}
                className="btn btn-outline btn-sm"
                style={{ padding: '4px 12px', fontSize: 12 }}
                title="Close client context"
              >
                ✕
              </button>
            </div>
          <div className="card-body">
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>
                {client.name}
              </div>
              <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>
                {client.department}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 2 }}>Years of Service</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{client.yearsOfService} years</div>
              </div>
              
              <div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 2 }}>Retirement Eligibility</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{client.retirementEligibility}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 2 }}>Estimated Retirement</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{client.estimatedRetirementDate}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 2 }}>State</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{client.state}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 2 }}>County</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{client.county}</div>
              </div>

              <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: 12, marginTop: 8 }}>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 6 }}>Accrued as of</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13 }}>Sick Days</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{client.sickDaysBalance} days</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13 }}>Vacation Days</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{client.vacationDaysBalance} days</span>
                </div>
              </div>

              {client.status === 'flagged' && (
                <div style={{ 
                  marginTop: 12, 
                  padding: 12, 
                  background: 'var(--red-lt)', 
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--red)'
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--red)', marginBottom: 4 }}>
                    ⚠️ POLICY CHANGE IMPACT
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--gray-700)' }}>
                    {client.policyChangeImpact}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        )}

        {/* Chat Interface */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)' }}>
          <div className="card-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div>
                <div className="card-title">Ask a Question</div>
                <div className="card-subtitle">
                  {showClientContext 
                    ? `Get instant answers about California pension policies`
                    : `General pension policy questions - Account-wide context`
                  }
                </div>
              </div>
              {!showClientContext && (
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                  <button
                    onClick={() => setShowClientDropdown(!showClientDropdown)}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    Recent Clients
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  
                  {showClientDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: 8,
                      background: 'white',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      minWidth: 280,
                      zIndex: 1000,
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        padding: '8px 12px',
                        borderBottom: '1px solid var(--gray-200)',
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'var(--gray-500)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        Recent Clients
                      </div>
                      {CLIENTS.map((c) => (
                        <Link
                          key={c.id}
                          href={`/copilot?client=${c.id}`}
                          onClick={() => {
                            setShowClientContext(true);
                            setShowClientDropdown(false);
                          }}
                          style={{
                            display: 'block',
                            padding: '12px 16px',
                            borderBottom: '1px solid var(--gray-100)',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gray-50)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                        >
                          <div style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: 'var(--navy)',
                            marginBottom: 2,
                          }}>
                            {c.name}
                          </div>
                          <div style={{
                            fontSize: 12,
                            color: 'var(--gray-600)',
                            marginBottom: 4,
                          }}>
                            {c.department}
                          </div>
                          <div style={{
                            fontSize: 11,
                            color: 'var(--gray-500)',
                          }}>
                            {c.yearsOfService} years • {c.retirementEligibility}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Queries */}
          {quickQueries.length > 0 && (
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-200)' }}>
              <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 8 }}>Quick Queries:</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {quickQueries.map((q, idx) => (
                  <button
                    key={idx}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: 12 }}
                    onClick={() => handleSend(q.query)}
                    disabled={loading}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Thread */}
          <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
            {messages.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '20px',
                color: 'var(--gray-500)'
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
                <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
                  AI Client Assistant Ready
                </div>
                <div style={{ fontSize: 14 }}>
                  Ask a question about {client.name}'s pension benefits or California policy changes
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {messages.map((msg, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' 
                  }}>
                    <div style={{
                      maxWidth: '80%',
                      padding: 12,
                      borderRadius: 8,
                      background: msg.role === 'user' ? 'var(--navy)' : 'var(--gray-100)',
                      color: msg.role === 'user' ? 'white' : 'var(--gray-900)',
                    }}>
                      {msg.role === 'assistant' && msg.confidence !== undefined && (
                        <div style={{ 
                          fontSize: 11, 
                          fontWeight: 700, 
                          marginBottom: 8,
                          color: msg.confidence >= 0.9 ? 'var(--green)' : msg.confidence >= 0.7 ? '#D97706' : 'var(--red)'
                        }}>
                          Confidence: {(msg.confidence * 100).toFixed(0)}%
                        </div>
                      )}
                      <div style={{ fontSize: 14, lineHeight: 1.5 }}>{msg.content}</div>
                      {msg.citations && msg.citations.length > 0 && (
                        <>
                          <br />
                          <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {msg.citations.map((citation, i) => (
                              <span key={i} className="badge badge-gold" style={{ fontSize: 11 }}>
                                {citation}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      padding: 12,
                      borderRadius: 8,
                      background: 'var(--gray-100)',
                      color: 'var(--gray-600)',
                      fontSize: 14,
                    }}>
                      Thinking...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div style={{ padding: 20, borderTop: '1px solid var(--gray-200)' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                placeholder="Ask about pension policies, retirement eligibility, or policy changes..."
                className="input"
                style={{ flex: 1 }}
                value={query || ''}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
              />
              <button
                className="btn btn-outline"
                onClick={toggleRecording}
                disabled={loading}
                style={{
                  minWidth: 50,
                  padding: '10px 16px',
                  background: isRecording ? 'var(--red)' : 'white',
                  borderColor: isRecording ? 'var(--red)' : 'var(--gray-300)',
                  color: isRecording ? 'white' : 'var(--gray-700)',
                  position: 'relative',
                }}
                title={isRecording ? 'Stop recording' : 'Start voice input'}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                </svg>
                {isRecording && (
                  <span style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    width: 12,
                    height: 12,
                    background: 'white',
                    borderRadius: '50%',
                    animation: 'pulse-dot 1.5s infinite',
                  }}></span>
                )}
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSendClick}
                disabled={loading || !query.trim()}
                style={{ minWidth: 100, padding: '10px 24px' }}
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
            <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 8 }}>
              💡 Tip: Ask specific questions about {client.name}'s situation for personalized answers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoPilotPage() {
  return (
    <Suspense fallback={
      <div className="page-container">
        <div style={{ textAlign: 'center', padding: 60 }}>Loading...</div>
      </div>
    }>
      <CoPilotInner />
    </Suspense>
  );
}
