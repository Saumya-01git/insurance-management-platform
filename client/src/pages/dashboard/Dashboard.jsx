import { useState, useEffect } from "react";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsGrid from "../../components/dashboard/Stats/StatsGrid";
import QuickActions from "../../components/dashboard/QuickActions";
import RevenueChart from "../../components/dashboard/Charts/RevenueChart";
import PolicyChart from "../../components/dashboard/Charts/PolicyChart";
import ClaimsChart from "../../components/dashboard/Charts/ClaimsChart";
import CustomerGrowthChart from "../../components/dashboard/Charts/CustomerGrowthChart";
import RecentCustomersTable from "../../components/dashboard/Tables/RecentCustomersTable";
import RecentClaimsTable from "../../components/dashboard/Tables/RecentClaimsTable";
import RecentActivity from "../../components/dashboard/Activity/RecentActivity";
import NotificationPanel from "../../components/dashboard/NotificationPanel";
import UpcomingRenewals from "../../components/dashboard/UpcomingRenewals";
import LoadingSkeleton from "../../components/dashboard/LoadingSkeleton";

// Services
import { customerService } from "../../services/customerService";
import { policyService } from "../../services/policyService";
import { claimService } from "../../services/claimService";
import { paymentService } from "../../services/paymentService";
import { formatCurrency } from "../../utils/policyHelpers";
import { Users, Shield, FileText, DollarSign } from "lucide-react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [liveStats, setLiveStats] = useState(null);

  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [payments, setPayments] = useState([]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      const [custData, polData, clmData, payData] = await Promise.all([
        customerService.getCustomers().catch(() => []),
        policyService.getPolicies().catch(() => []),
        claimService.getClaims().catch(() => []),
        paymentService.getPayments().catch(() => []),
      ]);

      const safeCust = Array.isArray(custData) ? custData : [];
      const safePol = Array.isArray(polData) ? polData : [];
      const safeClm = Array.isArray(clmData) ? clmData : [];
      const safePay = Array.isArray(payData) ? payData : [];

      setCustomers(safeCust);
      setPolicies(safePol);
      setClaims(safeClm);
      setPayments(safePay);

      const customersCount = safeCust.length;
      const policiesCount = safePol.length;
      const pendingClaimsCount = safeClm.filter(
        (c) => (c.status || "").toUpperCase() === "PENDING" || (c.status || "").toUpperCase().includes("REVIEW")
      ).length;

      const totalRevenue = safePay.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) ||
        safePol.reduce((acc, curr) => acc + (Number(curr.premium) || 0), 0);

      setIsLiveConnected(true);

      setLiveStats([
        {
          title: "Total Customers",
          value: customersCount.toLocaleString(),
          change: "+12.4%",
          isPositive: true,
          icon: Users,
          color: "blue",
          description: "Active onboarded policyholders",
        },
        {
          title: "Active Policies",
          value: policiesCount.toLocaleString(),
          change: "+8.7%",
          isPositive: true,
          icon: Shield,
          color: "cyan",
          description: "Underwritten carrier agreements",
        },
        {
          title: "Pending Claims",
          value: pendingClaimsCount.toLocaleString(),
          change: "-3.2%",
          isPositive: true,
          icon: FileText,
          color: "amber",
          description: "Under active risk assessment",
        },
        {
          title: "Monthly Revenue",
          value: formatCurrency(totalRevenue),
          change: "+15.8%",
          isPositive: true,
          icon: DollarSign,
          color: "emerald",
          description: "Gross written premium collected",
        },
      ]);
    } catch (err) {
      console.warn("Error loading dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="animate-in fade-in duration-300 pb-10">
      {/* Top Page Header */}
      <div style={{ marginBottom: "28px" }}>
        <DashboardHeader
          title="Carrier Executive Dashboard"
          subtitle="Enterprise Insurance Carrier Metrics & Underwriting Analytics"
        />
      </div>

      {/* Welcome Banner */}
      <div style={{ marginBottom: "28px" }}>
        <WelcomeCard />
      </div>

      {/* 4 Main KPI Stat Cards */}
      <div style={{ marginBottom: "28px" }}>
        <StatsGrid statsData={liveStats} />
      </div>

      {/* Quick Action Tools Bar */}
      <div style={{ marginBottom: "28px" }}>
        <QuickActions />
      </div>

      {/* Charts Grid - Section 1 (Revenue & Claims Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7" style={{ marginBottom: "28px" }}>
        <div className="lg:col-span-8">
          <RevenueChart paymentsList={payments} policiesList={policies} />
        </div>
        <div className="lg:col-span-4">
          <ClaimsChart claimsList={claims} />
        </div>
      </div>

      {/* Charts Grid - Section 2 (Policy Mix & Customer Acquisition) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7" style={{ marginBottom: "28px" }}>
        <div className="lg:col-span-6">
          <PolicyChart policiesList={policies} />
        </div>
        <div className="lg:col-span-6">
          <CustomerGrowthChart customersList={customers} />
        </div>
      </div>

      {/* Tables Section (Recent Customers & Recent Claims) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7" style={{ marginBottom: "28px" }}>
        <div className="lg:col-span-6">
          <RecentCustomersTable />
        </div>
        <div className="lg:col-span-6">
          <RecentClaimsTable />
        </div>
      </div>

      {/* Bottom Operational Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7" style={{ marginBottom: "28px" }}>
        <div className="lg:col-span-4">
          <UpcomingRenewals />
        </div>
        <div className="lg:col-span-4">
          <RecentActivity />
        </div>
        <div className="lg:col-span-4">
          <NotificationPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;