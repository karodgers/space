# Space Waste Management System

## Overview

The Space Waste Management System (SWMS) is a comprehensive web-based platform designed for managing waste recovery, fabrication, inventory, and IoT systems in space station environments. Built with modern web technologies, this system provides real-time monitoring, control, and optimization of critical space operations.

This application serves as a unified interface for astronauts and mission control to oversee waste processing, resource fabrication, inventory management, and integrated system monitoring, ensuring efficient resource utilization in zero-gravity environments.

## Features

- **Advanced Fabrication Interface**: Real-time control and monitoring of 3D printing and manufacturing systems
- **Waste Recovery System**: Automated waste processing and recycling with efficiency tracking
- **Inventory Management**: Comprehensive tracking of resources, supplies, and consumables
- **Integrated Systems Panel**: Centralized monitoring of all station systems and subsystems
- **IoT Device Management**: Networked sensor and actuator control for environmental monitoring
- **Real-time Metrics**: Live dashboards displaying system performance, efficiency, and status
- **Responsive Design**: Optimized for various display sizes, from control centers to handheld devices

## Architecture

The system is built using a modern React-based architecture:

- **Frontend**: React 18 with TypeScript for type safety
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS for responsive design
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: React hooks with local state management
- **Icons**: Lucide React for consistent iconography

The application follows a component-based architecture with modular design, ensuring maintainability and scalability.

## System Requirements

- Node.js 18+
- npm or yarn package manager
- Modern web browser with JavaScript enabled
- Minimum 4GB RAM recommended for development

## Installation

1. Clone the repository:
 ```bash
 git clone https://github.com/karodgers/space.git
 cd space
 ```

2. Install dependencies:
 ```bash
 npm install
 ```

3. Start the development server:
 ```bash
 npm run dev
 ```

4. Open your browser to `http://localhost:5173`

## Usage

The application provides a tabbed interface with five main sections:

1. **Fabricator**: Control and monitor manufacturing processes
2. **Recovery**: Manage waste processing and recycling operations
3. **Inventory**: Track and manage station resources
4. **Systems**: View integrated system status and controls
5. **IoT**: Monitor and control connected devices

Each section provides real-time data visualization and interactive controls for efficient operation.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── [feature]/      # Feature-specific components
├── styles/             # Global styles and themes
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Contributing

We welcome contributions to improve the Space Waste Management System. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure all code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact the development team.

---

**Version**: 0.1.0
**Last Updated**: October 2025
  
