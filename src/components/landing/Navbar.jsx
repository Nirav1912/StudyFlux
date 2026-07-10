import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-5 lg:px-8">

      <div
        className={`max-w-[1500px] mx-auto rounded-[30px] transition-all duration-500 ${
          scrolled
            ? "bg-white/70 backdrop-blur-3xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            : "bg-white/55 backdrop-blur-3xl border border-white/40 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
        }`}
      >

        <div className="flex items-center justify-between px-8 lg:px-10 py-4">

          {/* Logo */}

          <Link to="/" className="flex items-center gap-4">

            <div
              className="
                w-16
                h-16
                rounded-[22px]
                bg-white/80
                backdrop-blur-xl
                border
                border-white/60
                shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                flex
                items-center
                justify-center
                overflow-hidden
              "
            >
              <img
                src={logo}
                alt="StudyFlux"
                className="w-12 h-12 object-contain"
              />
            </div>

            <div>

              <h1 className="text-2xl font-black text-gray-900">
                StudyFlux
              </h1>

              <p className="text-sm text-gray-500">
                AI Programming Learning
              </p>

            </div>

          </Link>

          {/* Desktop Menu */}

          <nav className="hidden lg:flex items-center gap-10">

            {[
              ["Features", "#features"],
              ["How It Works", "#how"],
              ["About", "#faq"],
              ["Contact", "#contact"],
            ].map(([name, href]) => (
              <a
                key={name}
                href={href}
                className="relative text-gray-700 font-medium hover:text-red-700 transition-all duration-300 group"
              >
                {name}

                <span
                  className="
                    absolute
                    left-0
                    -bottom-2
                    h-[2px]
                    w-0
                    bg-red-600
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                ></span>

              </a>
            ))}

          </nav>

          {/* Right Buttons */}

          <div className="hidden lg:flex items-center gap-4">

            <Link
              to="/auth"
              className="
                px-5
                py-2.5
                rounded-xl
                font-semibold
                text-gray-700
                hover:bg-white/40
                hover:text-red-700
                transition-all
              "
            >
              Login
            </Link>

            <Link
              to="/auth"
              className="
                px-6
                py-3
                rounded-2xl
                bg-gradient-to-r
                from-red-700
                to-red-500
                text-white
                font-semibold
                shadow-xl
                shadow-red-500/30
                hover:scale-105
                hover:shadow-red-500/40
                transition-all
                duration-300
              "
            >
              Generate AI Test →
            </Link>

          </div>

          {/* Mobile Button */}

          <button
            className="lg:hidden text-2xl text-gray-800"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Mobile Menu */}

        {mobileOpen && (

          <div className="lg:hidden border-t border-white/30 bg-white/70 backdrop-blur-3xl rounded-b-[30px]">

            <div className="flex flex-col gap-5 p-6">

              <a href="#features">Features</a>

              <a href="#how">How It Works</a>

              <a href="#about">About</a>

              <a href="#contact">
  Contact
</a>

              <Link
                to="/auth"
                className="
                  bg-gradient-to-r
                  from-red-700
                  to-red-500
                  text-white
                  rounded-xl
                  py-3
                  text-center
                  font-semibold
                "
              >
                Generate AI Test →
              </Link>

            </div>

          </div>

        )}

      </div>

    </header>
  );
}