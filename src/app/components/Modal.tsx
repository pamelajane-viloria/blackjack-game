import "../styles/styles.css";

export interface Modal {
    onClose: () => void;
    result: string;
}

export const Modal: React.FC<Modal> = ({ onClose, result }) => {
    let resultStatement = '';

    if (result === 'win') {
        resultStatement = 'You won!';
    } else if (result === 'lose') {
        resultStatement = 'Dealer won!';
    } else if (result === 'tie') {
        resultStatement = 'It \'s a tie!';
    } else if (result === 'playerBust') {
        resultStatement = 'Player Bust';
    } else if (result === 'dealerBust') {
        resultStatement = 'Dealer Bust';
    }
    
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-1/4 sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <p>{resultStatement}</p>
                            <div className="flex justify-end mt-5">
                                <button type="button" className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white w-auto" onClick={onClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;