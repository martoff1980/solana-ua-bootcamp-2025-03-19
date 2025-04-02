/** @format */

import 'dotenv/config';
import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { mintTo } from '@solana/spl-token';
import { getExplorerLink } from '@solana-developers/helpers';

let privateKey = process.env['SECRET_KEY'];
if (privateKey === undefined) {
	console.log('Add SECRET_KEY to .env!');
	process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl('devnet'));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

// Address that create-token-mint.ts created for you
const tokenMintAccount = new PublicKey('BYeSuB2PGWQuYpc5UvzYDzTSis6PUUx2i8twdotnNZdJ');
// Address that create-token-account.ts created
const recipientAssociatedTokenAccount = new PublicKey('GQRgeaTEbRMzPqzvtzJT1DZRS8oiqH2ETPiwXBxEkDxG');

const transactionSignature = await mintTo(connection, sender, tokenMintAccount, recipientAssociatedTokenAccount, sender, 10 * MINOR_UNITS_PER_MAJOR_UNITS);

const link = getExplorerLink('transaction', transactionSignature, 'devnet');

//https://explorer.solana.com/tx/2uMcNPrQveSHEXQ1o1jKSH2LbFdnWy3vBVCTTcNGaQb7fJpacJiwRzx2DEYFLmyE2GB1BDSAo1KZtrrZnngwgppf?cluster=devnet
https: console.log('✅ Success!');
console.log(`Mint Token Transaction: ${link}`);
