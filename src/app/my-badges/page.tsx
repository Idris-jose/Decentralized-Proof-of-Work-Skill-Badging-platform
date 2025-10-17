import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "lucide-react";

export default function MyBadgesPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <Badge className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight">
          My Badges
        </h3>
        <p className="text-sm text-muted-foreground">
          This page will display all your minted skill badges.
        </p>
      </div>
    </div>
  );
}
