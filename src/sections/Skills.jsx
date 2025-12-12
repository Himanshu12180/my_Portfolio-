import React from "react";


const skills = [
{ name: "React.js", level: 90 },
{ name: "Next.js", level: 75 },
{ name: "Node.js", level: 85 },
{ name: "Express", level: 85 },
{ name: "MongoDB", level: 70 },
{ name: "Tailwind CSS", level: 90 },
{ name: "Three.js", level: 80 },
{ name: "Git", level: 85 },
];


export default function Skills() {
return (
<section id="skills" className="py-12">
<h2 className="text-3xl font-bold mb-6">Skills</h2>


<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
{skills.map((s) => (
<div key={s.name} className="bg-gray-800 p-5 rounded-xl">
<div className="flex justify-between items-center mb-3">
<div className="font-medium">{s.name}</div>
<div className="text-sm text-gray-400">{s.level}%</div>
</div>


<div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
<div style={{ width: `${s.level}%` }} className="h-2 bg-indigo-500 rounded-full" />
</div>
</div>
))}
</div>
</section>
);
}