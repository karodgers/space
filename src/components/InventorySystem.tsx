import React, { useState } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2,
  Archive,
  Zap,
  RefreshCw
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minThreshold: number;
  maxCapacity: number;
  source: 'recovered' | 'fabricated' | 'imported';
  lastUpdated: string;
  recoveryRate?: number;
}

interface StorageLocation {
  id: string;
  name: string;
  capacity: number;
  used: number;
  items: number;
  status: 'optimal' | 'near-full' | 'full';
}

const InventorySystem = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: 'plastic-waste',
      name: 'Plastic Waste',
      category: 'Raw Materials',
      quantity: 45.3,
      unit: 'kg',
      minThreshold: 10,
      maxCapacity: 100,
      source: 'recovered',
      lastUpdated: '2 min ago',
      recoveryRate: 87
    },
    {
      id: 'metal-scraps',
      name: 'Metal Scraps',
      category: 'Raw Materials',
      quantity: 23.8,
      unit: 'kg',
      minThreshold: 15,
      maxCapacity: 80,
      source: 'recovered',
      lastUpdated: '5 min ago',
      recoveryRate: 91
    },
    {
      id: 'organic-matter',
      name: 'Organic Matter',
      category: 'Raw Materials',
      quantity: 18.4,
      unit: 'kg',
      minThreshold: 20,
      maxCapacity: 60,
      source: 'recovered',
      lastUpdated: '1 min ago',
      recoveryRate: 64
    },
    {
      id: 'electronics',
      name: 'Electronics',
      category: 'Components',
      quantity: 12,
      unit: 'units',
      minThreshold: 5,
      maxCapacity: 50,
      source: 'recovered',
      lastUpdated: '3 min ago',
      recoveryRate: 88
    },
    {
      id: 'composite-fiber',
      name: 'Composite Fiber',
      category: 'Raw Materials',
      quantity: 8.9,
      unit: 'kg',
      minThreshold: 5,
      maxCapacity: 40,
      source: 'fabricated',
      lastUpdated: '10 min ago'
    },
    {
      id: 'energy-cells',
      name: 'Energy Cells',
      category: 'Components',
      quantity: 5,
      unit: 'units',
      minThreshold: 3,
      maxCapacity: 20,
      source: 'fabricated',
      lastUpdated: '15 min ago'
    },
    {
      id: 'water-filters',
      name: 'Water Filters',
      category: 'Fabricated Items',
      quantity: 8,
      unit: 'units',
      minThreshold: 2,
      maxCapacity: 25,
      source: 'fabricated',
      lastUpdated: '20 min ago'
    },
    {
      id: 'repair-kits',
      name: 'Repair Kits',
      category: 'Fabricated Items',
      quantity: 4,
      unit: 'units',
      minThreshold: 2,
      maxCapacity: 15,
      source: 'fabricated',
      lastUpdated: '1 hour ago'
    },
    {
      id: 'nutrient-packs',
      name: 'Nutrient Packs',
      category: 'Fabricated Items',
      quantity: 12,
      unit: 'units',
      minThreshold: 5,
      maxCapacity: 30,
      source: 'fabricated',
      lastUpdated: '30 min ago'
    }
  ]);

  const [storageLocations, setStorageLocations] = useState<StorageLocation[]>([
    {
      id: 'bay-a',
      name: 'Storage Bay A',
      capacity: 500,
      used: 387,
      items: 24,
      status: 'near-full'
    },
    {
      id: 'bay-b',
      name: 'Storage Bay B',
      capacity: 500,
      used: 298,
      items: 18,
      status: 'optimal'
    },
    {
      id: 'fabrication-storage',
      name: 'Fabrication Storage',
      capacity: 200,
      used: 156,
      items: 12,
      status: 'near-full'
    },
    {
      id: 'component-vault',
      name: 'Component Vault',
      capacity: 150,
      used: 89,
      items: 8,
      status: 'optimal'
    }
  ]);

  const getItemStatusColor = (item: InventoryItem) => {
    const percentage = (item.quantity / item.maxCapacity) * 100;
    const minPercentage = (item.minThreshold / item.maxCapacity) * 100;
    
    if (item.quantity <= item.minThreshold) {
      return 'bg-red-500/20 text-red-400 border-red-500/50';
    } else if (percentage >= 90) {
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    } else {
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    }
  };

  const getItemStatus = (item: InventoryItem) => {
    if (item.quantity <= item.minThreshold) {
      return 'Low Stock';
    } else if ((item.quantity / item.maxCapacity) * 100 >= 90) {
      return 'Near Full';
    } else {
      return 'Optimal';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'recovered': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'fabricated': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'imported': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStorageStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'near-full': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'full': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full p-4">
      
      {/* Inventory Overview */}
      <Card className="lg:col-span-8 p-4 bg-slate-900/90 border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg text-white">Material Inventory</h3>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Inventory
          </Button>
        </div>

        <ScrollArea className="h-[400px] lg:h-[500px]">
          <div className="space-y-3">
            {inventoryItems.map((item) => (
              <div 
                key={item.id}
                className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white">{item.name}</span>
                      <Badge className={`text-xs px-2 py-1 ${getSourceColor(item.source)}`}>
                        {item.source}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400">{item.category}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg text-cyan-400 mb-1">
                      {item.quantity} {item.unit}
                    </div>
                    <Badge className={`text-xs px-2 py-1 ${getItemStatusColor(item)}`}>
                      {getItemStatus(item)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Stock Level</div>
                    <Progress 
                      value={(item.quantity / item.maxCapacity) * 100} 
                      className="h-2" 
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Min: {item.minThreshold}</span>
                      <span>Max: {item.maxCapacity}</span>
                    </div>
                  </div>
                  
                  {item.recoveryRate && (
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Recovery Rate</div>
                      <Progress value={item.recoveryRate} className="h-2" />
                      <div className="text-xs text-green-400 mt-1 text-center">
                        {item.recoveryRate}%
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Last updated: {item.lastUpdated}</span>
                  {item.quantity <= item.minThreshold && (
                    <div className="flex items-center gap-1 text-red-400">
                      <AlertTriangle className="w-3 h-3" />
                      Restock needed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Storage Management */}
      <Card className="lg:col-span-4 p-4 bg-slate-900/90 border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Archive className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg text-white">Storage Management</h3>
        </div>

        <div className="space-y-4 mb-6">
          {storageLocations.map((location) => (
            <div 
              key={location.id}
              className="p-3 bg-slate-800/50 border border-slate-600 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-sm text-white">{location.name}</div>
                  <div className="text-xs text-gray-400">{location.items} items</div>
                </div>
                <Badge className={`text-xs px-2 py-1 ${getStorageStatusColor(location.status)}`}>
                  {location.status.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Capacity</span>
                  <span>{location.used} / {location.capacity} kg</span>
                </div>
                <Progress value={(location.used / location.capacity) * 100} className="h-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="space-y-3">
          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white">Inventory Efficiency</span>
            </div>
            <div className="text-2xl text-green-400 mb-1">94.3%</div>
            <div className="text-xs text-gray-400">+5.2% from last week</div>
          </div>

          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white">Turnover Rate</span>
            </div>
            <div className="text-2xl text-yellow-400 mb-1">2.8x</div>
            <div className="text-xs text-gray-400">Weekly average</div>
          </div>

          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white">Items Low Stock</span>
            </div>
            <div className="text-2xl text-blue-400 mb-1">
              {inventoryItems.filter(item => item.quantity <= item.minThreshold).length}
            </div>
            <div className="text-xs text-gray-400">Require attention</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InventorySystem;