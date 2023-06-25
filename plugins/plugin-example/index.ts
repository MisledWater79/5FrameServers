import { events } from "bdsx/event";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { TransferPacket } from "bdsx/bds/packets";
import { command } from "bdsx/command";
import { CxxString, int32_t } from "bdsx/nativetype";

command.register("transferserver", "Transfer servers").overload(
    (params, origin, output) => {
        const actor = origin.getEntity();
        if (actor?.isPlayer()) actor.transferServer(params.address, params.port);
    },
    {
        address: CxxString,
        port: int32_t,
    },
);

export function transferServer(networkIdentifier: NetworkIdentifier, address: string, port: number): void {
    const transferPacket = TransferPacket.allocate();
    transferPacket.address = address;
    transferPacket.port = port;
    transferPacket.sendTo(networkIdentifier);
    transferPacket.dispose();
}

console.log("[ExamplePlugin] allocated");
// before BDS launching

events.serverOpen.on(() => {
    console.log("[ExamplePlugin] launched");
    // after BDS launched
});

events.serverClose.on(() => {
    console.log("[ExamplePlugin] closed");
    // after BDS closed
});
