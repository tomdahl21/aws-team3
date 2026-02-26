'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CLIENTS, QUICK_QUERIES } from '@/lib/mock-data';
import type { QueryRequest, QueryResponse } from '@/app/api/query/route';

function CoPilotInner() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('client') ?? CLIENTS[0]?.id ?? 'billy';
  const client = CLIENTS.find((c) => c.id === clientId) ?? CLIENTS[0];
  
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; citations?: string[] }>>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || query.trim();
    if (!textToSend || loading) return;

    setQuery('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setLoading(true);

    try {
      const payload: QueryRequest = {
        query: textToSend,
        persona: 'new',
        clientId: client.id,
        jobTitle: client.department,
        yearsOfService: client.yearsOfService,
        state: client.state,
        county: client.county,
      };

      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('API request failed');

      const data: QueryResponse = await res.json();
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response,
        citations: data.citations 
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

  return (
    <div className="page-container">
      {/* Page header */}
      <div className="page-header-row fade-up">
        <div>
          <h1 className="page-title">AI Client Assistant</h1>
          <p className="page-subtitle">Pension policy support for {client.name}</p>
        </div>
        <Link href="/rm" className="btn btn-outline btn-sm">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Main content */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 16 }} className="fade-up-1">
        
        {/* Client Profile Sidebar */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Client Profile</div>
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
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 6 }}>Accrued Balances</div>
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

        {/* Chat Interface */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)' }}>
          <div className="card-header">
            <div>
              <div className="card-title">Ask a Question</div>
              <div className="card-subtitle">Get instant answers about California pension policies</div>
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
                      <div style={{ fontSize: 14, lineHeight: 1.5 }}>{msg.content}</div>
                      {msg.citations && msg.citations.length > 0 && (
                        <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {msg.citations.map((citation, i) => (
                            <span key={i} className="badge badge-gold" style={{ fontSize: 11 }}>
                              {citation}
                            </span>
                          ))}
                        </div>
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
                className="btn btn-primary"
                onClick={handleSend}
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
