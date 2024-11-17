import Templates from "./_components/templates";
import AddTemplate from "./_components/add-template";

export default function HomePage() {
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <AddTemplate />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Templates />
      </div>
    </div>
  );
}
