import React from "react";

function About() {
  if (typeof document !== "undefined") document.title = "About - NekoTV";

  return (
    <main className="min-h-screen flex items-start justify-center px-4 py-12">
      <h1 className="text-3xl font-extrabold">About</h1>
    </main>
  );
}

export default About;
