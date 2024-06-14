function ErrorBoundary() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong.</h1>
        <p className="text-lg text-gray-700">
          Sorry for the inconvenience. Please try again later.
        </p>
      </div>
    </div>
  )
}

export { ErrorBoundary }
