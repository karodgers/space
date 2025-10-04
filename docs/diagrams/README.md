# Architecture Diagrams

This directory contains Mermaid diagram files (.mmd) that provide visual documentation of the Space Waste Management System architecture and workflows.

## Viewing Diagrams

### VSCode Extension (Recommended)

To view Mermaid diagrams directly in VSCode:

1. Install the **"Mermaid Preview"** extension by Matt Bierner
   - Search for "Mermaid Preview" in VSCode extensions
   - Install the extension by Matt Bierner

2. Open any `.mmd` file in VSCode

3. Use one of these methods to preview:
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and type "Mermaid: Preview"
   - Right-click on the file and select "Open Preview"
   - Use the preview button in the top-right corner of the editor

### Alternative Viewers

#### GitHub
All `.mmd` files render automatically as diagrams when viewed on GitHub in repositories that support Mermaid.

#### Online Tools
- [Mermaid Live Editor](https://mermaid.live/)
- [Mermaid CLI](https://github.com/mermaid-js/mermaid-cli)

#### Other Editors
- **Markdown Preview Enhanced** (VSCode extension)
- **Mermaid** support in various IDEs and text editors

## Diagram Files

| File | Description |
|------|-------------|
| `system-architecture.mmd` | Overall system architecture and layer relationships |
| `component-architecture.mmd` | React component hierarchy and relationships |
| `data-flow.mmd` | Data processing flow from user input to display |
| `technology-stack.mmd` | Technology dependencies and build tools |
| `user-interface-flow.mmd` | User interface navigation and panel structures |
| `deployment-architecture.mmd` | Deployment pipeline and hosting infrastructure |
| `fabrication-sequence.mmd` | Fabrication process workflow sequence |
| `fabrication-states.mmd` | Fabrication state transitions and lifecycle |
| `data-structures.mmd` | Class diagram of data models and relationships |
| `user-journey.mmd` | User journey map for astronauts, ground control, and administrators |
| `system-operation-flow.mmd` | Complete end-to-end system operation from waste to analytics |
| `fabrication-user-flow.mmd` | Detailed fabrication workflow with validation and error handling |
| `waste-recovery-user-flow.mmd` | Waste recovery operations including batch processing and safety |
| `inventory-management-flow.mmd` | Inventory management with alerts, optimization, and analytics |
| `system-monitoring-flow.mmd` | System monitoring with diagnostics, maintenance, and emergency response |
| `iot-management-flow.mmd` | IoT device management covering monitoring, control, and maintenance |

## Diagram Types

- **Flowcharts**: Process flows and system interactions
- **Class Diagrams**: Data structures and relationships
- **State Diagrams**: Process state transitions
- **Sequence Diagrams**: Interaction sequences
- **Architecture Diagrams**: System and component organization

## Contributing

When modifying diagrams:
1. Edit the `.mmd` files using VSCode with the Mermaid Preview extension
2. Test rendering in both VSCode and GitHub
3. Ensure diagrams remain synchronized with code changes
4. Update this README if new diagrams are added

## Troubleshooting

### Diagrams Not Rendering
- Ensure you're using a Mermaid-compatible viewer
- Check for syntax errors in the `.mmd` files
- Verify the Mermaid version compatibility

### VSCode Extension Issues
- Restart VSCode after installing the extension
- Check that the file has the `.mmd` extension
- Try the "Mermaid: Reload Preview" command

---

**Note**: These diagrams are automatically rendered in GitHub pull requests and issues when properly formatted.