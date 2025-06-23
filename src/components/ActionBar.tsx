
import '../css/components/ActionBar.css';
import IconButton from './IconButton';

type Props = 
{
  selectedCount: number;
  allSelected: boolean;
  onToggleAll: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
};

export default function ActionBar({ selectedCount, allSelected, onToggleAll, onDuplicate, onDelete }: Props) 
{
  return (
     <div className="action-bar">
      <label>
        <input type="checkbox" checked={allSelected} onChange={onToggleAll} />
        <span>{selectedCount} elements selected</span>
      </label>
      <div className="actions">
        <IconButton name='copy' onClick={onDuplicate}/>
         <IconButton name='delete'  onClick={onDelete}/>
        
      </div>
    </div>
  );
}
