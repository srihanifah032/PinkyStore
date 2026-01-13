function Loading({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin" />
      <p className="mt-4 text-gray-600 font-medium">{text}</p>
    </div>
  );
}

export default Loading;