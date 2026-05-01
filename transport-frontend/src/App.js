import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Activity, 
  Server, 
  MapPin, 
  Zap, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  RefreshCw
} from 'lucide-react';

function App() {
  const [transports, setTransports] = useState([]);
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    status: 'ACTIVE',
    bandwidth: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransports = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/transport');
      const data = await response.json();
      setTransports(data);
    } catch (error) {
      showMessage('Error fetching transports', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransports();
  }, [fetchTransports]);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`/transport/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        showMessage('Resource updated successfully', 'success');
        setEditingId(null);
      } else {
        await fetch('/transport', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        showMessage('New resource provisioned', 'success');
      }
      setFormData({ source: '', destination: '', status: 'ACTIVE', bandwidth: '' });
      fetchTransports();
    } catch (error) {
      showMessage('Transmission error: Failed to save resource', 'error');
    }
  };

  const handleEdit = (transport) => {
    setFormData({
      source: transport.source,
      destination: transport.destination,
      status: transport.status,
      bandwidth: transport.bandwidth
    });
    setEditingId(transport.id);
    // Scroll to top on mobile when editing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirm resource decommissioning? This action cannot be undone.')) {
      try {
        await fetch(`/transport/${id}`, { method: 'DELETE' });
        showMessage('Resource successfully decommissioned', 'success');
        fetchTransports();
      } catch (error) {
        showMessage('Error: Resource decommissioning failed', 'error');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ source: '', destination: '', status: 'ACTIVE', bandwidth: '' });
    setEditingId(null);
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      ACTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      INACTIVE: 'bg-rose-50 text-rose-700 border-rose-200',
      MAINTENANCE: 'bg-amber-50 text-amber-700 border-amber-200'
    };
    
    const Icons = {
      ACTIVE: <CheckCircle2 className="w-3 h-3 mr-1" />,
      INACTIVE: <XCircle className="w-3 h-3 mr-1" />,
      MAINTENANCE: <AlertCircle className="w-3 h-3 mr-1" />
    };

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${styles[status] || styles.INACTIVE}`}>
        {Icons[status]}
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-tech">
            <Activity className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">TAPI COMMAND CENTER</h1>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em]">Transport Resource Management Protocol</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchTransports} 
            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <div className="h-6 w-[1px] bg-slate-200"></div>
          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded-tech">v1.2.4-stable</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row bg-slate-50 overflow-hidden">
        {/* Left Sidebar: Command Panel */}
        <aside className="w-full lg:w-[350px] bg-white border-r border-slate-200 p-6 flex flex-col overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" />
              {editingId ? 'RECONFIGURE RESOURCE' : 'PROVISION NEW RESOURCE'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">Configure transport layer parameters below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-tech">Source Endpoint</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="e.g. LON-NODE-01"
                  className="input-tech pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label-tech">Destination Endpoint</label>
              <div className="relative">
                <Server className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. NYC-DATA-04"
                  className="input-tech pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label-tech">Operating Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                className="input-tech"
              >
                <option value="ACTIVE">ACTIVE - ONLINE</option>
                <option value="INACTIVE">INACTIVE - OFFLINE</option>
                <option value="MAINTENANCE">MAINTENANCE - BYPASS</option>
              </select>
            </div>

            <div>
              <label className="label-tech">Bandwidth Allocation (Mbps)</label>
              <div className="relative">
                <Zap className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  name="bandwidth"
                  value={formData.bandwidth}
                  onChange={handleChange}
                  placeholder="Max 10000"
                  className="input-tech pl-10"
                  required
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                {editingId ? <RefreshCw className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {editingId ? 'Apply Configuration' : 'Commit Provisioning'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className="btn-secondary w-full">
                  Abort Reconfiguration
                </button>
              )}
            </div>
          </form>

          {/* Toast Message (Absolute positioned relative to parent) */}
          {message.text && (
            <div className={`mt-auto p-4 rounded-tech text-xs font-bold border animate-in fade-in slide-in-from-bottom-4 duration-300 ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              {message.text}
            </div>
          )}
        </aside>

        {/* Right Content: Resource Monitor */}
        <section className="flex-1 p-6 overflow-x-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">RESOURCE MONITOR</h2>
                <p className="text-xs text-slate-500 font-medium">Live inventory of provisioned transport paths.</p>
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-white border border-slate-200 rounded-tech flex items-center gap-2 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{transports.length} Active Resources</span>
                </div>
              </div>
            </div>

            <div className="card-tech overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resource ID</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Topology Path</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Capacity</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Provisioned</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {transports.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-12 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-400">
                            <Server className="w-12 h-12 mb-2 opacity-20" />
                            <p className="text-sm font-medium">No transport resources provisioned.</p>
                            <p className="text-xs">Use the command panel to create your first resource.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      transports.map((transport) => (
                        <tr key={transport.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-4 py-4">
                            <span className="font-mono text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                              {transport.id.substring(0, 8)}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-700">{transport.source}</span>
                              <div className="h-[1px] w-4 bg-slate-200"></div>
                              <span className="text-sm font-bold text-slate-700">{transport.destination}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <StatusBadge status={transport.status} />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <Zap className="w-3 h-3 text-amber-500" />
                              <span className="text-sm font-semibold text-slate-600">{transport.bandwidth} <span className="text-[10px] text-slate-400">Mbps</span></span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-xs text-slate-500 font-medium">
                              {new Date(transport.createdAt).toLocaleDateString()}
                              <span className="block text-[10px] opacity-60">{new Date(transport.createdAt).toLocaleTimeString()}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleEdit(transport)}
                                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-all"
                                title="Edit Resource"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete(transport.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all"
                                title="Delete Resource"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Footer / System Info */}
            <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-3 h-3" />
                System Status: <span className="text-emerald-500">Operational</span>
              </p>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Latency: 14ms</span>
                <span>Uptime: 99.98%</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
