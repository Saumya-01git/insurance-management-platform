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
import SectionDivider from "../../components/common/SectionDivider";

// Services
import { customerService } from "../../services/customerService";
import { policyService } from "../../services/policyService";
import { claimService } from "../../services/claimService";
import { paymentService } from "../../services/paymentService";
import { formatCurrency } from "../../utils/policyHelpers";
import { Users, Shield, FileText, DollarSign, Activity, Zap, BarChart3, Clock, Layers } from "lucide-react";

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
    <div className="animate-in fade-in duration-300 pb-16">
      {/* Top Page Header */}
      <div>
        <DashboardHeader
          title="Carrier Executive Dashboard"
          subtitle="Enterprise Insurance Carrier Metrics & Underwriting Analytics"
        />
      </div>

      {/* Welcome Banner */}
      <div>
        <WelcomeCard />
      </div>

      {/* Section Divider 1: Performance KPIs */}
      <SectionDivider
        title="Executive Performance Metrics"
        subtitle="Key carrier indicators and gross premium volume"
        badge="Real-time KPIs"
        icon={Activity}
      />

      {/* 4 Main KPI Stat Cards */}
      <div>
        <StatsGrid statsData={liveStats} />
      </div>

      {/* Section Divider 2: Operations & Quick Tools */}
      <SectionDivider
        title="Carrier Suite Operations"
        subtitle="One-click workflows for policyholders and claims"
        badge="Quick Tools"
        icon={Zap}
      />

      {/* Quick Action Tools Bar */}
      <div>
        <QuickActions />
      </div>

      {/* Section Divider 3: Financial & Underwriting Analytics */}
      <SectionDivider
        title="Financial & Underwriting Analytics"
        subtitle="Revenue trends, loss claim ratios, and policy distributions"
        badge="Analytics Engine"
        icon={BarChart3}
      />

      {/* Charts Grid - Section 1 (Revenue & Claims Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-8">
          <RevenueChart paymentsList={payments} policiesList={policies} />
        </div>
        <div className="lg:col-span-4">
          <ClaimsChart claimsList={claims} />
        </div>
      </div>

      {/* Charts Grid - Section 2 (Policy Mix & Customer Acquisition) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6">
          <PolicyChart policiesList={policies} />
        </div>
        <div className="lg:col-span-6">
          <CustomerGrowthChart customersList={customers} />
        </div>
      </div>

      {/* Section Divider 4: Customer & Claims Audit Records */}
      <SectionDivider
        title="Active Onboarding & Claims Registry"
        subtitle="Recent policyholder contracts and underwriting submissions"
        badge="Audit Stream"
        icon={Layers}
      />

      {/* Tables Section (Recent Customers & Recent Claims) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6">
          <RecentCustomersTable />
        </div>
        <div className="lg:col-span-6">
          <RecentClaimsTable />
        </div>
      </div>

      {/* Section Divider 5: Intelligence & Operational Feed */}
      <SectionDivider
        title="Operational Intelligence & Renewals"
        subtitle="Expiring policies, system notifications, and audit feed"
        badge="System Health"
        icon={Clock}
      />

      {/* Bottom Operational Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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