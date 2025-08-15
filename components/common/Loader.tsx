interface LoaderProps {
  value?: string;
}

const Loader = ({ value = "Loading..." }: LoaderProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mr-4"></div>
      <span className={`text-white text-lg`}>{value}</span>
    </div>
  );
};

export default Loader;