import React from "react";


export default function Footer() {
return (
<footer className="py-8 text-center text-sm text-gray-400">
<div>© {new Date().getFullYear()} Himanshu — Built with React & Three.js</div>
</footer>
);
}