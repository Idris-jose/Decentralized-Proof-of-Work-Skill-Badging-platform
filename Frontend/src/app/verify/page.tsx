import { VerificationTable } from '@/components/verify/verification-table';

export default function VerifyPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Verify Badges</h2>
        <p className="text-muted-foreground">
          Search for a developer to verify their skill badges on the blockchain.
        </p>
      </div>
      <VerificationTable />
    </div>
  );
}
