import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Recycle, Zap, Package, AlertTriangle, CheckCircle } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  quantity: number;
  type: 'recovered' | 'raw' | 'fabricated';
  recoveryRate: number;
}

interface Recipe {
  id: string;
  name: string;
  materials: { id: string; quantity: number }[];
  output: { id: string; quantity: number };
  category: string;
}

const FabricatorInterface = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [craftingStep, setCraftingStep] = useState(0);
  const [isCrafting, setIsCrafting] = useState(false);

  const materials: Material[] = [
    { id: 'plastic-waste', name: 'Plastic Waste', quantity: 45.3, type: 'recovered', recoveryRate: 85 },
    { id: 'metal-scraps', name: 'Metal Scraps', quantity: 23.8, type: 'recovered', recoveryRate: 92 },
    { id: 'organic-matter', name: 'Organic Matter', quantity: 18.4, type: 'recovered', recoveryRate: 67 },
    { id: 'electronics', name: 'Electronics', quantity: 12, type: 'recovered', recoveryRate: 78 },
    { id: 'composite-fiber', name: 'Composite Fiber', quantity: 8.9, type: 'fabricated', recoveryRate: 100 },
    { id: 'textiles', name: 'Textiles', quantity: 6.2, type: 'recovered', recoveryRate: 63 },
    { id: 'glass', name: 'Glass Materials', quantity: 4.1, type: 'recovered', recoveryRate: 87 },
    { id: 'rubber', name: 'Rubber/Polymer', quantity: 2.8, type: 'recovered', recoveryRate: 67 },
  ];

  const recipes: Recipe[] = [
    {
      id: 'water-filter',
      name: 'Water Filter',
      materials: [
        { id: 'plastic-waste', quantity: 5 },
        { id: 'composite-fiber', quantity: 2 }
      ],
      output: { id: 'water-filter', quantity: 1 },
      category: 'Life Support'
    },
    {
      id: 'repair-kit',
      name: 'Repair Kit',
      materials: [
        { id: 'metal-scraps', quantity: 8 },
        { id: 'electronics', quantity: 3 }
      ],
      output: { id: 'repair-kit', quantity: 1 },
      category: 'Maintenance'
    },
    {
      id: 'nutrient-pack',
      name: 'Nutrient Pack',
      materials: [
        { id: 'organic-matter', quantity: 10 },
        { id: 'plastic-waste', quantity: 2 }
      ],
      output: { id: 'nutrient-pack', quantity: 1 },
      category: 'Sustenance'
    },
    {
      id: 'solar-panel',
      name: 'Solar Panel',
      materials: [
        { id: 'metal-scraps', quantity: 6 },
        { id: 'electronics', quantity: 4 },
        { id: 'glass', quantity: 2 }
      ],
      output: { id: 'solar-panel', quantity: 1 },
      category: 'Power'
    },
    {
      id: 'hydroponic-tray',
      name: 'Hydroponic Tray',
      materials: [
        { id: 'plastic-waste', quantity: 8 },
        { id: 'metal-scraps', quantity: 4 }
      ],
      output: { id: 'hydroponic-tray', quantity: 1 },
      category: 'Sustenance'
    }
  ];

  const craftingSteps = [
    'Material Analysis',
    'Waste Processing',
    '3D Model Generation',
    'Fabrication Process',
    'Quality Control',
    'Output Ready'
  ];

  const handleCraft = async () => {
    if (!selectedRecipe) return;
    
    setIsCrafting(true);
    setCraftingStep(0);
    
    for (let i = 0; i <= 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCraftingStep(i + 1);
    }
    
    setIsCrafting(false);
    setCraftingStep(0);
  };

  const getMaterialTypeColor = (type: string) => {
    switch (type) {
      case 'recovered': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'raw': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'fabricated': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full p-4">
      {/* Materials Inventory */}
      <Card className="lg:col-span-4 p-4 bg-slate-900/90 border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg text-white">Material Inventory</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {materials.map((material) => (
            <div 
              key={material.id}
              className="p-3 rounded-lg bg-slate-800/50 border border-slate-600 hover:border-slate-500 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-white truncate pr-2">{material.name}</div>
                <Badge className={`text-xs px-1 py-0 ${getMaterialTypeColor(material.type)}`}>
                  {material.type}
                </Badge>
              </div>
              
              <div className="text-xl text-cyan-400 mb-1">{material.quantity}</div>
              
              <div className="flex items-center gap-1">
                <Recycle className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400">{material.recoveryRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recipe Selection */}
      <Card className="lg:col-span-5 p-4 bg-slate-900/90 border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg text-white">Fabrication Recipes</h3>
        </div>
        
        <div className="space-y-3 mb-4">
          {recipes.map((recipe) => (
            <div 
              key={recipe.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedRecipe?.id === recipe.id 
                  ? 'bg-blue-500/20 border-blue-500' 
                  : 'bg-slate-800/50 border-slate-600 hover:border-slate-500'
              }`}
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-white">{recipe.name}</div>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                  {recipe.category}
                </Badge>
              </div>
              
              <div className="text-sm text-gray-400">
                Materials: {recipe.materials.map(m => materials.find(mat => mat.id === m.id)?.name).join(', ')}
              </div>
            </div>
          ))}
        </div>

        {selectedRecipe && (
          <Button 
            onClick={handleCraft}
            disabled={isCrafting}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isCrafting ? 'Fabricating...' : 'Start Fabrication'}
          </Button>
        )}
      </Card>

      {/* Crafting Process */}
      <Card className="lg:col-span-3 p-4 bg-slate-900/90 border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded" />
          <h3 className="text-lg text-white">3D Fabrication</h3>
        </div>
        
        {isCrafting ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl text-cyan-400 mb-2">{Math.round((craftingStep / 6) * 100)}%</div>
              <Progress value={(craftingStep / 6) * 100} className="mb-4" />
            </div>
            
            <div className="space-y-2">
              {craftingSteps.map((step, index) => (
                <div 
                  key={step}
                  className={`flex items-center gap-2 text-sm ${
                    index < craftingStep 
                      ? 'text-green-400' 
                      : index === craftingStep 
                        ? 'text-cyan-400' 
                        : 'text-gray-500'
                  }`}
                >
                  {index < craftingStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : index === craftingStep ? (
                    <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-600 rounded-full" />
                  )}
                  {step}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <div className="w-16 h-16 bg-slate-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Package className="w-8 h-8" />
            </div>
            Select a recipe to begin fabrication
          </div>
        )}
      </Card>
    </div>
  );
};

export default FabricatorInterface;