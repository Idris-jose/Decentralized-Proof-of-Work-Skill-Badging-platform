import { StatCard } from '@/components/dashboard/stat-card';
import { RecentActivityTable } from '@/components/dashboard/recent-activity-table';
import { Badge, ShieldCheck, Clock } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Badges"
          value="12"
          icon={<Badge className="h-6 w-6 text-muted-foreground" />}
        />
        <StatCard
          title="Verified Badges"
          value="8"
          icon={<ShieldCheck className="h-6 w-6 text-muted-foreground" />}
          description="+2 this month"
        />
        <StatCard
          title="Pending Verification"
          value="4"
          icon={<Clock className="h-6 w-6 text-muted-foreground" />}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
        <RecentActivityTable />
      </div>
    </div>
  );
}
