import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { 
  Recycle, 
  Trash2, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  BarChart3,
  Package,
  Zap
} from 'lucide-react';

interface WasteItem {
  id: string;
  name: string;
  category: string;
  weight: number;
  recoverable: boolean;
  recoveryRate: number;
  status: 'processing' | 'recovered' | 'disposed' | 'pending';
}

const WasteRecoverySystem = () => {
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([
    {
      id: '1',
      name: 'Food Packaging',
      category: 'Organic Waste',
      weight: 2.3,
      recoverable: true,
      recoveryRate: 75,
      status: 'processing'
    },
    {
      id: '2',
      name: 'Electronic Components',
      category: 'E-Waste',
      weight: 1.8,
      recoverable: true,
      recoveryRate: 90,
      status: 'recovered'
    },
    {
      id: '3',
      name: 'Broken Tools',
      category: 'Metal Waste',
      weight: 5.2,
      recoverable: true,
      recoveryRate: 85,
      status: 'pending'
    },
    {
      id: '4',
      name: 'Contaminated Materials',
      category: 'Hazardous',
      weight: 0.8,
      recoverable: false,
      recoveryRate: 0,
      status: 'disposed'
    },
    {
      id: '5',
      name: 'Plastic Containers',
      category: 'Plastic Waste',
      weight: 3.1,
      recoverable: true,
      recoveryRate: 82,
      status: 'recovered'
    },
    {
      id: '6',
      name: 'Textile Waste',
      category: 'Fabric',
      weight: 1.5,
      recoverable: true,
      recoveryRate: 68,
      status: 'pending'
    }
  ]);

  const [totalRecovery, setTotalRecovery] = useState(0);
  const [dailyStats, setDailyStats] = useState({
    processed: 15.2,
    recovered: 12.8,
    disposed: 2.4
  });

  // Material recovery statistics
  const [materialRecovery, setMaterialRecovery] = useState([
    { id: 'plastic-waste', name: 'Plastic Waste', recovered: 45.3, total: 52.1, recoveryRate: 87 },
    { id: 'metal-scraps', name: 'Metal Scraps', recovered: 23.8, total: 26.2, recoveryRate: 91 },
    { id: 'organic-matter', name: 'Organic Matter', recovered: 18.4, total: 28.7, recoveryRate: 64 },
    { id: 'electronics', name: 'Electronics', recovered: 12.6, total: 14.3, recoveryRate: 88 },
    { id: 'composite-fiber', name: 'Composite Fiber', recovered: 8.9, total: 11.2, recoveryRate: 79 },
    { id: 'textiles', name: 'Textiles', recovered: 6.2, total: 9.8, recoveryRate: 63 },
    { id: 'glass', name: 'Glass Materials', recovered: 4.1, total: 4.7, recoveryRate: 87 },
    { id: 'rubber', name: 'Rubber/Polymer', recovered: 2.8, total: 4.2, recoveryRate: 67 }
  ]);

  useEffect(() => {
    const recoveredWeight = wasteItems
      .filter(item => item.status === 'recovered')
      .reduce((sum, item) => sum + item.weight, 0);
    
    const totalWeight = wasteItems.reduce((sum, item) => sum + item.weight, 0);
    
    setTotalRecovery(totalWeight > 0 ? (recoveredWeight / totalWeight) * 100 : 0);
  }, [wasteItems]);

  const processWasteItem = (id: string) => {
    setWasteItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, status: item.recoverable ? 'recovered' : 'disposed' }
          : item
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'recovered': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'disposed': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'pending': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <div className="w-3 h-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />;
      case 'recovered': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'disposed': return <Trash2 className="w-4 h-4 text-red-400" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-blue-400" />;
      default: return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full p-4">
      {/* Recovery Statistics */}
      <Card className="lg:col-span-4 p-4 bg-slate-900/90 border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-green-400" />
          <h3 className="text-lg text-white">Recovery Statistics</h3>
        </div>
        
        {/* Overall Recovery Rate */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Overall Recovery Rate</span>
            <span className="text-lg text-green-400">{totalRecovery.toFixed(1)}%</span>
          </div>
          <Progress value={totalRecovery} className="mb-4" />
        </div>

        {/* Daily Statistics */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Recycle className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white">Processed Today</span>
            </div>
            <span className="text-cyan-400">{dailyStats.processed} kg</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white">Recovered</span>
            </div>
            <span className="text-green-400">{dailyStats.recovered} kg</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-400" />
              <span className="text-sm text-white">Disposed</span>
            </div>
            <span className="text-red-400">{dailyStats.disposed} kg</span>
          </div>
        </div>

        {/* Recovery Trend */}
        <div className="p-3 bg-slate-800/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-white">7-Day Trend</span>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">
              +12.3%
            </Badge>
          </div>
          <div className="text-xs text-gray-400">
            Recovery efficiency improving
          </div>
        </div>
      </Card>

      {/* Material Recovery Breakdown */}
      <Card className="lg:col-span-4 p-4 bg-slate-900/90 border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg text-white">Material Recovery</h3>
        </div>
        
        <ScrollArea className="h-[300px] lg:h-[400px]">
          <div className="space-y-3">
            {materialRecovery.map((material) => (
              <div 
                key={material.id}
                className="p-3 bg-slate-800/50 border border-slate-600 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-white">{material.name}</span>
                  <Badge className={`text-xs px-2 py-1 ${
                    material.recoveryRate >= 80 
                      ? 'bg-green-500/20 text-green-400 border-green-500/50'
                      : material.recoveryRate >= 70
                        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                        : 'bg-red-500/20 text-red-400 border-red-500/50'
                  }`}>
                    {material.recoveryRate}%
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">Recovered</span>
                  <span className="text-sm text-green-400">{material.recovered} kg</span>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">Total</span>
                  <span className="text-sm text-white">{material.total} kg</span>
                </div>
                
                <Progress value={material.recoveryRate} className="h-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Waste Processing Queue */}
      <Card className="lg:col-span-4 p-4 bg-slate-900/90 border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg text-white">Processing Queue</h3>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
            {wasteItems.filter(item => item.status === 'pending').length} Pending
          </Badge>
        </div>

        <ScrollArea className="h-[300px] lg:h-[400px]">
          <div className="space-y-3">
            {wasteItems.map((item) => (
              <div 
                key={item.id}
                className="p-3 bg-slate-800/50 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <div>
                      <div className="text-sm text-white">{item.name}</div>
                      <div className="text-xs text-gray-400">{item.category}</div>
                    </div>
                  </div>
                  
                  <Badge className={`${getStatusColor(item.status)} text-xs px-2 py-1`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">Weight</span>
                  <span className="text-sm text-cyan-400">{item.weight} kg</span>
                </div>
                
                {item.recoverable && (
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Recovery Rate</span>
                      <span className="text-xs text-green-400">{item.recoveryRate}%</span>
                    </div>
                    <Progress value={item.recoveryRate} className="h-1" />
                  </div>
                )}
                
                {item.status === 'pending' && (
                  <Button
                    size="sm"
                    onClick={() => processWasteItem(item.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  >
                    Process Item
                  </Button>
                )}
                
                {!item.recoverable && item.status !== 'disposed' && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => processWasteItem(item.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-xs"
                  >
                    Safe Disposal
                  </Button>
                )}
                
                {!item.recoverable && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-red-400">
                    <AlertCircle className="w-3 h-3" />
                    Non-recoverable material
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default WasteRecoverySystem;