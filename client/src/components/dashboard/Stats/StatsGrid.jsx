import StatCard from "./StatCard";
import { Users, Shield, FileText, DollarSign } from "lucide-react";

const StatsGrid = ({ statsData }) => {
  const defaultStats = [
    {
      title: "Total Customers",
      value: "8,932",
      change: "+12.4%",
      isPositive: true,
      icon: Users,
      color: "blue",
      description: "Active policyholders on platform",
    },
    {
      title: "Active Policies",
      value: "24,583",
      change: "+8.7%",
      isPositive: true,
      icon: Shield,
      color: "cyan",
      description: "Underwritten carrier agreements",
    },
    {
      title: "Pending Claims",
      value: "1,247",
      change: "-3.2%",
      isPositive: true,
      icon: FileText,
      color: "amber",
      description: "Under active risk assessment",
    },
    {
      title: "Monthly Revenue",
      value: "$4,520,000",
      change: "+15.8%",
      isPositive: true,
      icon: DollarSign,
      color: "emerald",
      description: "Gross written premium collected",
    },
  ];

  const data = statsData || defaultStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {data.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;
