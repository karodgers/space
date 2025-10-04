import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Wifi, 
  Zap, 
  Thermometer, 
  Gauge, 
  AlertTriangle, 
  CheckCircle,
  Radio,
  Database,
  Settings
} from 'lucide-react';

interface IoTDevice {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning';
  value: number;
  unit: string;
  lastUpdate: string;
  location: string;
}

interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
  device: string;
}

const IoTSystemPanel = () => {
  const [devices, setDevices] = useState<IoTDevice[]>([
    {
      id: 'waste-scanner-1',
      name: 'Waste Scanner Alpha',
      type: 'scanner',
      status: 'online',
      value: 87,
      unit: '%',
      lastUpdate: '2 min ago',
      location: 'Bay A'
    },
    {
      id: 'temp-sensor-1',
      name: 'Thermal Monitor',
      type: 'temperature',
      status: 'online',
      value: 23.5,
      unit: '°C',
      lastUpdate: '1 min ago',
      location: 'Processing Unit'
    },
    {
      id: 'pressure-monitor',
      name: 'Pressure Sensor',
      type: 'pressure',
      status: 'warning',
      value: 145.2,
      unit: 'kPa',
      lastUpdate: '3 min ago',
      location: 'Compactor'
    },
    {
      id: 'power-meter',
      name: 'Power Monitor',
      type: 'power',
      status: 'online',
      value: 78.3,
      unit: 'kW',
      lastUpdate: '30 sec ago',
      location: 'Main Grid'
    },
    {
      id: 'air-quality',
      name: 'Air Quality Sensor',
      type: 'air',
      status: 'online',
      value: 95,
      unit: 'AQI',
      lastUpdate: '1 min ago',
      location: 'Processing Area'
    },
    {
      id: 'waste-level',
      name: 'Storage Level Monitor',
      type: 'level',
      status: 'offline',
      value: 0,
      unit: '%',
      lastUpdate: '15 min ago',
      location: 'Storage Bay'
    }
  ]);

  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'Pressure levels elevated in compactor unit',
      timestamp: '2 min ago',
      device: 'Pressure Sensor'
    },
    {
      id: '2',
      type: 'error',
      message: 'Storage Level Monitor offline - connection lost',
      timestamp: '15 min ago',
      device: 'Storage Level Monitor'
    },
    {
      id: '3',
      type: 'info',
      message: 'Waste processing efficiency increased by 12%',
      timestamp: '1 hour ago',
      device: 'System'
    }
  ]);

  const [systemStatus, setSystemStatus] = useState({
    overallHealth: 85,
    devicesOnline: devices.filter(d => d.status === 'online').length,
    totalDevices: devices.length,
    dataTransmission: 96.7,
    lastBackup: '4 hours ago'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prevDevices => 
        prevDevices.map(device => ({
          ...device,
          value: device.status === 'online' 
            ? device.value + (Math.random() - 0.5) * 5
            : device.value,
          lastUpdate: device.status === 'online' ? 'Just now' : device.lastUpdate
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'offline': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'offline': return <Radio className="w-4 h-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      default: return null;
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'scanner': return <Radio className="w-5 h-5 text-blue-400" />;
      case 'temperature': return <Thermometer className="w-5 h-5 text-orange-400" />;
      case 'pressure': return <Gauge className="w-5 h-5 text-purple-400" />;
      case 'power': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'air': return <Wifi className="w-5 h-5 text-cyan-400" />;
      case 'level': return <Database className="w-5 h-5 text-green-400" />;
      default: return <Settings className="w-5 h-5 text-gray-400" />;
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'info': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full p-4">
      {/* System Overview */}
      <Card className="lg:col-span-4 p-4 bg-slate-900/90 border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Wifi className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg text-white">IoT System Status</h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">System Health</span>
              <span className="text-lg text-green-400">{systemStatus.overallHealth}%</span>
            </div>
            <Progress value={systemStatus.overallHealth} className="mb-2" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-800/50 rounded-lg text-center">
              <div className="text-2xl text-green-400">{systemStatus.devicesOnline}</div>
              <div className="text-xs text-gray-400">Online</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg text-center">
              <div className="text-2xl text-white">{systemStatus.totalDevices}</div>
              <div className="text-xs text-gray-400">Total</div>
            </div>
          </div>

          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-white">Data Transmission</span>
              <span className="text-sm text-cyan-400">{systemStatus.dataTransmission}%</span>
            </div>
            <Progress value={systemStatus.dataTransmission} className="h-2" />
          </div>

          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="text-sm text-white mb-1">Last Backup</div>
            <div className="text-xs text-gray-400">{systemStatus.lastBackup}</div>
          </div>
        </div>
      </Card>

      {/* Device Monitoring */}
      <Card className="lg:col-span-5 p-4 bg-slate-900/90 border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg text-white">Device Monitoring</h3>
        </div>

        <div className="space-y-3">
          {devices.map((device) => (
            <div 
              key={device.id}
              className="p-3 bg-slate-800/50 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getDeviceIcon(device.type)}
                  <div>
                    <div className="text-white text-sm">{device.name}</div>
                    <div className="text-xs text-gray-400">{device.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(device.status)} text-xs px-2 py-1`}>
                    {device.status}
                  </Badge>
                  {getStatusIcon(device.status)}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-lg text-cyan-400">
                  {device.value.toFixed(1)} {device.unit}
                </div>
                <div className="text-xs text-gray-400">
                  {device.lastUpdate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Alerts */}
      <Card className="lg:col-span-3 p-4 bg-slate-900/90 border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg text-white">System Alerts</h3>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className="p-3 bg-slate-800/50 border border-slate-600 rounded-lg"
            >
              <div className="flex items-start gap-2 mb-2">
                <Badge className={`${getAlertTypeColor(alert.type)} text-xs px-2 py-1`}>
                  {alert.type}
                </Badge>
                <div className="text-xs text-gray-400">{alert.timestamp}</div>
              </div>
              
              <div className="text-sm text-white mb-1">{alert.message}</div>
              <div className="text-xs text-gray-400">{alert.device}</div>
              
              <Button size="sm" variant="outline" className="mt-2 w-full text-xs">
                Acknowledge
              </Button>
            </div>
          ))}
        </div>

        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
          View All Alerts
        </Button>
      </Card>
    </div>
  );
};

export default IoTSystemPanel;