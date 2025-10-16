import HTMLFlipBook from "react-pageflip";

const StoryBook = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <HTMLFlipBook
        width={300}
        height={300}
        showCover={true}
        className="shadow-2xl rounded-2xl"
      >
        {/* Cover Page */}
        <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl">
          <h1 className="text-3xl font-bold">Our Journey</h1>
        </div>

        {/* Page 1 */}
        <div className="bg-gray-50 rounded-2xl">
          <h2 className="text-xl font-bold mb-2">Our Story (Part 1)</h2>
          <p className="text-gray-700 text-justify">
            Once upon a time, we started with a small idea that grew into
            something big. The early days were filled with challenges, but our
            passion kept us moving.
          </p>
        </div>

        {/* Page 2 */}
        <div className="bg-gray-50 rounded-2xl">
          <h2 className="text-xl font-bold mb-2">Our Story (Part 1)</h2>
          <p className="text-gray-700 text-justify">
            Once upon a time, we started with a small idea that grew into
            something big. The early days were filled with challenges, but our
            passion kept us moving.
          </p>
        </div>

        {/* Page 3 */}
        <div className="bg-gray-50 rounded-2xl">
          <h2 className="text-xl font-bold mb-2">Our Story (Part 1)</h2>
          <p className="text-gray-700 text-justify">
            Once upon a time, we started with a small idea that grew into
            something big. The early days were filled with challenges, but our
            passion kept us moving.
          </p>
        </div>

        {/* Closing Page */}
        <div className="flex justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300 rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 text-center px-6">
            Thank you for reading our journey ✨
          </h2>
        </div>
      </HTMLFlipBook>
    </div>
  );
};

export default StoryBook;
