import { PageHeader } from '@/components/ui/PageHeader';
import { HealthCheckDemo } from '@/components/demo/HealthCheckDemo';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Welcome to GrowEase"
        description="Your SaaS platform for growth and productivity"
      />
      <HealthCheckDemo />
    </div>
  );
}

