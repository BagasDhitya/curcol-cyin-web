"use client"
interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {children}
            </div>
            <button
                onClick={onClose}
                className="mt-4 w-full bg-gray-500 text-white py-2 rounded"
            >
                Close
            </button>
        </div>
    )
}