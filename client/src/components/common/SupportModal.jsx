import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { ticketService } from "../../services/ticketService";
import {
  X,
  LifeBuoy,
  Send,
  PhoneCall,
  Mail,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Server,
  MessageSquare,
  PlusCircle,
  Inbox,
  User,
  ShieldAlert,
} from "lucide-react";
import { toast } from "react-hot-toast";

const REAL_CARRIER_AGENTS = [
  { name: "Saumya", email: "saumya@insurepulse.io", role: "AGENT", title: "Lead Underwriting Agent" },
  { name: "Sarah Jenkins", email: "sarah.j@acme.org", role: "AGENT", title: "Regional Underwriter" },
  { name: "Michael Sterling", email: "m.sterling@gmail.com", role: "AGENT", title: "Enterprise Risk Officer" },
];

const SupportModal = ({ isOpen, onClose, initialTab = "raise" }) => {
  const { user } = useAuth();
  const userRole = (user?.role || "ADMIN").toUpperCase();

  const [activeTab, setActiveTab] = useState(initialTab); // "raise" or "tickets"
  const [ticketsList, setTicketsList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyStatus, setReplyStatus] = useState("IN_PROGRESS");

  const [selectedAgent, setSelectedAgent] = useState(REAL_CARRIER_AGENTS[0]);

  const [formData, setFormData] = useState({
    subject: "",
    category: userRole === "CUSTOMER" ? "POLICY_HELP" : userRole === "AGENT" ? "UNDERWRITING_OVERRIDE" : "SYSTEM_REST_API",
    urgency: "NORMAL",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const loadTickets = async () => {
    try {
      const data = await ticketService.getTickets(userRole);
      setTicketsList(Array.isArray(data) ? data : []);
      if (data && data.length > 0) {
        setSelectedTicket((prev) => prev || data[0]);
      }
    } catch (err) {
      console.warn("Error loading tickets:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab || (userRole === "CUSTOMER" ? "raise" : "tickets"));
      loadTickets();
    }
  }, [isOpen, initialTab, userRole]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) {
      toast.error("Please enter a subject and message.");
      return;
    }

    try {
      const created = await ticketService.createTicket({
        ...formData,
        user: {
          name: user?.name || "Carrier User",
          email: user?.email || "user@insurepulse.io",
          role: userRole,
        },
        assignedAgent: userRole === "CUSTOMER" ? selectedAgent : { name: "Saumya", email: "saumya@insurepulse.io", role: "ADMIN" },
      });

      setTicketId(created.id || created.ticketId);
      setIsSubmitted(true);
      toast.success(`Ticket ${created.id} routed to Agent ${userRole === "CUSTOMER" ? selectedAgent.name : "Saumya"}!`, { icon: "🎧" });
      loadTickets();
    } catch (err) {
      toast.error("Failed to create ticket.");
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicket) {
      toast.error("Please enter a reply message.");
      return;
    }

    try {
      const updated = await ticketService.replyToTicket(selectedTicket.id, {
        message: replyMessage,
        senderName: user?.name || "Saumya",
        senderRole: userRole,
        status: replyStatus,
      });

      setSelectedTicket(updated);
      setReplyMessage("");
      toast.success(`Response sent on ticket ${selectedTicket.id}!`, { icon: "💬" });
      loadTickets();
    } catch (err) {
      toast.error("Failed to send reply.");
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      subject: "",
      category: userRole === "CUSTOMER" ? "POLICY_HELP" : userRole === "AGENT" ? "UNDERWRITING_OVERRIDE" : "SYSTEM_REST_API",
      urgency: "NORMAL",
      message: "",
    });
    setActiveTab("tickets");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-4xl rounded-3xl bg-white dark:bg-[#0C1424] border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0F2744] via-[#1E3A8A] to-[#0A172A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-cyan-400 border border-white/10">
              <LifeBuoy className="w-5.5 h-5.5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight">
                {userRole === "CUSTOMER"
                  ? "Customer Policyholder Support"
                  : userRole === "AGENT"
                  ? "Agent & Underwriting Desk"
                  : "Enterprise Admin & System Operations"}
              </h3>
              <p className="text-xs text-cyan-300 font-semibold">
                Logged in as <span className="font-extrabold underline">{user?.name || "User"}</span> ({userRole})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Tabs Toggle */}
            <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/10 text-xs font-bold">
              <button
                onClick={() => setActiveTab("raise")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "raise" ? "bg-white text-slate-900 shadow-sm" : "text-slate-300 hover:text-white"
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Raise Ticket</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("tickets");
                  loadTickets();
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "tickets" ? "bg-white text-slate-900 shadow-sm" : "text-slate-300 hover:text-white"
                }`}
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>
                  {userRole === "ADMIN" ? "All Carrier Tickets" : userRole === "AGENT" ? "Agent Queue" : "My Tickets"} ({ticketsList.length})
                </span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === "raise" ? (
            <div className="max-w-xl mx-auto space-y-6">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 border border-emerald-200 dark:border-emerald-900/30 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">Ticket Successfully Routed!</h4>
                    <p className="text-xs font-mono font-extrabold text-[#2563EB] dark:text-cyan-400">
                      Ticket Reference ID: {ticketId}
                    </p>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-1 text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white pb-1 border-b border-slate-200 dark:border-slate-800">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>Support Queue Assignment</span>
                      </div>
                      <p className="pt-1">
                        {userRole === "CUSTOMER"
                          ? `Your ticket is assigned to Agent ${selectedAgent.name}. They will review and reply directly in your Support Desk thread!`
                          : userRole === "AGENT"
                          ? `Your underwriting override ticket is routed to Lead Underwriter Agent Saumya.`
                          : `System IT ticket logged to Enterprise Support Queue & System audit log.`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                  >
                    View Ticket Queue & Replies
                  </button>
                </div>
              ) : (
                <>
                  {/* Customer Agent Selection */}
                  {userRole === "CUSTOMER" && (
                    <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 space-y-2">
                      <label className="block text-xs font-extrabold text-slate-900 dark:text-white">
                        Select Assigned Carrier Agent to Contact:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {REAL_CARRIER_AGENTS.map((agent, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedAgent(agent)}
                            className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                              selectedAgent.name === agent.name
                                ? "bg-white dark:bg-slate-800 border-[#2563EB] text-[#2563EB] dark:text-cyan-400 font-extrabold shadow-md ring-2 ring-blue-500/20"
                                : "bg-white/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                            }`}
                          >
                            <p className="font-black text-xs leading-snug">{agent.name}</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium pt-0.5">{agent.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          Support Category
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                          className="w-full h-11 px-3 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
                        >
                          {userRole === "CUSTOMER" ? (
                            <>
                              <option value="POLICY_HELP">Policy Coverage Question</option>
                              <option value="CLAIM_HELP">File or Check Claim Status</option>
                              <option value="PAYMENT_HELP">Premium Payment Assistance</option>
                              <option value="DOC_HELP">Upload Passport / KYC Document</option>
                            </>
                          ) : userRole === "AGENT" ? (
                            <>
                              <option value="UNDERWRITING_OVERRIDE">Underwriting Override Request</option>
                              <option value="RISK_REASSESSMENT">Customer Risk Tier Re-assessment</option>
                              <option value="COMMISSION_QUERY">Agent Commission & Settlement Query</option>
                              <option value="DOCUMENT_OVERRIDE">Document Verification Manual Override</option>
                            </>
                          ) : (
                            <>
                              <option value="SYSTEM_REST_API">PostgreSQL REST API Diagnostic</option>
                              <option value="RBAC_PERMISSIONS">User Roles & Access Control (RBAC)</option>
                              <option value="SECURITY_AUDIT">Carrier System Audit Log Review</option>
                              <option value="DATABASE_SYNC">Database Synchronization Query</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          Urgency Level
                        </label>
                        <select
                          value={formData.urgency}
                          onChange={(e) => setFormData((p) => ({ ...p, urgency: e.target.value }))}
                          className="w-full h-11 px-3 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
                        >
                          <option value="NORMAL">Standard Queue</option>
                          <option value="HIGH">High Priority</option>
                          <option value="URGENT">Urgent Escalation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                        Ticket Subject <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                        placeholder={
                          userRole === "CUSTOMER"
                            ? `e.g. Question for Agent ${selectedAgent.name} regarding Policy #POL-9025`
                            : userRole === "AGENT"
                            ? "e.g. Urgent underwriting clearance for David Vance Commercial Property"
                            : "e.g. PostgreSQL REST API endpoint latency diagnostic"
                        }
                        className="w-full h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                        Ticket Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                        placeholder="Describe your request in detail..."
                        className="w-full p-3.5 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>Routes to Agent: {userRole === "CUSTOMER" ? selectedAgent.name : "Saumya"}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={onClose}
                          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send Ticket</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          ) : (
            /* Ticket Support Queue & Reply Thread Desk */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[480px]">
              {/* Left Tickets List */}
              <div className="md:col-span-5 border-r border-slate-200/80 dark:border-slate-800 pr-4 overflow-y-auto space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                    {userRole === "ADMIN" ? "All System Tickets" : userRole === "AGENT" ? "Agent Assigned Queue" : "My Raised Tickets"}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#2563EB]">
                    {ticketsList.length} Total
                  </span>
                </div>

                {ticketsList.map((t) => {
                  const isSelected = selectedTicket?.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTicket(t)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                        isSelected
                          ? "bg-blue-50/80 dark:bg-blue-950/40 border-[#2563EB] shadow-xs"
                          : "bg-white dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-extrabold text-[11px] text-[#2563EB] dark:text-cyan-400">
                          {t.id || t.ticketId}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${
                            t.status === "RESOLVED"
                              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-200"
                              : t.status === "IN_PROGRESS"
                              ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-200"
                              : "bg-amber-50 dark:bg-amber-950/40 text-amber-600 border-amber-200"
                          }`}
                        >
                          {t.status}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {t.subject}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                        <span>From: {t.raisedBy?.name || "User"} ({t.raisedBy?.role})</span>
                        <span className="text-[#2563EB] font-bold">To: {t.assignedAgent?.name || "Agent Saumya"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Ticket Thread & Reply Box */}
              <div className="md:col-span-7 flex flex-col h-full overflow-hidden">
                {selectedTicket ? (
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    {/* Header */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-black text-xs text-[#2563EB] dark:text-cyan-400">
                          {selectedTicket.id}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          Raised: {new Date(selectedTicket.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {selectedTicket.subject}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-semibold pt-0.5">
                        <span>From: <strong className="text-slate-800 dark:text-slate-200">{selectedTicket.raisedBy?.name}</strong> ({selectedTicket.raisedBy?.role})</span>
                        <span>•</span>
                        <span>Assigned Agent: <strong className="text-[#2563EB]">{selectedTicket.assignedAgent?.name || "Saumya"}</strong></span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-200 font-medium pt-1.5 border-t border-slate-200/60 dark:border-slate-800">
                        "{selectedTicket.message}"
                      </p>
                    </div>

                    {/* Replies Scroll List */}
                    <div className="flex-1 overflow-y-auto space-y-3 p-1">
                      {selectedTicket.responses && selectedTicket.responses.length > 0 ? (
                        selectedTicket.responses.map((resp, idx) => (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
                              resp.senderRole === userRole
                                ? "bg-blue-50/60 dark:bg-blue-950/30 border-blue-200/80 dark:border-blue-900/30 ml-4"
                                : "bg-slate-50 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 mr-4"
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                              <span className="flex items-center gap-1.5">
                                <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                                {resp.senderName} ({resp.senderRole})
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                {new Date(resp.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                              {resp.message}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-slate-400 space-y-1">
                          <Inbox className="w-8 h-8 mx-auto text-slate-300" />
                          <p className="text-xs font-semibold">No replies sent yet.</p>
                          <p className="text-[11px]">Type a response below to reply to this ticket.</p>
                        </div>
                      )}
                    </div>

                    {/* Reply Input Box - Agents & Admins can reply */}
                    <form onSubmit={handleSendReply} className="pt-2 border-t border-slate-200/80 dark:border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <label className="font-bold text-slate-800 dark:text-slate-200">
                          Reply as {user?.name || "Saumya"} ({userRole}):
                        </label>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400 font-medium">Update Status:</span>
                          <select
                            value={replyStatus}
                            onChange={(e) => setReplyStatus(e.target.value)}
                            className="h-8 px-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                          >
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="RESOLVED">Resolved</option>
                            <option value="OPEN">Open</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          required
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          placeholder={
                            userRole === "ADMIN"
                              ? `Reply as Enterprise Admin Saumya to ${selectedTicket.raisedBy?.name}...`
                              : userRole === "AGENT"
                              ? `Reply to Customer ${selectedTicket.raisedBy?.name}...`
                              : "Type response to your assigned agent Saumya..."
                          }
                          className="flex-1 h-11 px-3.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#2563EB]"
                        />
                        <button
                          type="submit"
                          className="h-11 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send Reply</span>
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                    Select a ticket on the left to view response thread.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportModal;
