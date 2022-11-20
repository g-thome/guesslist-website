import Sidebar from "./Sidebar";

export function Page({ children, title }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p8">
        <div className="py-1 px-14">
          <h1 className="text-white text-5xl mb-8 font-semibold">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
