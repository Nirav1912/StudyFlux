export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-white to-red-50"
    >
      <div className="max-w-6xl mx-auto px-8">

        <div className="text-center">

          <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold">
            📞 Contact Us
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Get In Touch
          </h2>

          <p className="mt-4 text-xl text-gray-600">
            Have questions or suggestions?
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {/* Email */}

          <div className="bg-white rounded-3xl p-8 shadow-lg">

            <div className="text-5xl">📧</div>

            <h3 className="mt-4 text-2xl font-bold">
              Email
            </h3>

            <p className="mt-2 text-gray-600 break-all">
              nirav.19.2006@gmail.com
            </p>

          </div>

          {/* Developer */}

          <div className="bg-white rounded-3xl p-8 shadow-lg">

            <div className="text-5xl">👨‍💻</div>

            <h3 className="mt-4 text-2xl font-bold">
              Developer
            </h3>

            <p className="mt-2 text-gray-600">
              Nirav
            </p>

          </div>

          {/* StudyFlux */}

          <div className="bg-white rounded-3xl p-8 shadow-lg">

            <div className="text-5xl">🚀</div>

            <h3 className="mt-4 text-2xl font-bold">
              StudyFlux
            </h3>

            <p className="mt-2 text-gray-600">
              AI-powered programming learning platform
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}