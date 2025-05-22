import LeftSidebar from "@/components/navigation/left-sidebar";
import Navbar from "@/components/navigation/navbar";
import RightSidebar from "@/components/navigation/right-sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative background-light850_dark100">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex flex-col flex-1 gap-10 px-6 sm:px-14 pt-36 pb-6 max-md:pb-14 min-h-screen">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default RootLayout;
