import { GeoTool } from '../types';

const border = 'border-t-[1px] border-b-[1px] border-t-slate-800 border-b-slate-900';
const flex = 'flex flex-row justify-center items-center cursor-pointer';

interface GeoToolbarProps {
  onSelected: (tool: GeoTool) => void;
}

export const GeoToolbar = ({ onSelected }: GeoToolbarProps) => {
  return (
    <ul className="flex flex-col w-[45px] items-stretch">
      <li key="1" className={`h-[45px] ${border} ${flex}`} onClick={() => onSelected('plane')}>
        P
      </li>
      <li key="2" className={`h-[45px] ${border} ${flex}`} onClick={() => onSelected('sphere')}>
        S
      </li>
      <li key="3" className={`h-[45px] ${border} ${flex}`}>
        C
      </li>
      <li key="4" className={`h-[45px] ${border} ${flex}`}>
        D
      </li>
    </ul>
  );
};
