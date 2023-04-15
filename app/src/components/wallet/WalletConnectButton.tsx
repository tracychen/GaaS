import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../../ui/Button";

const WalletConnectButton = () => {
  return (
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div>
              {(() => {
                if (!connected) {
                  return (
                    <Button
                      onClick={openConnectModal}
                      type="button"
                      variant="secondary"
                      icon="wallet"
                    >
                      Connect Wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return <ConnectButton showBalance={false} />;
                }

                // Connected
                return (
                  <div>
                    <ConnectButton chainStatus={"none"} showBalance={false} />
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
};

export default WalletConnectButton;
