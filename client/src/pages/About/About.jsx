import markImg from "../../assets/imgs/Mark.jpeg";
import davidImg from "../../assets/imgs/David.jpeg";
import ivgeniImg from "../../assets/imgs/Ivgeni.jpeg";
import danielImg from "../../assets/imgs/Daniel.jpeg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "@/components/Navbar/Navbar";

function About() {
  const data = [
    {
      id: "1",
      name: "Mark HAgever",
      img: markImg,
      review: `immegrant from germany`,
    },
    {
      id: "2",
      name: "David lox",
      img: davidImg,
      review: `immegrant from afganistan,keep your children away`,
    },
    {
      id: "3",
      name: "Ivgeni",
      img: ivgeniImg,
      review: `immegrant from ukrain,slava urkraine`,
    },
    {
      id: "4",
      name: `Daniel`,
      img: danielImg,
      review: `immegrant from ethopia`,
    },
  ];
  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Navbar />
      <div className="bg-black w-screen h-screen">
        <div className="w-3/4 m-auto">
          <h1 className="text-white text-center mt-4 text-4xl">about us</h1>
          <p className="text-white text-center text-3xl">
            we are Nerds that make to do lists
          </p>
          <div className="mt-[120px]">
            <Slider {...settings}>
              {data.map((d) => (
                <div
                  key={d.id}
                  className="bg-white h-[450px] w-[300px] text-black rounded-xl "
                >
                  <div className="h-56 rounded-t-xl bg-indigo-500 flex justify-center ">
                    <img
                      src={d.img}
                      alt=""
                      className="h-44 w-44 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-4 p-4">
                    <p className="text-xl font-semibold">{d.name}</p>
                    <p>{d.review}</p>
                  </div>
                </div>
              ))}
            </Slider>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
