import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Loops } from '../wrappers/Loops';
import '@ton/test-utils';

describe('Loops', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let loops: SandboxContract<Loops>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        loops = blockchain.openContract(await Loops.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await loops.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: loops.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and loops are ready to use
    });

    it('should execute loop1', async() => {
        const result = await loops.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            'loop1'
        );
        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: loops.address,
            success: true
        });
    });

    it('should execute loop2', async() => {
        const result = await loops.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            'loop2'
        );
        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: loops.address,
            success: true
        });
    });

    it('should execute loop3', async() => {
        const result = await loops.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            'loop3'
        );
        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: loops.address,
            success: true
        });
    });

    it('should fail on out of gas', async() => {
        const result = await loops.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            'out of gas'
        );
        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: loops.address,
            success: false
        });
    });
});
