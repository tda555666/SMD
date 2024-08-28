// import todo from "../../assets/imgs/todo.jpg";
// import Navbar from "@/components/Navbar/Navbar";
// import cover from "../../assets/imgs/todocover2.jpg";

// function Home() {
//   return (
//     <>
//       <Navbar />
//       <div
//         className="relative h-[130vh] w-auto flex flex-col justify-center items-center bg-cover bg-center"
//         style={{ backgroundImage: `url(${todo})` }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="relative z-10 flex flex-col justify-center items-center text-center p-8">
//           <h1 className=" text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
//             Organize your work <br /> and life, finally
//           </h1>
//           <h3 className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-200">
//             Simplify life for both you and your team. The world’s #1 task <br />{" "}
//             manager and to-do list app.
//           </h3>
//           <div className="mt-6">
//             <img className="h-[600px] w-[700px] " src={cover} alt="to do img" />
//           </div>
//           <div className="flex flex-wrap justify-center space-x-4 mt-6">
//             <p className="p-4 font-sans italic text-gray-200">
//               "Boost your productivity with <br /> our smart to-do app."
//             </p>
//             <p className="p-4 font-sans italic text-gray-200">
//               "Get things done with ease—try <br /> our to-do app today!"
//             </p>
//             <p className="p-4 font-sans italic text-gray-200">
//               "Turn plans into actions <br /> with our to-do app."
//             </p>
//             <p className="p-4 font-sans italic text-gray-200">
//               "Stay on track and achieve <br /> more with our to-do app."
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;

import { useContext } from "react";
import { userContext } from "../../context/userContext";
import todo from "../../assets/imgs/todo.jpg";
import cover from "../../assets/imgs/todocover2.jpg";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useContext(userContext); // Access user from context

  // Check if the user is logged in or if user has more than one entry

  const userEntries = Object.entries(user);

  const isLoggedIn = user.role && user.role !== 'guest';
  const shouldDisable = isLoggedIn || Object.keys(user).length > 1;

  return (
    <>
      <div
        className="relative min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${todo})` }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 space-y-8 md:space-y-12">
          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
            WHAT IS TO DO LIST ?
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl font-sans italic max-w-md text-white">
            Have you ever forgotten some important things? Have you forgotten
            important moments or anniversaries for your family? Don't worry, use
            this effective and free tasks tracker and to-do list & task manager
            free to help you manage time and enjoy an easy life.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <button
              className={`text-[20px] px-[60px] py-[20px] bg-primary text-white font-semibold rounded-lg shadow-md mb-4 md:mb-0 md:mr-4 ${shouldDisable ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:scale-105'}`}
              disabled={shouldDisable}
            >
              <Link
                to="/signup"
                className={`w-full h-full block ${shouldDisable ? 'pointer-events-none' : 'pointer-events-auto'}`}
              >
                Sign Up
              </Link>
            </button>
            <button
              className={`text-[20px] px-[60px] py-[20px] bg-primary text-white font-semibold rounded-lg shadow-md mb-4 md:mb-0 md:mr-4 ${shouldDisable ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:scale-105'}`}
              disabled={shouldDisable}
            >
              <Link
                to="/login"
                className={`w-full h-full block ${shouldDisable ? 'pointer-events-none' : 'pointer-events-auto'}`}
              >
                Log In
              </Link>
            </button>
          </div>
        </div>

        {/* Cover Image and Text */}
        <div className="relative z-10 flex flex-col items-center text-center p-8 md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
            Organize your work <br /> and life, finally
          </h1>
          <h3 className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-200">
            Simplify life for both you and your team. The world’s #1 task <br />{" "}
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
      </div>
    </>
  );
}

export default Home;