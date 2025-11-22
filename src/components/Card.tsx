import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-black/40">
    <h2 className="mb-2 text-base font-semibold tracking-tight">{title}</h2>
    <div className="space-y-2 text-sm text-slate-200">{children}</div>
  </section>
);

export default Card;