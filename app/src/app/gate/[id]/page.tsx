"use client";

import { useGlobalModalContext } from "@/components/modal/GlobalModalContext";
import { ModalType } from "@/components/modal/types";
import { useEffect } from "react";

const Gate = ({ params }: { params: { id: string } }) => {
  const { showModal } = useGlobalModalContext();
  useEffect(() => {
    showModal(ModalType.ACCESS_GATE, {
      gateId: params.id,
    });
  }, []);
  return (
    <div className="bg-gradient-to-r from-deform-orange to-deform-red h-[2000px] bg-cover"></div>
  );
};

export default Gate;
