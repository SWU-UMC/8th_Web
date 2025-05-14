

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const WithdrawalModal = ({ isOpen, onClose, onConfirm, isLoading = false }: ModalProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
      ></div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-10 w-72 text-center">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">정말 탈퇴하시겠습니까?</h3>
        <div className="flex justify-center space-x-2">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 ${isLoading ? 'bg-gray-400' : 'bg-gray-200 hover:bg-gray-300'} text-gray-800 rounded focus:outline-none`}
          >
            {isLoading ? '처리 중...' : '예'}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className={`px-4 py-2 ${isLoading ? 'bg-pink-400' : 'bg-pink-500 hover:bg-pink-600'} text-white rounded focus:outline-none`}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModal;