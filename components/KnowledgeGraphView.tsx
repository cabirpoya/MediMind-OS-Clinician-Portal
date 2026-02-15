import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useLanguage } from '../contexts/LanguageContext';

// Simple types for the D3 simulation
interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
}
interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  value: number;
}

export const KnowledgeGraphView: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Mock Medical Data for Graph
    const nodes: Node[] = [
      { id: "Malaria", group: 1 },
      { id: "Plasmodium falciparum", group: 2 },
      { id: "Chloroquine", group: 3 },
      { id: "Fever", group: 4 },
      { id: "Anemia", group: 4 },
      { id: "Mosquito Net", group: 5 },
      { id: "Artemisinin", group: 3 },
      { id: "Tuberculosis", group: 1 },
      { id: "Cough", group: 4 },
      { id: "Isoniazid", group: 3 },
      { id: "Rifampin", group: 3 },
      { id: "Weight Loss", group: 4 }
    ];

    const links: Link[] = [
      { source: "Malaria", target: "Plasmodium falciparum", value: 1 },
      { source: "Malaria", target: "Fever", value: 1 },
      { source: "Malaria", target: "Anemia", value: 1 },
      { source: "Malaria", target: "Chloroquine", value: 1 },
      { source: "Malaria", target: "Artemisinin", value: 1 },
      { source: "Malaria", target: "Mosquito Net", value: 1 },
      { source: "Tuberculosis", target: "Cough", value: 1 },
      { source: "Tuberculosis", target: "Weight Loss", value: 1 },
      { source: "Tuberculosis", target: "Isoniazid", value: 1 },
      { source: "Tuberculosis", target: "Rifampin", value: 1 }
    ];

    // Color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Simulation
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Add links
    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    // Add nodes
    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", (d: any) => color(d.group))
      .call(drag(simulation) as any);

    node.append("title")
      .text(d => d.id);

    // Add labels
    const text = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.id)
      .attr("x", 12)
      .attr("y", 4)
      .attr("font-size", "10px")
      .attr("font-family", "sans-serif")
      .attr("fill", "#333");

    // Update positions on tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      text
        .attr("x", (d: any) => d.x + 12)
        .attr("y", (d: any) => d.y + 4);
    });

    // Drag helper
    function drag(simulation: d3.Simulation<Node, undefined>) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
    
    // Cleanup
    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow border border-slate-200 m-2 overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h3 className="font-bold text-slate-800">{t('graph.title')}</h3>
        <div className="text-sm text-slate-500">{t('graph.interactive')}</div>
      </div>
      <div className="flex-1 relative bg-slate-50">
         <svg ref={svgRef} className="w-full h-full block cursor-move"></svg>
      </div>
    </div>
  );
};