'use client';

import { Printer, Share2, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface OrderActionsSectionProps {
  onPrint: () => void;
  onShare: () => void;
  onReturnToMenu: () => void;
}

export default function OrderActionsSection({ 
  onPrint, 
  onShare, 
  onReturnToMenu 
}: OrderActionsSectionProps) {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button
            onClick={onPrint}
            variant="outline"
            className="w-full justify-start"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Receipt
          </Button>
          
          <Button
            onClick={onShare}
            variant="outline"
            className="w-full justify-start"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Order
          </Button>
          
          <Button
            onClick={onReturnToMenu}
            variant="primary"
            className="w-full justify-start"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Order Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}