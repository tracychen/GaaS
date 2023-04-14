"use client";

import { ModalType } from "@/components/modal/GlobalModal";
import { useGlobalModalContext } from "@/components/modal/GlobalModalContext";
import Background from "@/ui/Background";
import { Button } from "@/ui/Button";

const Home = () => {
  const { showModal } = useGlobalModalContext();
  return (
    <>
      <Background
        color={"#FF0000"}
        offsetX={-10}
        offsetY={10}
      />
      <div className="flex flex-wrap items-center justify-center h-[1000px]">
        <Button
          variant={"brand"}
          onClick={() => showModal(ModalType.GATE)}
        >
          🚀 Get Started
        </Button>
      </div>
    </>
  );
};

export default Home;
