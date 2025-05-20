interface DropdownMenuProps {
    onEdit: () => void;
    onDelete: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onEdit, onDelete }) => (
    <div className="absolute right-0 mt-1 bg-[#1c1c1c] border rounded shadow-md w-24 z-10">
        <button onClick={onEdit} className="w-full text-left px-4 py-2 hover:bg-[#141414]">
            수정
        </button>
        <button onClick={onDelete} className="w-full text-left px-4 py-2 hover:bg-[#141414] text-red-500">
            삭제
        </button>
    </div>
);

export default DropdownMenu;