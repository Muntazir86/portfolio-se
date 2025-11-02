'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
// import skillsData from '@/data/skills.json';
import { Skill } from '@/types/skill';

interface SkillNodeProps {
  skill: Skill;
  position: [number, number, number];
  onHover: (skill: Skill | null) => void;
  isConnected: boolean;
}

const SkillNode: React.FC<SkillNodeProps> = ({ skill, position, onHover, isConnected }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (hovered) {
        meshRef.current.scale.setScalar(1.2);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const color = useMemo(() => {
    switch (skill.level) {
      case 'expert': return '#50fa7b';
      case 'proficient': return '#bd93f9';
      case 'learning': return '#ff79c6';
      default: return '#f8f8f2';
    }
  }, [skill.level]);

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[skill.size * 0.3, 32, 32]}
        onPointerOver={() => {
          setHovered(true);
          onHover(skill);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <meshStandardMaterial
          color={color}
          emissive={hovered || isConnected ? color : '#000000'}
          emissiveIntensity={hovered || isConnected ? 0.3 : 0}
          transparent
          opacity={isConnected ? 1 : 0.8}
        />
      </Sphere>
      
      <Text
        position={[0, -skill.size * 0.5, 0]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
    </group>
  );
};

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  visible: boolean;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ start, end, visible }) => {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  if (!visible) return null;

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3, false]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#50fa7b" transparent opacity={0.6} />
    </line>
  );
};

interface SkillsSceneProps {
  skillsData: Skill[];
  onSkillHover: (skill: Skill | null) => void;
}

const SkillsScene: React.FC<SkillsSceneProps> = ({ onSkillHover, skillsData }) => {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  
  const handleSkillHover = (skill: Skill | null) => {
    setHoveredSkill(skill);
    onSkillHover(skill);
  };

  const positions = useMemo(() => {
    const pos: { [key: string]: [number, number, number] } = {};
    const radius = 8;
    
    skillsData.forEach((skill, index) => {
      const angle = (index / skillsData.length) * Math.PI * 2;
      const height = (Math.random() - 0.5) * 4;
      pos[skill.id] = [
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      ];
    });
    
    return pos;
  }, [skillsData]);

  const connections = useMemo(() => {
    const lines: Array<{
      start: [number, number, number];
      end: [number, number, number];
      visible: boolean;
    }> = [];

    skillsData.forEach(skill => {
      skill.connections.forEach(connectionId => {
        const connectedSkill = skillsData.find(s => s.id === connectionId);
        if (connectedSkill && positions[skill.id] && positions[connectedSkill.id]) {
          lines.push({
            start: positions[skill.id],
            end: positions[connectedSkill.id],
            visible: hoveredSkill ? 
              (hoveredSkill.id === skill.id || hoveredSkill.id === connectedSkill.id) : 
              false
          });
        }
      });
    });

    return lines;
  }, [positions, hoveredSkill]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#50fa7b" />
      
      {skillsData.map(skill => (
        <SkillNode
          key={skill.id}
          skill={skill}
          position={positions[skill.id]}
          onHover={handleSkillHover}
          isConnected={hoveredSkill ? 
            hoveredSkill.connections.includes(skill.id) || hoveredSkill.id === skill.id :
            false
          }
        />
      ))}

      {connections.map((connection, index) => (
        <ConnectionLine
          key={index}
          start={connection.start}
          end={connection.end}
          visible={connection.visible}
        />
      ))}

    </>
  );
};

interface SkillsGraphProps {
  skillsData: Skill[];
  hoveredSkill: Skill | null;
  onSkillHover: (skill: Skill | null) => void;
}

export const SkillsGraph: React.FC<SkillsGraphProps> = ({ onSkillHover, skillsData }) => {
  return (
    <div className="w-full h-[600px] bg-[var(--color-surface)] rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        style={{ background: 'black' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <SkillsScene onSkillHover={onSkillHover} skillsData={skillsData} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
          maxDistance={30}
          minDistance={5}
        />
      </Canvas>
    </div>
  );
};
