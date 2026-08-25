"use client";

import { useState, useEffect } from "react";
import { Window } from "../Window";

const skills = [
  { name: "JavaScript", level: 100 },
  { name: "TypeScript", level: 100 },
  { name: "React", level: 100 },
  { name: "Next.js", level: 100 },
  { name: "Tailwind CSS", level: 100 },
  { name: "Node.js", level: 90 },
  { name: "Prisma ORM", level: 90 },
  { name: "SQL / MySQL", level: 90 },
  { name: "APIs REST", level: 90 },
  { name: "Git / GitHub", level: 90 },
  { name: "Nest.js", level: 85 },
  { name: "Express", level: 85 },
  { name: "Python", level: 80 },
  { name: "Django", level: 75 },
  { name: "MongoDB", level: 75 },
  { name: "Adonis.js", level: 75 },
  { name: "Vue.js", level: 70 },
  { name: "Figma", level: 65 },
];

function generateBar(level: number) {
  const totalBlocks = 25; // 25 blocks for better resolution
  const filledBlocks = Math.round((level / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  // Use green text for the filled blocks, gray for empty
  return `<span class="text-green-500">${'█'.repeat(filledBlocks)}</span><span class="text-gray-600">${'░'.repeat(emptyBlocks)}</span> <span class="text-white w-10 inline-block text-right">${level}%</span>`;
}

export function Terminal() {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];
    const sequence = [
      "Last login: " + new Date().toString().split(" GMT")[0] + " on ttys000",
      "",
      "<span class='text-blue-400 font-bold'>Alex's MacBook Pro</span>:~ alex$ fetch_skills --all",
      "",
      "<span class='text-purple-400'>===========================================================</span>",
      "<span class='text-white font-bold tracking-wider'>                   COMPETÊNCIAS TÉCNICAS                   </span>",
      "<span class='text-purple-400'>===========================================================</span>",
      "",
    ];

    skills.forEach(skill => {
      const paddedName = `<span class="text-yellow-300 w-36 inline-block">${skill.name}</span>`;
      sequence.push(`  ${paddedName} ${generateBar(skill.level)}`);
    });

    sequence.push("");
    sequence.push("<span class='text-gray-400'># Digite 'help' para ver outros comandos.</span>");

    // Start with blank history
    setHistory([]);
    setIsTyping(true);

    let delay = 500; // Initial delay
    
    // Add lines one by one
    sequence.forEach((line, index) => {
      // Logic for timing: fast for skills, slow for commands
      if (index === 0) delay += 500;
      else if (index === 2) delay += 800; // Wait before executing command
      else if (index > 7 && index < sequence.length - 2) delay += 80; // Fast printing for skills
      else delay += 200;

      const id = setTimeout(() => {
        setHistory(prev => [...prev, line]);
        
        // Auto scroll to bottom during typing
        const container = document.getElementById("terminal-scroll-container");
        if (container) container.scrollTop = container.scrollHeight;
        
        // Finish typing
        if (index === sequence.length - 1) {
          setIsTyping(false);
        }
      }, delay);
      
      timeoutIds.push(id);
    });

    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isTyping) {
      const cmd = input.trim().toLowerCase();
      let response = "";
      
      if (cmd === "clear") {
        setHistory([]);
        setInput("");
        return;
      } else if (cmd === "help") {
        response = "<br/>Comandos disponíveis:<br/>  <span class='text-yellow-300'>clear</span> - Limpa o terminal<br/>  <span class='text-yellow-300'>whoami</span> - Sobre o desenvolvedor<br/>  <span class='text-yellow-300'>fetch_skills</span> - Lista habilidades técnicas<br/>";
      } else if (cmd === "whoami") {
        response = "<br/>Desenvolvedor Full Stack apaixonado por criar experiências web incríveis.<br/>Especialista em React, Next.js e ecossistema Node.js.<br/>";
      } else if (cmd === "fetch_skills") {
        let skillsOutput = "<br/><span class='text-purple-400'>===========================================================</span><br/><span class='text-white font-bold tracking-wider'>                   COMPETÊNCIAS TÉCNICAS                   </span><br/><span class='text-purple-400'>===========================================================</span><br/><br/>";
        skills.forEach(skill => {
          const paddedName = `<span class="text-yellow-300 w-36 inline-block">${skill.name}</span>`;
          skillsOutput += `  ${paddedName} ${generateBar(skill.level)}<br/>`;
        });
        response = skillsOutput;
      } else if (cmd !== "") {
        response = `<br/>zsh: command not found: ${cmd}<br/>`;
      }

      setHistory([...history, `<span class='text-green-400'>alex@macbook</span> <span class='text-blue-400'>~ %</span> ${input}`, response]);
      setInput("");
    }
  };

  return (
    <Window id="terminal" defaultWidth={750} defaultHeight={550}>
      <div 
        id="terminal-scroll-container"
        className="flex flex-col h-full w-full bg-[#1e1e1e]/95 backdrop-blur-xl text-gray-200 font-mono text-[14px] p-4 overflow-y-auto selection:bg-white/30"
        onClick={() => !isTyping && document.getElementById("terminal-input")?.focus()}
      >
        {history.map((line, i) => (
          <div 
            key={i} 
            className="leading-[1.6]" 
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
        
        {!isTyping && (
          <div className="flex items-center mt-2">
            <span className="text-green-400 mr-2">alex@macbook</span> 
            <span className="text-blue-400 mr-2">~ %</span>
            <input
              id="terminal-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent outline-none border-none text-gray-200 caret-gray-200 font-mono"
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
          </div>
        )}
      </div>
    </Window>
  );
}

