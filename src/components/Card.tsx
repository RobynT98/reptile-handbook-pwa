import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  /** Om sätts: hela kortet blir klickbart */
  onClick?: () => void;
  /** Valfri liten text under titeln, t.ex. artgrupp / svårighetsgrad */
  subtitle?: string;
  /** Visar en "Redigera"-knapp om satt */
  onEdit?: () => void;
  /** Visar en "Ta bort"-knapp om satt */
  onDelete?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  onClick,
  subtitle,
  onEdit,
  onDelete
}) => {
  const isClickable = Boolean(onClick);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!isClickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <section
      className={[
        'rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-black/40',
        isClickable ? 'cursor-pointer hover:border-emerald-500/70 hover:bg-slate-900' : ''
      ].join(' ')}
      {...(isClickable
        ? {
            role: 'button',
            tabIndex: 0,
            onClick,
            onKeyDown: handleKeyDown
          }
        : {})}
    >
      <header className="mb-2 flex items-start gap-2">
        <div className="flex-1">
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="text-[0.7rem] text-slate-400">{subtitle}</p>
          )}
        </div>

        {(onEdit || onDelete) && (
          <div className="flex gap-1">
            {onEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-[0.7rem] text-slate-200 hover:border-emerald-500 hover:text-emerald-300"
              >
                Redigera
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-[0.7rem] text-rose-300 hover:border-rose-500 hover:bg-rose-900/40"
              >
                Ta bort
              </button>
            )}
          </div>
        )}
      </header>

      <div className="space-y-2 text-sm text-slate-200">{children}</div>
    </section>
  );
};

export default Card;