import { GeoTool } from '../types';

const borderClass = 'border-t-[1px] border-b-[1px] border-t-slate-800 border-b-slate-900';
const flexClass = 'flex flex-row justify-center items-center cursor-pointer m-1 mb-0';
const buttonClass = 'btn btn-outline btn-primary w-[48px] p-0';

interface GeoToolbarProps {
  onSelected: (tool: GeoTool) => void;
  onClear: () => void;
}

export const GeoToolbar = ({ onSelected, onClear }: GeoToolbarProps) => {

  return (
    <ul className="flex flex-col w-[52px] items-stretch">
      <li key="2" className={`h-[45px] ${borderClass} ${flexClass}`}>
        <button className={buttonClass} onClick={() => onSelected('sphere')}>
          <img src="sphere-48.png" alt="C" />
        </button>
      </li>
      <li key="3" className={`h-[45px] ${borderClass} ${flexClass}`}>
        <button className={buttonClass} onClick={() => onSelected('cube')}>
          <img src="cube-48.png" alt="C" />
        </button>
      </li>
      <li key="4" className={`h-[52px] ${borderClass} ${flexClass}`}>
        <button className={buttonClass} onClick={() => onSelected('cylinder')}>
          <img src="cyl-48.png" alt="C" width={42} />
        </button>
      </li>
      <div className="flex-1" />
      <li key="100" className={`h-[45px] ${borderClass} ${flexClass} mb-2`}>
        <button className="btn btn-outline btn-accent" onClick={() => onClear()}>
          🆑
        </button>
      </li>
    </ul>
  );
};
