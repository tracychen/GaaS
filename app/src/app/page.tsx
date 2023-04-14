"use client";

import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-deform-orange to-deform-red h-[2000px] bg-cover">
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="flex flex-wrap items-center justify-center">
            <div className={"rounded-brand bg-white p-8 sm:w-[500px]"}>
                <div className="mb-2 -mt-4 text-center text-[140px]">⛩️</div>
                <div className="mb-6 flex flex-col gap-y-4 text-center">
                  <Text variant={"semibold"}>Add Gates</Text>
                  <Text variant={"small"}>To manage who can access your content.</Text>
                </div>
                <div className="flex justify-center">
                  <Button
                    variant={"primary"}
                    onClick={async () => {
                    }}
                    size="modal"
                  >
                    Get started now
                  </Button>
                </div>
                <div className="mt-6 mb-6 flex flex-col gap-y-4 text-center">
                  <Text variant={"secondary"}>You will be asked to connect your wallet.</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
