"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type VerifyBadgeModalProps = {
  tokenId: string | null;
  onOpenChange: (open: boolean) => void;
};

export function VerifyBadgeModal({ tokenId, onOpenChange }: VerifyBadgeModalProps) {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (!tokenId) return;
    setIsVerifying(true);
    // Placeholder for handleVerifyBadge(tokenId) from Ethers.js
    console.log('Verifying token:', tokenId);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate success/failure
    const success = Math.random() > 0.3;

    setIsVerifying(false);
    onOpenChange(false);
    if (success) {
      toast({
        title: '✅ Success!',
        description: `Badge with Token ID ${tokenId} has been successfully verified.`,
      });
    } else {
      toast({
        title: 'Verification Failed',
        description: 'Could not verify the badge. Please check the details and try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={!!tokenId} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Badge</DialogTitle>
          <DialogDescription>
            Confirm the details and verify the skill badge on the blockchain.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tokenId" className="text-right">
              Token ID
            </Label>
            <Input id="tokenId" value={tokenId || ''} readOnly className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleVerify} disabled={isVerifying}>
            {isVerifying ? 'Verifying...' : 'Verify on Blockchain'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
