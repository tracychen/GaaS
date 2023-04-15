"use client";

import { useGlobalModalContext } from "@/components/modal/GlobalModalContext";
import { ModalType } from "@/components/modal/types";
import { Button } from "@/ui/Button";
import { useEffect } from "react";

const Gate = ({ params }: { params: { id: string } }) => {
  const { showModal } = useGlobalModalContext();
  useEffect(() => {
    showModal(ModalType.ACCESS_GATE, {
      gateId: params.id,
    });
  }, []);
  return <div></div>;
};

export default Gate;
