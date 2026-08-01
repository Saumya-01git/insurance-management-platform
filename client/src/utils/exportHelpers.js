/**
 * Universal CSV/File Export Utility for Browser Downloads
 */

export const downloadCSV = (filename, headers, rows) => {
  if (!rows || rows.length === 0) return;

  const escapeCSV = (field) => {
    if (field === null || field === undefined) return '""';
    const str = String(field).replace(/"/g, '""');
    return `"${str}"`;
  };

  const headerLine = headers.map(escapeCSV).join(",");
  const rowLines = rows.map((row) => row.map(escapeCSV).join(","));
  const csvContent = "data:text/csv;charset=utf-8," + [headerLine, ...rowLines].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadPaymentReceipt = (payment) => {
  const paymentId = payment.paymentId || payment.id || "PAY-8801";
  const filename = `Payment_Receipt_${paymentId}.csv`;

  const headers = ["Payment ID", "Customer", "Policy Number", "Amount ($)", "Method", "Transaction ID", "Settlement Date", "Status", "Gateway Processor"];
  const row = [[
    paymentId,
    typeof payment.customer === "object" ? (payment.customer?.fullName || "Carrier Customer") : (payment.customer || "Carrier Customer"),
    payment.policyNumber || "POL-9012",
    payment.amount || 0,
    payment.paymentMethod || "ACH Wire",
    payment.transactionId || "TXN-9901428",
    payment.date || new Date().toISOString().split("T")[0],
    payment.status || "COMPLETED",
    payment.gateway || "Stripe Enterprise Gateway",
  ]];

  downloadCSV(filename, headers, row);
};

export const downloadPoliciesCSV = (policies = []) => {
  const filename = `Policies_Portfolio_${new Date().toISOString().split("T")[0]}.csv`;
  const headers = ["Policy Number", "Customer", "Policy Type", "Annual Premium ($)", "Coverage Limit ($)", "Start Date", "End Date", "Status"];
  const rows = policies.map((p) => [
    p.policyNumber || p.id,
    typeof p.customer === "object" ? (p.customer?.fullName || "Carrier Customer") : (p.customer || "Carrier Customer"),
    p.policyType,
    p.premium,
    p.coverageAmount,
    p.startDate,
    p.endDate,
    p.status,
  ]);

  downloadCSV(filename, headers, rows);
};

export const downloadClaimsCSV = (claims = []) => {
  const filename = `Claims_Registry_${new Date().toISOString().split("T")[0]}.csv`;
  const headers = ["Claim ID", "Customer", "Policy Number", "Claim Type", "Claim Amount ($)", "Date", "Status", "Assigned Agent"];
  const rows = claims.map((c) => [
    c.claimId || c.id,
    typeof c.customer === "object" ? (c.customer?.fullName || "Carrier Customer") : (c.customer || "Carrier Customer"),
    c.policyNumber,
    c.claimType,
    c.claimAmount,
    c.date,
    c.status,
    c.assignedAgent,
  ]);

  downloadCSV(filename, headers, rows);
};

export const downloadPaymentsCSV = (payments = []) => {
  const filename = `Payments_Ledger_${new Date().toISOString().split("T")[0]}.csv`;
  const headers = ["Payment ID", "Customer", "Policy Number", "Amount ($)", "Method", "Transaction ID", "Date", "Status"];
  const rows = payments.map((p) => [
    p.paymentId || p.id,
    typeof p.customer === "object" ? (p.customer?.fullName || "Carrier Customer") : (p.customer || "Carrier Customer"),
    p.policyNumber,
    p.amount,
    p.paymentMethod,
    p.transactionId,
    p.date,
    p.status,
  ]);

  downloadCSV(filename, headers, rows);
};

export const downloadCustomersCSV = (customers = []) => {
  const filename = `Customers_Directory_${new Date().toISOString().split("T")[0]}.csv`;
  const headers = ["Customer ID", "Full Name", "Email", "Phone", "Occupation", "Policies Count", "Total Premium ($)", "Status", "Created Date"];
  const rows = customers.map((c) => [
    c.id,
    c.fullName,
    c.email,
    c.phone,
    c.occupation || "Individual",
    c.policiesCount || c.policies?.length || 0,
    c.totalPremium,
    c.status,
    c.createdDate,
  ]);

  downloadCSV(filename, headers, rows);
};
