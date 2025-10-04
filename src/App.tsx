import React, { useState } from 'react';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import SpaceFabricator from './components/SpaceFabricator';
import WasteRecoverySystem from './components/WasteRecoverySystem';
import IoTSystemPanel from './components/IoTSystemPanel';
import InventorySystem from './components/InventorySystem';
import IntegratedSystems from './components/IntegratedSystems';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { 
  Factory, 
  Recycle, 
  Wifi, 
  TrendingUp, 
  Zap, 
  Shield,
  Package,
  Settings,
  Monitor
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('fabricator');
  
  const systemStats = {
    wasteRecovered: 87.3,
    energyEfficiency: 94.1,
    fabricationSuccess: 96.8,
    systemUptime: 99.2,
    systemsOnline: 80,
    bagsConnected: 83
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1674616989478-514d5bc6fefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHN0YXRpb24lMjBpbnRlcmlvciUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzU5NTcwOTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Space Station Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 lg:p-6 border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Factory className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl text-white">Space Waste Management System</h1>
                <p className="text-sm text-gray-400">Advanced Fabrication & Recovery Platform</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 lg:gap-4 flex-1 lg:flex-none">
              <div className="text-center">
                <div className="text-sm lg:text-lg text-cyan-400">{systemStats.wasteRecovered}%</div>
                <div className="text-xs text-gray-400">Recovery Rate</div>
              </div>
              <div className="text-center">
                <div className="text-sm lg:text-lg text-green-400">{systemStats.energyEfficiency}%</div>
                <div className="text-xs text-gray-400">Efficiency</div>
              </div>
              <div className="text-center">
                <div className="text-sm lg:text-lg text-blue-400">{systemStats.systemUptime}%</div>
                <div className="text-xs text-gray-400">Uptime</div>
              </div>
            </div>
            
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 px-2 lg:px-3 py-1">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
              <span className="hidden sm:inline">Systems </span>Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-[calc(100vh-200px)] lg:h-[calc(100vh-160px)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="px-4 lg:px-6 pt-4">
            <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700">
              <TabsTrigger 
                value="fabricator" 
                className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                <Factory className="w-4 h-4" />
                <span className="hidden sm:inline">Fabricator</span>
              </TabsTrigger>
              <TabsTrigger 
                value="recovery" 
                className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                <Recycle className="w-4 h-4" />
                <span className="hidden sm:inline">Recovery</span>
              </TabsTrigger>
              <TabsTrigger 
                value="inventory" 
                className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Inventory</span>
              </TabsTrigger>
              <TabsTrigger 
                value="systems" 
                className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Systems</span>
              </TabsTrigger>
              <TabsTrigger 
                value="iot" 
                className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                <Wifi className="w-4 h-4" />
                <span className="hidden sm:inline">IoT</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="h-[calc(100%-80px)]">
            <TabsContent value="fabricator" className="h-full m-0">
              <SpaceFabricator />
            </TabsContent>
            
            <TabsContent value="recovery" className="h-full m-0">
              <WasteRecoverySystem />
            </TabsContent>
            
            <TabsContent value="inventory" className="h-full m-0">
              <InventorySystem />
            </TabsContent>
            
            <TabsContent value="systems" className="h-full m-0">
              <IntegratedSystems />
            </TabsContent>
            
            <TabsContent value="iot" className="h-full m-0">
              <IoTSystemPanel />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Status Bar */}
      <div className="relative z-10 p-3 lg:p-4 border-t border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-3 lg:gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400">Power:</span>
              <span className="text-yellow-400">94.1 kW</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-400">Systems:</span>
              <span className="text-cyan-400">{systemStats.systemsOnline}% Online</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-gray-400">Efficiency:</span>
              <span className="text-green-400">+12.3%</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400">Security:</span>
              <span className="text-blue-400">Active</span>
            </div>
          </div>
          
          <div className="text-gray-400 text-xs sm:text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}