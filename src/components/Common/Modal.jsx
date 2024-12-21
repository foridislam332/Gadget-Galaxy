import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({ isOpen, setIsOpen, children }) => {

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (event.target.id === "modal-overlay") {
                setIsOpen(false);
            }
        };

        const handleBodyScroll = () => {
            document.body.style.overflow = isOpen ? "hidden" : "auto";
        };

        window.addEventListener("click", handleOutsideClick);
        handleBodyScroll();

        return () => {
            window.removeEventListener("click", handleOutsideClick);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, setIsOpen]);

    return (
        <div
            id="modal-overlay"
            className={`fixed top-0 h-screen inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-40 overflow-hidden transition-opacity duration-300 ${isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
                }`}
        >
            <div
                className={`relative bg-white overflow-hidden rounded-lg`}
            >
                <button
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-darkWhite text-purple text-xl hover:bg-red-400/20 hover:text-red rounded duration-300 z-30 group"
                    onClick={() => setIsOpen(false)}
                >
                    <IoCloseOutline
                        size="24"
                        className="group-hover:rotate-180 duration-300"
                    />
                </button>
                <div className="p-8 max-h-[550px] overflow-y-auto overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
