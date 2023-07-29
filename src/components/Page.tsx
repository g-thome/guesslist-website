import Sidebar from "./Sidebar";

export function Page({ children, title }) {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="p-8 overflow-auto w-full">
        <div className="py-1 px-14">
          <h1 className="text-white text-5xl mb-8 font-semibold">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
