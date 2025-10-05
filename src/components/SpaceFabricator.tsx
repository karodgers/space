import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Package, 
  Zap, 
  CheckCircle, 
  Clock, 
  Wrench,
  Heart,
  Shield,
  Cpu,
  Beaker,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface FabricatableItem {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  fabricationTime: number; // in seconds
  materials: { id: string; quantity: number }[];
}

interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface CollectedItem {
  id: string;
  itemId: string;
  name: string;
  collectedAt: string;
  status: 'ready' | 'collected';
}

const SpaceFabricator = () => {
  const [selectedItem, setSelectedItem] = useState<FabricatableItem | null>(null);
  const [craftingStatus, setCraftingStatus] = useState<'idle' | 'crafting' | 'done' | 'collected'>('idle');
  const [craftingProgress, setCraftingProgress] = useState(0);
  const [collectedItems, setCollectedItems] = useState<CollectedItem[]>([
    {
      id: '1',
      itemId: 'water-filter',
      name: 'Water Filter',
      collectedAt: '5 min ago',
      status: 'ready'
    },
    {
      id: '2',
      itemId: 'repair-kit',
      name: 'Repair Kit',
      collectedAt: '1 hour ago',
      status: 'collected'
    }
  ]);

  const materials: Material[] = [
    { id: 'plastic-waste', name: 'Plastic Waste', quantity: 45, unit: 'kg' },
    { id: 'metal-scraps', name: 'Metal Scraps', quantity: 23, unit: 'kg' },
    { id: 'organic-matter', name: 'Organic Matter', quantity: 18, unit: 'kg' },
    { id: 'electronics', name: 'Electronics', quantity: 12, unit: 'units' },
    { id: 'composite-fiber', name: 'Composite Fiber', quantity: 8, unit: 'kg' },
    { id: 'energy-cells', name: 'Energy Cells', quantity: 5, unit: 'units' },
    { id: 'rare-metals', name: 'Rare Metals', quantity: 3, unit: 'kg' },
  ];

  const fabricatableItems: FabricatableItem[] = [
    {
      id: 'water-filter',
      name: 'Water Filter',
      category: 'Life Support',
      icon: <Heart className="w-5 h-5 text-blue-400" />,
      description: 'Advanced filtration system for water purification',
      fabricationTime: 8,
      materials: [
        { id: 'plastic-waste', quantity: 5 },
        { id: 'composite-fiber', quantity: 2 }
      ]
    },
    {
      id: 'repair-kit',
      name: 'Repair Kit',
      category: 'Maintenance',
      icon: <Wrench className="w-5 h-5 text-orange-400" />,
      description: 'Essential tools for equipment maintenance',
      fabricationTime: 12,
      materials: [
        { id: 'metal-scraps', quantity: 8 },
        { id: 'electronics', quantity: 3 }
      ]
    },
    {
      id: 'nutrient-pack',
      name: 'Nutrient Pack',
      category: 'Sustenance',
      icon: <Package className="w-5 h-5 text-green-400" />,
      description: 'Concentrated nutrition for extended missions',
      fabricationTime: 6,
      materials: [
        { id: 'organic-matter', quantity: 10 },
        { id: 'plastic-waste', quantity: 2 }
      ]
    },
    {
      id: 'solar-panel',
      name: 'Solar Panel',
      category: 'Power',
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      description: 'Photovoltaic energy collection system',
      fabricationTime: 15,
      materials: [
        { id: 'metal-scraps', quantity: 6 },
        { id: 'electronics', quantity: 4 },
        { id: 'composite-fiber', quantity: 3 }
      ]
    },
    {
      id: 'forceps and scalpel',
      name: 'Forceps and Scalpel',
      category: 'Life Support',
      icon: <Heart className="w-5 h-5 text-blue-400" />,
      description: 'Basic surgical tools for medical procedures',
      fabricationTime: 18,
      materials: [
        { id: 'metal-scraps', quantity: 12 },
        { id: 'composite-fiber', quantity: 5 },
        { id: 'electronics', quantity: 2 }
      ]
    },
    {
      id: 'data-storage',
      name: 'Data Storage Unit',
      category: 'Computing',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      description: 'High-capacity data storage and backup system',
      fabricationTime: 10,
      materials: [
        { id: 'electronics', quantity: 6 },
        { id: 'metal-scraps', quantity: 3 }
      ]
    },
    {
      id: 'hydroponic-tray',
      name: 'Hydroponic Tray',
      category: 'Sustenance',
      icon: <Package className="w-5 h-5 text-green-400" />,
      description: 'Soilless growing system for food production',
      fabricationTime: 14,
      materials: [
        { id: 'plastic-waste', quantity: 8 },
        { id: 'metal-scraps', quantity: 4 },
        { id: 'electronics', quantity: 1 }
      ]
    },
    {
      id: 'communication-relay',
      name: 'Communication Relay',
      category: 'Computing',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      description: 'Long-range communication and signal amplifier',
      fabricationTime: 16,
      materials: [
        { id: 'electronics', quantity: 8 },
        { id: 'metal-scraps', quantity: 5 },
        { id: 'composite-fiber', quantity: 2 }
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Life Support': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      'Maintenance': 'bg-orange-500/20 text-orange-400 border-orange-500/50',
      'Sustenance': 'bg-green-500/20 text-green-400 border-green-500/50',
      'Power': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      'Defense': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      'Computing': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50',
      'Research': 'bg-pink-500/20 text-pink-400 border-pink-500/50',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  };

  const canCraftItem = (item: FabricatableItem) => {
    return item.materials.every(required => {
      const available = materials.find(m => m.id === required.id);
      return available && available.quantity >= required.quantity;
    });
  };

  const handleFabricate = async () => {
    if (!selectedItem || !canCraftItem(selectedItem)) return;
    
    setCraftingStatus('crafting');
    setCraftingProgress(0);
    
    const totalTime = selectedItem.fabricationTime * 1000;
    const interval = 100;
    
    const progressInterval = setInterval(() => {
      setCraftingProgress(prev => {
        const newProgress = prev + (interval / totalTime) * 100;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setCraftingStatus('done');
          
          // Add to collected items
          const newCollectedItem: CollectedItem = {
            id: Date.now().toString(),
            itemId: selectedItem.id,
            name: selectedItem.name,
            collectedAt: 'Just now',
            status: 'ready'
          };
          setCollectedItems(prev => [newCollectedItem, ...prev]);
          
          return 100;
        }
        return newProgress;
      });
    }, interval);
  };

  const handleCollect = () => {
    setCraftingStatus('collected');
    setCraftingProgress(0);
    
    // Update the status of the most recent item
    setCollectedItems(prev => 
      prev.map((item, index) => 
        index === 0 && item.status === 'ready' 
          ? { ...item, status: 'collected' }
          : item
      )
    );
    
    setTimeout(() => {
      setCraftingStatus('idle');
    }, 1000);
  };

  return (
    <div className="h-full p-4 lg:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-full">
        
        {/* Fabricatable Items - Left Panel */}
        <Card className="lg:col-span-4 bg-slate-900/90 border-slate-700 p-4 lg:p-6">
          <div className="flex items-center gap-2 mb-4 lg:mb-6">
            <Package className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg lg:text-xl text-white">Fabricatable Items</h2>
          </div>
          
          <ScrollArea className="h-[300px] lg:h-[calc(100vh-200px)]">
            <div className="space-y-3">
              {fabricatableItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 lg:p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedItem?.id === item.id
                      ? 'bg-cyan-500/20 border-cyan-500'
                      : canCraftItem(item)
                        ? 'bg-slate-800/50 border-slate-600 hover:border-slate-500'
                        : 'bg-slate-800/30 border-slate-700 opacity-60'
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {item.icon}
                    <div className="flex-1 min-w-0">
                      <div className="text-white truncate">{item.name}</div>
                      <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge className={`text-xs ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {item.fabricationTime}s
                    </div>
                  </div>
                  
                  {!canCraftItem(item) && (
                    <div className="mt-2 text-xs text-red-400">
                      Insufficient materials
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Recipe & Collection - Center Panel */}
        <Card className="lg:col-span-5 bg-slate-900/90 border-slate-700 p-4 lg:p-6">
          {selectedItem ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4 lg:mb-6">
                {selectedItem.icon}
                <h2 className="text-lg lg:text-xl text-white">{selectedItem.name}</h2>
                <Badge className={`ml-auto ${getCategoryColor(selectedItem.category)}`}>
                  {selectedItem.category}
                </Badge>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm text-gray-400 mb-3">Required Materials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedItem.materials.map((required) => {
                    const available = materials.find(m => m.id === required.id);
                    const hasEnough = available && available.quantity >= required.quantity;
                    
                    return (
                      <div 
                        key={required.id}
                        className={`p-3 rounded-lg ${
                          hasEnough 
                            ? 'bg-green-500/10 border border-green-500/30' 
                            : 'bg-red-500/10 border border-red-500/30'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white">
                            {available?.name || 'Unknown Material'}
                          </span>
                          <span className={`text-sm ${hasEnough ? 'text-green-400' : 'text-red-400'}`}>
                            {required.quantity} / {available?.quantity || 0}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-sm text-gray-400 mb-3">Collected Items</h3>
                <ScrollArea className="h-[200px] lg:h-[300px]">
                  <div className="space-y-2">
                    {collectedItems.map((item) => (
                      <div 
                        key={item.id}
                        className={`p-3 rounded-lg border ${
                          item.status === 'ready' 
                            ? 'bg-green-500/10 border-green-500/30 animate-pulse' 
                            : 'bg-slate-800/50 border-slate-600'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white">{item.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{item.collectedAt}</span>
                            {item.status === 'ready' && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs animate-pulse">
                                Ready
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-gray-400">
              <div>
                <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select an item to view recipe and materials</p>
              </div>
            </div>
          )}
        </Card>

        {/* Fabrication Process - Right Panel */}
        <Card className="lg:col-span-3 bg-slate-900/90 border-slate-700 p-4 lg:p-6">
          <div className="flex items-center gap-2 mb-4 lg:mb-6">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg text-white">Fabricator</h2>
          </div>
          
          <div className="h-full flex flex-col">
            {craftingStatus === 'idle' && selectedItem && (
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    {selectedItem.icon}
                  </div>
                  <p className="text-white mb-2">{selectedItem.name}</p>
                  <p className="text-sm text-gray-400">Ready to fabricate</p>
                </div>
                
                <Button
                  onClick={handleFabricate}
                  disabled={!canCraftItem(selectedItem)}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Create Item
                </Button>
              </div>
            )}

            {craftingStatus === 'crafting' && (
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-center mb-6">
                  <div className="text-3xl text-cyan-400 mb-2">{Math.round(craftingProgress)}%</div>
                  <Progress value={craftingProgress} className="mb-4" />
                  <p className="text-white mb-1">Fabricating...</p>
                  <p className="text-sm text-gray-400">{selectedItem?.name}</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    3D Printing in progress
                  </div>
                </div>
              </div>
            )}

            {craftingStatus === 'done' && (
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-center mb-6">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <p className="text-white mb-2">Fabrication Complete!</p>
                  <p className="text-sm text-gray-400">{selectedItem?.name} is ready</p>
                </div>
                
                <Button
                  onClick={handleCollect}
                  className="w-full bg-green-600 hover:bg-green-700 text-white animate-pulse"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Collect Item
                </Button>
              </div>
            )}

            {craftingStatus === 'collected' && (
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <p className="text-green-400">Item Collected!</p>
                </div>
              </div>
            )}

            {!selectedItem && (
              <div className="flex-1 flex items-center justify-center text-center text-gray-400">
                <div>
                  <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select an item to begin fabrication</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SpaceFabricator;