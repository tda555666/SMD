import { useContext, useState } from "react";
import { userContext } from "../../context/userContext";
import todo from "../../assets/imgs/todo.jpg";
import cover from "../../assets/imgs/todocover2.jpg";
import { Link } from "react-router-dom";
import { useChat } from "../../context/chatContext";
import { MdChat } from "react-icons/md";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement('#root'); // or '#your-root-element-id'

function Home() {
  const { user } = useContext(userContext);
  const isLoggedIn = user && user.role !== 'guest';

  const { Chat } = useChat(); // Use the Chat component from context

  const [chatModal, setChatModal] = useState(false);

  const handleToggleChatModal = () => {
    setChatModal((prev) => !prev); // Toggle the chat modal visibility
  };

  

  return (
    <>
      <div
        className="relative min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${todo})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 space-y-8 md:space-y-12">
          <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
            WHAT IS TO DO LIST ?
          </h1>

          <p className="text-xl md:text-2xl font-sans italic max-w-md text-white">
            Have you ever forgotten some important things? Have you forgotten
            important moments or anniversaries for your family? Don't worry, use
            this effective and free tasks tracker and to-do list & task manager
            free to help you manage time and enjoy an easy life.
          </p>

          <div
            className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
            style={{ display: isLoggedIn ? 'none' : 'flex' }}
          >
            <Link
              to="/signup"
              className="text-[20px] px-[60px] py-[20px] bg-primary text-white font-semibold rounded-lg shadow-md mb-4 md:mb-0 md:mr-4 hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:scale-105 block text-center"
            >
              Sign Up
            </Link>

            <Link
              to="/login"
              className="text-[20px] px-[60px] py-[20px] bg-primary text-white font-semibold rounded-lg shadow-md mb-4 md:mb-0 md:mr-4 hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:scale-105 block text-center"
            >
              Log In
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center p-8 md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
            Organize your work <br /> and life, finally
          </h1>
          <h3 className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-200">
            Simplify life for both you and your team. The world’s #1 task <br />
            manager and to-do list app.
          </h3>
          <div className="mt-6">
            <img className="h-[600px] w-[700px]" src={cover} alt="to do img" />
          </div>
          <div className="flex flex-wrap justify-center space-x-4 mt-6">
            <p className="p-4 font-sans italic text-gray-200">
              "Boost your productivity with <br /> our smart to-do app."
            </p>
            <p className="p-4 font-sans italic text-gray-200">
              "Get things done with ease—try <br /> our to-do app today!"
            </p>
            <p className="p-4 font-sans italic text-gray-200">
              "Turn plans into actions <br /> with our to-do app."
            </p>
            <p className="p-4 font-sans italic text-gray-200">
              "Stay on track and achieve <br /> more with our to-do app."
            </p>
          </div>
        </div>

        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl text-white font-medium bg-secondary"
          onClick={handleToggleChatModal} // Toggle chat modal visibility
          style={{ position: 'fixed', bottom: '20px', right: '20px' }} // Adjust position of the button
        >
          <MdChat className="text-[32px] text-white" />
        </button>

          <Modal
        isOpen={chatModal} // Use boolean state to control modal visibility
        onRequestClose={handleToggleChatModal} // Close chat modal when overlay is clicked
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
          content: {
            position: 'absolute',
            top: '60px', // Distance from the top of the viewport
            left: '79%', // Distance from the right side of the viewport
            width: '300px', // Width of the modal
            height: '500px', // Height of the modal
          }
        }}
        contentLabel="Chat Modal"
        shouldCloseOnOverlayClick={true} // Allow closing modal by clicking overlay
        >
        <Chat
          onClose={handleToggleChatModal} 
          className="bg-secondary" // Close the chat modal when this function is called
        />
        </Modal>
      </div>
    </>
  );
}

export default Home;