"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { verificationData, type Verification } from '@/lib/data';
import { Search } from 'lucide-react';
import { VerifyBadgeModal } from './verify-badge-modal';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const TableSkeleton = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-10 w-1/3" />
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {[...Array(6)].map((_, i) => (
                <TableHead key={i}><Skeleton className="h-5 w-24" /></TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto rounded-md" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
);

export function VerificationTable() {
  const [data, setData] = useState<Verification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(verificationData);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(
      item =>
        item.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const getStatusVariant = (status: Verification['status']) => {
    switch (status) {
      case 'Verified':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleVerifyClick = (tokenId: string) => {
    setSelectedToken(tokenId);
  };
  
  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="relative">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by wallet address, ENS, or skill..."
            className="pl-8 w-full md:w-1/3"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Skill</TableHead>
              <TableHead>Developer</TableHead>
              <TableHead>Token ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map(item => (
              <TableRow key={item.tokenId}>
                <TableCell className="font-medium">{item.skill}</TableCell>
                <TableCell>{item.developer}</TableCell>
                <TableCell>{item.tokenId}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(item.status)} className="capitalize">{item.status}</Badge>
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerifyClick(item.tokenId)}
                    disabled={item.status !== 'Pending'}
                  >
                    {item.status === 'Verified' ? 'Verified' : 'Verify'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <VerifyBadgeModal tokenId={selectedToken} onOpenChange={() => setSelectedToken(null)} />
    </Card>
  );
}
