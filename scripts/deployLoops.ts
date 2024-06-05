import { toNano } from '@ton/core';
import { Loops } from '../wrappers/Loops';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const loops = provider.open(await Loops.fromInit());

    await loops.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(loops.address);

    // run methods on `loops`
}
