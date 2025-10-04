import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { 
  Printer, 
  Trash2, 
  Settings, 
  AlertTriangle, 
  CheckCircle2,
  XCircle,
  Zap,
  Thermometer,
  Gauge,
  RefreshCw,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Activity,
  Wifi,
  WifiOff
} from 'lucide-react';

interface SystemComponent {
  id: string;
  name: string;
  type: 'fabricator' | 'collector' | 'processor' | 'conveyor' | 'sensor';
  status: 'online' | 'offline' | 'maintenance' | 'error' | 'standby';
  connected: boolean;
  location: string;
  metrics: {
    [key: string]: {
      value: number | string;
      unit?: string;
      status?: 'normal' | 'warning' | 'critical';
    }
  };
  lastUpdate: string;
}

interface WasteCollectionBag {
  id: string;
  location: string;
  fillLevel: number;
  capacity: number;
  connected: boolean;
  status: 'normal' | 'full' | 'disconnected' | 'error';
  lastEmptied: string;
  wasteType: string;
}

const IntegratedSystems = () => {
  const [systemComponents, setSystemComponents] = useState<SystemComponent[]>([
    {
      id: '3dp-001',
      name: '3D Printer Alpha',
      type: 'fabricator',
      status: 'online',
      connected: true,
      location: 'Fabrication Bay A',
      metrics: {
        temperature: { value: 285, unit: '°C', status: 'normal' },
        printProgress: { value: 67, unit: '%', status: 'normal' },
        filamentRemaining: { value: 2.3, unit: 'kg', status: 'normal' },
        operatingHours: { value: 1247, unit: 'hrs', status: 'normal' },
        jobsCompleted: { value: 89, unit: 'jobs', status: 'normal' }
      },
      lastUpdate: '2 min ago'
    },
    {
      id: '3dp-002',
      name: '3D Printer Beta',
      type: 'fabricator',
      status: 'maintenance',
      connected: true,
      location: 'Fabrication Bay B',
      metrics: {
        temperature: { value: 23, unit: '°C', status: 'normal' },
        printProgress: { value: 0, unit: '%', status: 'normal' },
        filamentRemaining: { value: 1.8, unit: 'kg', status: 'warning' },
        operatingHours: { value: 1890, unit: 'hrs', status: 'warning' },
        jobsCompleted: { value: 134, unit: 'jobs', status: 'normal' }
      },
      lastUpdate: '15 min ago'
    },
    {
      id: 'conv-001',
      name: 'Material Conveyor 1',
      type: 'conveyor',
      status: 'online',
      connected: true,
      location: 'Processing Center',
      metrics: {
        speed: { value: 1.2, unit: 'm/s', status: 'normal' },
        load: { value: 78, unit: '%', status: 'normal' },
        itemsProcessed: { value: 456, unit: 'items', status: 'normal' },
        motorTemperature: { value: 45, unit: '°C', status: 'normal' }
      },
      lastUpdate: '1 min ago'
    },
    {
      id: 'proc-001',
      name: 'Waste Processor Alpha',
      type: 'processor',
      status: 'online',
      connected: true,
      location: 'Processing Center',
      metrics: {
        throughput: { value: 23.4, unit: 'kg/hr', status: 'normal' },
        efficiency: { value: 87, unit: '%', status: 'normal' },
        powerConsumption: { value: 12.3, unit: 'kW', status: 'normal' },
        temperature: { value: 156, unit: '°C', status: 'normal' }
      },
      lastUpdate: '30 sec ago'
    },
    {
      id: 'sort-001',
      name: 'Automated Sorter',
      type: 'processor',
      status: 'error',
      connected: false,
      location: 'Sorting Bay',
      metrics: {
        accuracy: { value: 94, unit: '%', status: 'normal' },
        itemsSorted: { value: 1234, unit: 'items', status: 'normal' },
        jamDetected: { value: 'Yes', status: 'critical' },
        errorCode: { value: 'E047', status: 'critical' }
      },
      lastUpdate: '12 min ago'
    }
  ]);

  const [wasteCollectionBags, setWasteCollectionBags] = useState<WasteCollectionBag[]>([
    {
      id: 'bag-001',
      location: 'Crew Quarters A',
      fillLevel: 85,
      capacity: 50,
      connected: true,
      status: 'normal',
      lastEmptied: '6 hours ago',
      wasteType: 'General Waste'
    },
    {
      id: 'bag-002',
      location: 'Laboratory',
      fillLevel: 100,
      capacity: 30,
      connected: true,
      status: 'full',
      lastEmptied: '12 hours ago',
      wasteType: 'Lab Waste'
    },
    {
      id: 'bag-003',
      location: 'Galley',
      fillLevel: 45,
      capacity: 40,
      connected: true,
      status: 'normal',
      lastEmptied: '3 hours ago',
      wasteType: 'Organic Waste'
    },
    {
      id: 'bag-004',
      location: 'Workshop',
      fillLevel: 78,
      capacity: 60,
      connected: false,
      status: 'disconnected',
      lastEmptied: '8 hours ago',
      wasteType: 'Metal Scraps'
    },
    {
      id: 'bag-005',
      location: 'Electronics Bay',
      fillLevel: 23,
      capacity: 25,
      connected: true,
      status: 'normal',
      lastEmptied: '2 hours ago',
      wasteType: 'E-Waste'
    },
    {
      id: 'bag-006',
      location: 'Crew Quarters B',
      fillLevel: 67,
      capacity: 50,
      connected: true,
      status: 'normal',
      lastEmptied: '5 hours ago',
      wasteType: 'General Waste'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'offline': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'standby': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getBagStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'full': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'disconnected': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string, connected: boolean) => {
    if (!connected) return <WifiOff className="w-4 h-4 text-orange-400" />;
    
    switch (status) {
      case 'online': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'offline': return <XCircle className="w-4 h-4 text-gray-400" />;
      case 'maintenance': return <Settings className="w-4 h-4 text-yellow-400" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'standby': return <PauseCircle className="w-4 h-4 text-blue-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fabricator': return <Printer className="w-5 h-5 text-blue-400" />;
      case 'collector': return <Trash2 className="w-5 h-5 text-green-400" />;
      case 'processor': return <Settings className="w-5 h-5 text-purple-400" />;
      case 'conveyor': return <Activity className="w-5 h-5 text-cyan-400" />;
      case 'sensor': return <Gauge className="w-5 h-5 text-yellow-400" />;
      default: return <Settings className="w-5 h-5 text-gray-400" />;
    }
  };

  const getMetricStatusColor = (status?: string) => {
    switch (status) {
      case 'normal': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full p-4">
      
      {/* System Components */}
      <Card className="lg:col-span-8 p-4 bg-slate-900/90 border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg text-white">System Components</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[450px] lg:h-[500px]">
          <div className="space-y-4">
            {systemComponents.map((component) => (
              <div 
                key={component.id}
                className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(component.type)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white">{component.name}</span>
                        {getStatusIcon(component.status, component.connected)}
                      </div>
                      <div className="text-sm text-gray-400">{component.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {component.connected ? (
                      <Wifi className="w-4 h-4 text-green-400" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-orange-400" />
                    )}
                    <Badge className={`text-xs px-2 py-1 ${getStatusColor(component.status)}`}>
                      {component.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                  {Object.entries(component.metrics).map(([key, metric]) => (
                    <div key={key} className="p-2 bg-slate-700/50 rounded">
                      <div className="text-xs text-gray-400 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className={`text-sm ${getMetricStatusColor(metric.status)}`}>
                        {metric.value} {metric.unit || ''}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Last update: {component.lastUpdate}</span>
                  <div className="flex gap-2">
                    {component.status === 'online' && (
                      <Button size="sm" variant="outline" className="text-xs">
                        <PauseCircle className="w-3 h-3 mr-1" />
                        Pause
                      </Button>
                    )}
                    {component.status === 'error' && (
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Diagnose
                      </Button>
                    )}
                    {component.status === 'maintenance' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs">
                        <PlayCircle className="w-3 h-3 mr-1" />
                        Resume
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Waste Collection Bags */}
      <Card className="lg:col-span-4 p-4 bg-slate-900/90 border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Trash2 className="w-5 h-5 text-green-400" />
          <h3 className="text-lg text-white">Collection Bags</h3>
        </div>

        <div className="space-y-4 mb-6">
          {wasteCollectionBags.map((bag) => (
            <div 
              key={bag.id}
              className="p-3 bg-slate-800/50 border border-slate-600 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white">{bag.location}</span>
                    {bag.connected ? (
                      <Wifi className="w-3 h-3 text-green-400" />
                    ) : (
                      <WifiOff className="w-3 h-3 text-orange-400" />
                    )}
                  </div>
                  <div className="text-xs text-gray-400">{bag.wasteType}</div>
                </div>
                <Badge className={`text-xs px-2 py-1 ${getBagStatusColor(bag.status)}`}>
                  {bag.status}
                </Badge>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Fill Level</span>
                  <span>{bag.fillLevel}% ({(bag.fillLevel * bag.capacity / 100).toFixed(1)}/{bag.capacity} L)</span>
                </div>
                <Progress 
                  value={bag.fillLevel} 
                  className={`h-2 ${bag.fillLevel >= 90 ? 'progress-red' : bag.fillLevel >= 70 ? 'progress-yellow' : ''}`} 
                />
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Last emptied: {bag.lastEmptied}</span>
                {bag.status === 'full' && (
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs">
                    Empty Now
                  </Button>
                )}
                {bag.status === 'disconnected' && (
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-xs">
                    Reconnect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* System Overview Stats */}
        <div className="space-y-3">
          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white">Systems Online</span>
            </div>
            <div className="text-2xl text-green-400 mb-1">
              {systemComponents.filter(s => s.status === 'online').length}/{systemComponents.length}
            </div>
            <div className="text-xs text-gray-400">
              {Math.round((systemComponents.filter(s => s.status === 'online').length / systemComponents.length) * 100)}% operational
            </div>
          </div>

          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Trash2 className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white">Bags Requiring Action</span>
            </div>
            <div className="text-2xl text-yellow-400 mb-1">
              {wasteCollectionBags.filter(b => b.status === 'full' || b.status === 'disconnected').length}
            </div>
            <div className="text-xs text-gray-400">Full or disconnected bags</div>
          </div>

          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white">Average Fill Level</span>
            </div>
            <div className="text-2xl text-cyan-400 mb-1">
              {Math.round(wasteCollectionBags.reduce((acc, bag) => acc + bag.fillLevel, 0) / wasteCollectionBags.length)}%
            </div>
            <div className="text-xs text-gray-400">Across all collection points</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IntegratedSystems;