"use client";

import { useCallback, useState } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Connection,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { NodePanel } from "./NodePanel";
import { PropertiesPanel } from "./PropertiesPanel";
import { 
  MessageNode, 
  ButtonNode, 
  ConditionNode, 
  QuestionNode, 
  WebhookNode 
} from "./nodes";

const nodeTypes = {
  message: MessageNode,
  buttons: ButtonNode,
  condition: ConditionNode,
  question: QuestionNode,
  webhook: WebhookNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "message",
    position: { x: 250, y: 50 },
    data: {
      text: "Привет! Я ваш бот-помощник. Чем могу помочь?",
    },
  },
];

const initialEdges: Edge[] = [];

function FlowEditorContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("nodeType");
      if (!type) return;

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left - 100,
        y: event.clientY - reactFlowBounds.top - 25,
      };

      // Базовые данные для разных типов узлов
      const getInitialData = (nodeType: string) => {
        switch (nodeType) {
          case "message":
            return { 
              text: "Новое сообщение",
              messageType: "text" 
            };
          case "buttons":
            return { 
              question: "Выберите вариант:",
              buttons: ["Вариант 1", "Вариант 2"] 
            };
          case "condition":
            return { 
              conditionType: "equals",
              conditionValue: "",
              variable: "last_user_message" 
            };
          case "question":
            return { 
              questionText: "Как вас зовут?",
              questionType: "text",
              required: true,
              variableName: "user_name",
              placeholder: "Введите ваше имя" 
            };
          case "webhook":
            return { 
              url: "",
              method: "GET",
              headers: {},
              timeout: 5000 
            };
          default:
            return { label: `${nodeType} node` };
        }
      };

      const newNode: Node = {
        id: `${Date.now()}`,
        type,
        position,
        data: getInitialData(type),
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const updateNodeData = useCallback(
    (nodeId: string, data: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, ...data } };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  return (
    <div className="flex h-full bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      <NodePanel />
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          className="react-flow-dark"
        >
          <Background 
            color="#4338ca" 
            gap={20} 
            size={1}
            className="opacity-20"
          />
          <Controls 
            className="!bg-gray-800/90 !backdrop-blur-sm !border !border-gray-700/50 !shadow-xl"
          />
          <MiniMap 
            className="!bg-gray-800/90 !backdrop-blur-sm !border !border-gray-700/50 !shadow-xl"
            nodeColor={(node) => {
              const colors = {
                message: '#3b82f6',
                buttons: '#10b981',
                condition: '#8b5cf6',
                question: '#f59e0b',
                webhook: '#ef4444'
              };
              return colors[node.type as keyof typeof colors] || '#6b7280';
            }}
          />
        </ReactFlow>
      </div>
      <PropertiesPanel
        selectedNode={selectedNode}
        updateNodeData={updateNodeData}
      />
      
      {/* Custom Styles */}
      <style jsx global>{`
        .react-flow-dark {
          background: transparent !important;
        }
        
        .react-flow__edge-path {
          stroke: #6366f1 !important;
          stroke-width: 2 !important;
        }
        
        .react-flow__edge.selected .react-flow__edge-path {
          stroke: #8b5cf6 !important;
          stroke-width: 3 !important;
        }
        
        .react-flow__connection-line {
          stroke: #6366f1 !important;
          stroke-width: 2 !important;
        }
        
        .react-flow__controls button {
          background: rgba(31, 41, 55, 0.9) !important;
          border: 1px solid rgba(107, 114, 128, 0.5) !important;
          color: white !important;
        }
        
        .react-flow__controls button:hover {
          background: rgba(55, 65, 81, 0.9) !important;
          border-color: rgba(139, 92, 246, 0.5) !important;
        }
        
        .react-flow__minimap {
          background: rgba(31, 41, 55, 0.9) !important;
        }
        
        .react-flow__minimap-mask {
          fill: rgba(139, 92, 246, 0.2) !important;
        }
      `}</style>
    </div>
  );
}

export function FlowEditor() {
  return (
    <ReactFlowProvider>
      <FlowEditorContent />
    </ReactFlowProvider>
  );
}