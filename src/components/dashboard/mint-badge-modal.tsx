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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUI } from '@/contexts/ui-context';

const formSchema = z.object({
  skillName: z.string().min(2, { message: 'Skill name must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  proofLink: z.string().url({ message: 'Please enter a valid URL for proof of skill.' }),
});

export function MintBadgeModal() {
  const { isMintModalOpen, closeMintModal } = useUI();
  const { toast } = useToast();
  const [isMinting, setIsMinting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillName: '',
      description: '',
      proofLink: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsMinting(true);
    console.log('Minting badge with values:', values);
    // Placeholder for Ethers.js mintBadge()
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsMinting(false);
    closeMintModal();
    form.reset();
    toast({
      title: 'Minting Initiated',
      description: `Your skill badge for "${values.skillName}" is being minted.`,
    });
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      closeMintModal();
    }
  }

  return (
    <Dialog open={isMintModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mint New Badge</DialogTitle>
          <DialogDescription>
            Showcase your skills by minting a new badge. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="skillName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Advanced React" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your skill and how you acquired it."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="proofLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proof of Skill (URL)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => closeMintModal()}>Cancel</Button>
              <Button type="submit" disabled={isMinting}>
                {isMinting ? 'Minting...' : 'Mint Badge'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
